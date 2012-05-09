class Text < Content

  include Mongoid::Document

  validates_presence_of :title

  field :body, type: String

  def gmaps4rails_infowindow
    "
    <h5><a href='#{ get_absolute_url }'> ##{ERB::Util.html_escape title} </a></h5>
    <p>
      #{ERB::Util.html_escape body}
    </p>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-texts-small.png",
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end   

  def to_html(field)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,
        :autolink => true, :space_after_headers => true)
    markdown.render(field)
  end

  private

  def url_path
    '/texts/'
  end

end
