class Image

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip
  include Gmaps4rails::ActsAsGmappable

  field :title, type: String
  field :happened_at, type: Time

  validates_presence_of :title
  validates_uniqueness_of :title
  
  has_mongoid_attached_file :img,
    :styles => {
      :small => ['260x180', :jpg]
    }

  after_img_post_process  :process_metadata

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  belongs_to :user
  field :user_id, type: String

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

  def process_metadata

    exif_info = EXIFR::JPEG.new(img.queued_for_write[:original].path)
    logger.debug "Exif INFO #{exif_info}"
    return unless exif_info.exif?
    #Save exif metadata
    self.latitude  = exif_info.gps.latitude
    logger.debug "Latitude #{self.latitude}"
    self.longitude = exif_info.gps.longitude
    logger.debug "Longitude #{self.longitude}"

  end

end
