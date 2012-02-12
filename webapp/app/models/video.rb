class Video

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Gmaps4rails::ActsAsGmappable
  
  field :url, type: String
  field :title, type: String
  field :service, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_html, type: String
  field :happened_at, type: Time
  
  validates_presence_of :url
  validates_uniqueness_of :url
  
  belongs_to :user
  field :user_id, type: String
  
  before_save :generate_metadata

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  field :street, type: String
  field :city, type: String
  field :country, type: String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean

  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

  def gmaps4rails_infowindow
    # TODO: extend this - put more information
    "<h1>#{ title }</h1>"
  end


  protected

  def generate_metadata
    vid = UnvlogIt.new(self.url)
    self.title = vid.title
    self.service = vid.service
    self.thumbnail = vid.thumbnail
    self.embed_url = vid.embed_url
    self.embed_html = vid.embed_html
  end
end
