class Text

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  
  field :title, type: String
  
  validates_presence_of :title
  validates_uniqueness_of :title
end
