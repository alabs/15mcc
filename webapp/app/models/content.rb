class Content

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::FullTextSearch
  include Gmaps4rails::ActsAsGmappable
  include Geocoder::Model::Mongoid

  enable_tags_index!

  #callbacks
  before_save :preprocessing, :reverse_geocode, :geocode

  #accessors
  attr_accessor :terms

  #validations
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  #fields
  belongs_to :user
  field :user_id, type: String

  #address
  field :address, type: String
  field :city, type: String
  field :country, type: String
  #coordinates
  field :coordinates, type: Array
  #
  field :slug, type: String
  field :priority, type: Boolean, :default => false
  field :title, type: String
  field :happened_at, type: Time

  fulltext_search_in :title, :address, :city, :country

  #geocoding
  geocoded_by :address_from_components
  reverse_geocoded_by :coordinates do |obj,results|
    if geo = results.first
      obj.city    = geo.city
      obj.address = geo.address
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
    [address,city,country].compact.join(', ')
  end

  #slug methods

  def self.find_by_slug(slug)
    where(:slug => slug).first
  end

  def to_param
    slug
  end

  protected

  def generate_slug
    self.slug = self.title.parameterize
  end

  def get_absolute_url
    url_path + slug
  end

end