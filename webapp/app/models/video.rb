class Video

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Taggable
  
  field :url, type: String
  field :title, type: String
  field :service, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_html, type: String
  
  validates_presence_of :url
  validates_uniqueness_of :url
  
  after_save :generate_metadata


  protected

  def generate_metadata
    vid = UnvlogIt.new(self.url)
    self.title = vid.title
    self.service = vid.service
    self.thumbnail = vid.thumbnail
    self.embed_url = vid.embed_url
    self.embed_html = vid.embed_html
  end
end
