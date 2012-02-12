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
  
  has_mongoid_attached_file :img

  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'

  belongs_to :user
  field user_id: Integer

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

end
