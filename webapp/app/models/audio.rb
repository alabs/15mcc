class Audio
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip
  include Gmaps4rails::ActsAsGmappable

  field :title, :type => String
  field :happened_at, :type => Time
  field :street, :type => String
  field :city, :type => String
  field :country, :type => String
  field :latitude, type: Float
  field :longitude, type: Float
  field :gmaps, type: Boolean

  belongs_to :user
  field :user_id, type: String

  has_mongoid_attached_file :archive
  
  validates_presence_of :title
  validates_uniqueness_of :title
  
  # gmaps4rails https://github.com/apneadiving/Google-Maps-for-Rails
  acts_as_gmappable :lat => 'latitude', :lon => 'longitude'
  
  def gmaps4rails_address
    "#{self.street}, #{self.city}, #{self.country}" 
  end

  def gmaps4rails_infowindow
    # TODO: extend this - put more information
    "<h1>#{ title }</h1>"
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-texts-small.png",
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end   
end
