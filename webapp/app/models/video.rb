# encoding: utf-8
class Video < Content

  include Mongoid::Document

  validates_presence_of :url
  validates_uniqueness_of :url
  validate :check_video_service

  before_save :preprocessing

  field :url, type: String
  field :service, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_html, type: String

  def gmaps4rails_infowindow
    # Idealmente lo hariamos asi, pero no funciona...
    # #{ embed_html(300,172) }
    "
    <a href='#{ get_absolute_url }'>
      <h5>#{ERB::Util.html_escape title}</h5>
    </a>
    <p>
      <object width='300' height='172'><param name='movie' value='#{ embed_url }'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='#{ embed_url }' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='300' height='172'></embed></object>
    </p>
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-videos-small.png",
     "width" => "20",
     "height" => "15",
     "marker_anchor" => [ 5, 10 ]
    }
  end

  def preprocessing
    generate_metadata()
  end

  private

  def generate_metadata
    vid = UnvlogIt.new(self.url)
    self.title = vid.title
    self.service = vid.service
    self.thumbnail = vid.thumbnail
    self.embed_url = vid.embed_url
    self.embed_html = vid.embed_html(600)
  end

  def url_path
    '/videos/'
  end

  protected

  def check_video_service
    begin
      UnvlogIt.new(self.url)
    rescue ArgumentError
      msg = "Solo soportamos vídeos de Youtube, Vimeo, Flickr, Metacafe, Dailymotion, Collegehumor, Blip.tv, Myspace, Ted Talks, 11870.com, Marca.tv, Dalealplay y RuTube"
      errors.add :url, msg 
    end
  end
end
