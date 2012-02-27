class Page

  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :slug, type: String
  field :body, type: String

  validates_presence_of :title
  validates_uniqueness_of :title

  before_save :generate_slug

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

end
