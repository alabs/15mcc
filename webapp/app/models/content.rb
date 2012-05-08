class Content

  include Mongoid::Document
  include Mongoid::Timestamps
  #include Mongoid::Taggable
  include Mongoid::Document::Taggable
  include Mongoid::FullTextSearch
  include Gmaps4rails::ActsAsGmappable
  include Geocoder::Model::Mongoid

  #enable_tags_index!

  #callbacks
  before_save :preprocessing, :reverse_geocode, :geocode

  #accessors
  attr_accessor :terms

  #validations
  validates_acceptance_of :terms, :message => "Debes aceptar las condiciones de uso"

  #fields
  belongs_to :user
  field :user_id, type: String

  # Puede ser que el mismo  usuario creador de la ficha 
  # sea el autor de la obra
  field :author_myself, type: String
  # o sino puede ser un nombre/link
  field :author_name, type: String
  field :author_link, type: String

  #address
  field :address, type: String
  field :city, type: String
  field :country, type: String
  #coordinates
  field :coordinates, type: Array
  #
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

  def address_from_components=(full_address)
    unless full_address.nil?
      #separo los datos geográficos que recibimos separados por comas
      geo_data = full_address.split(',')
      #puede ocurrir que los datos de entrada no sean correctos en ese caso los evito
      if !geo_data.nil? && geo_data.length == 3
        self.address = geo_data[0]
        self.city    = geo_data[1]
        self.country = geo_data[2]
      end
    end
  end

  def get_absolute_url
    user = self.user ? self.user.username : "anonymous" 
    '/profile/' + user + url_path + self.id.to_s
  end

end
