class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :rememberable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable

  has_many :images
  has_many :texts
  has_many :videos

  attr_accessible :username, :email, :password, :password_confirmation, :terms
  attr_accessible :username, :email, :role, :as => :admin
  attr_accessor :terms, :login

  validates_length_of :username, minimun: 3, maximum: 10
  validates_uniqueness_of :username
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  field :username, :type => String

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
  # field :confirmation_token,   :type => String
  # field :confirmed_at,         :type => Time
  # field :confirmation_sent_at, :type => Time
  # field :unconfirmed_email,    :type => String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String

  field :role, :type => String, :default => 'user'

  def self.find_for_database_authentication(conditions)
    login = conditions.delete(:login)
    self.any_of({ :username => login }, { :email => login }).first
  end
  
  ROLES = %w[admin editor user anonymous]
  
  def role?(base_role='anonymous')
    if self.role.present?
      logger.info('DEBUG 15M.CC: ' + base_role + " " + self.role)
      return ROLES.index(base_role.to_s) <= ROLES.index(self.role)
    end
    return false
  end
  
  def admin?
    role == 'admin'
  end
end
