class Video

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Gmaps4rails::ActsAsGmappable
  
  field :url, type: String
  field :title, type: String
  field :happened_at, type: Time
  field :service, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_html, type: String
  field :happened_at, type: Time
  field :slug, type: String
  
  validates_presence_of :url
  validates_uniqueness_of :url
  
  belongs_to :user
  field :user_id, type: String
  
  before_save :generate_metadata, :generate_slug

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  field :street, type: String
  field :city, type: String
  field :country, type: String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean

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
    # FIXME: queda mal con el tamañao  #{ embed_html }
    "
    <a href='/videos/#{ slug }'>
      <h5>#{ERB::Util.html_escape title}</h5>
      <img class='infowindow-thumb' src='#{ thumbnail }' />
    </a>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-videos-small.png",
     "width" => "20",
     "height" => "15",
     "marker_anchor" => [ 5, 10 ]
    }
  end   

  protected

  def generate_metadata
    vid = UnvlogIt.new(self.url)
    self.title = vid.title
    self.service = vid.service
    self.thumbnail = vid.thumbnail
    self.embed_url = vid.embed_url
    self.embed_html = vid.embed_html(600)
  end

  def generate_slug
    self.slug = self.title.parameterize
  end
end
