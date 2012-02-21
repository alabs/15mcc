class Audio
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip
  include Gmaps4rails::ActsAsGmappable

  field :title, :type => String
  field :happened_at, :type => Time
  field :street, :type => String
  field :city, :type => String
  field :country, :type => String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean
  field :slug, type: String

  belongs_to :user
  field :user_id, type: String

  has_mongoid_attached_file :archive
  
  validates_presence_of :title
  validates_uniqueness_of :title
  
  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  before_save :generate_slug

  def self.find_by_slug(slug)
    where(:slug => slug).first
  end

  def to_param
    slug
  end
  
  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

  def gmaps4rails_infowindow
    # TODO: extend this - put more information
    "<h1>#{ title }</h1>"
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-audios-small.png",
     "width" => "15",
     "height" => "16",
     "marker_anchor" => [ 5, 10]
    }
  end   

  protected

  def generate_slug
    self.slug = self.title.parameterize
  end
end
