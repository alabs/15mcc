class Text

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Gmaps4rails::ActsAsGmappable

  field :title, type: String
  field :body, type: String

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

  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

end
