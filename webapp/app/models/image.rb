class Image

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  include Mongoid::Paperclip

  field :title, type: String

  validates_presence_of :title
  validates_uniqueness_of :title
  
  has_mongoid_attached_file :img
end
