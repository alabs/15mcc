class Text

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Gmaps4rails::ActsAsGmappable

  attr_accessor :terms
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  field :title, type: String
  field :body, type: String
  field :happened_at, type: Time

  validates_presence_of :title
  validates_uniqueness_of :title

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  field :street, type: String
  field :city, type: String
  field :country, type: String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean
  field :slug, type: String
  
  belongs_to :user
  field :user_id, type: String

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
    "
    <h5><a href='/texts/#{ id }'> ##{ERB::Util.html_escape title} </a></h5>
    <p>
      #{ERB::Util.html_escape body}
    </p>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-texts-small.png",
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end   

  protected

  def generate_slug
    self.slug = self.title.parameterize
  end
end
