class Image

  include Wizard
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip

  include Mongoid::FullTextSearch
  
  include Gmaps4rails::ActsAsGmappable
  include Geocoder::Model::Mongoid

  #callbacks
  before_save :generate_slug, :reverse_geocode

  #accessors
  attr_accessor :terms

  #validations
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"
  validates_presence_of :title
  validates_uniqueness_of :title

  #fields
  belongs_to :user
  field :user_id, type: String

  #address
  field :street, type: String
  field :city, type: String
  field :country, type: String
  #coordinates
  field :coordinates, type: Array


  field :slug, type: String
  field :priority, type: Boolean, :default => false
  field :title, type: String
  field :happened_at, type: Time

  fulltext_search_in :title, :street, :city, :country
  #paperclip
  has_mongoid_attached_file :img,:styles => {:small => ['260x180', :jpg],:marker => ['20x20', :jpg]}

  #geocoding
  geocoded_by :address_from_components
  reverse_geocoded_by :coordinates do |obj,results|
    if geo = results.first
      obj.city    = geo.city
      obj.street  = geo.address
      obj.country = geo.country
    end
  end

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :process_geocoding => false, :lat => 'latitude', :lng => 'longitude'

  def latitude
    coordinates[1] unless coordinates.nil?
  end

  def longitude
    coordinates[0] unless coordinates.nil?
  end

  def address_from_components
    [street,city,country].compact.join(', ')
  end

  def gmaps4rails_infowindow
    "
    <a href='/images/#{ id }'>
      <h5>#{ERB::Util.html_escape title}</h5>
      <img class='infowindow-thumb' src='#{ img.url(:small) }' />
    </a>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => img.url(:marker),
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end

  def self.find_by_slug(slug)
    where(:slug => slug).first
  end

  def to_param
    slug
  end

  def get_absolute_url
    "/images/" + slug
  end

  protected

  def generate_slug
    self.slug = self.title.parameterize
    #Exif metadata
    extract_metadata()
  end


  private

  def extract_metadata

    return if img.queued_for_write[:original].nil?
    exif_info = EXIFR::JPEG.new(img.queued_for_write[:original].path)

    return unless exif_info.exif?
    logger.debug 'escribiendo metadatos exif'
    self.happened_at = exif_info.date_time
    logger.debug "fecha: #{exif_info.date_time}"
    #datos gps
    return if exif_info.gps.nil?
    self.coordinates = [exif_info.gps.longitude,exif_info.gps.latitude]
    logger.debug "Latitud: #{exif_info.gps.latitude} y Longitud: #{exif_info.gps.longitude}"

  end

end
