class Video < Content

  include Mongoid::Document

  field :url, type: String
  field :service, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_html, type: String
  
  validates_presence_of :url
  validates_uniqueness_of :url


  def get_absolute_url
    "/videos/" + slug
  end

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
    <b>Etiquetado con</b>: #{ tags }
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
    generate_slug()
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

end
