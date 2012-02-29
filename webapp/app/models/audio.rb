class Audio
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip
  include Mongoid::FullTextSearch
  include Gmaps4rails::ActsAsGmappable
  
  enable_tags_index!

  field :title, :type => String
  field :happened_at, :type => Time
  field :street, :type => String
  field :city, :type => String
  field :country, :type => String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean
  field :slug, type: String
  field :priority, type: Boolean, :default => false

  attr_accessor :terms
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  belongs_to :user
  field :user_id, type: String

  has_mongoid_attached_file :archive
  
  validates_presence_of :title
  validates_uniqueness_of :title

  # FIXME: subir un OGG no funciona con esto- WTF?
#  validates_attachment_content_type :archive,
#      :content_type => [ 'audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio', 'audio/ogg', 'application/ogg' ],
#      :message => "El tipo de audio no esta soportado. Tiene que ser del tipo OGG o MP3."
  
  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  before_save :generate_slug
  
  fulltext_search_in :title, :street, :city, :country

  def self.find_by_slug(slug)
    where(:slug => slug).first
  end

  def to_param
    slug
  end
  
  def get_absolute_url
    "/audios/" + slug
  end

  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

  def gmaps4rails_infowindow
    "
    <a href='#{ get_absolute_url }'> 
      <h5>##{ERB::Util.html_escape title}</h5>
      <p><img src='/assets/icon-audios.png'></p>
    </a>
    <b>Etiquetado con</b>: #{ tags }
    "
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
