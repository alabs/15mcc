class User
  include Mongoid::Document
  include Mongoid::Paperclip

  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :rememberable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :confirmable, :omniauthable

  has_many :images
  has_many :texts
  has_many :videos

  attr_accessible :username, :email, :password, :password_confirmation, :terms, :biography, :avatar, :name, :homepage
  attr_accessible :username, :email, :role, :banned, :as => :admin
  attr_accessor :terms, :login

  validates_length_of :username, minimun: 3, maximum: 30
  validates_uniqueness_of :username
  validates_format_of :username, :with => /^([\w\.%\+\-]+)$/i
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"
  validates_presence_of :name

  has_mongoid_attached_file :avatar,:styles => { :small => ['40x40', :png], :normal => ['128x128', :png] }, :default_url => "/assets/missing.png"

  field :username, :type => String
  field :biography, :type => String

  field :name, :type => String
  field :homepage, :type => String

  ## Database authenticatable
  field :email,              :type => String, :null => false, :default => ""
  field :encrypted_password, :type => String, :null => false, :default => ""

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  field :remember_created_at, :type => Time

  ## Trackable
  field :sign_in_count,      :type => Integer, :default => 0
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  ## Encryptable
  # field :password_salt, :type => String

  ## Confirmable
  field :confirmation_token,   :type => String
  field :confirmed_at,         :type => Time
  field :confirmation_sent_at, :type => Time
  field :unconfirmed_email,    :type => String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String

  field :role, :type => String, :default => 'user'

  # para banear usuarios
  field :banned, :type => Boolean, :default => false

  def self.find_for_database_authentication(conditions)
    login = conditions.delete(:login)
    self.any_of({ :username => login }, { :email => login }).first
  end

  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
    data = access_token.extra.raw_info
    if user = User.where(:email => data.email).first
      user
    else # crear un usuario con una contraseña aleatoria
      user = User.new(:email => data.email, :username => data.username, :password => Devise.friendly_token[0,20])
      user.skip_confirmation!
      user.save
      user
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"]
      end
    end
  end

  def self.find_for_open_id(access_token, signed_in_resource=nil)
    data = access_token.info
    if user = User.where(:email => data["email"]).first
      user
    else
      #sreg = sreg_user_info
      #logger.info('DEBUG 15M.CC: ' + sreg.inspect)
      user = User.new(:email => data["email"], :password => Devise.friendly_token[0,20])
      user.skip_confirmation!
      user.save
      user
    end
  end

  def banned?
    self.banned == true
  end
  
  ROLES = %w[admin editor user anonymous]
  
  def role?(base_role = :anonymous)
    if role.present?
      return (ROLES.index(base_role.to_s) || 3) <= (ROLES.index(role) || 3)
    end
    return false
  end
  
  def admin?
    role == 'admin'
  end
end
