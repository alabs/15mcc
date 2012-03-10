class Audio < Content

  include Mongoid::Document
  include Mongoid::Paperclip

  validates_presence_of :title
  validates_uniqueness_of :title

  has_mongoid_attached_file :archive
  
 # video/ogg no es un bug, es que o sino por lo menos el firefox 10.0.2 no lo deja subir
  # em, si, aunque un file -i muestre que es audio/ogg al subirlo se "convierte" a video/ogg (???)
  validates_attachment_content_type :archive,
    :content_type => %w(application/ogg audio/ogg video/ogg audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3 audio/mpg audio/x-mpg audio/x-mpegaudio),
    :message => "El tipo de audio no esta soportado. Tiene que ser del tipo OGG o MP3."

  
  def gmaps4rails_infowindow
    "
    <a href='#{ get_absolute_url }'> 
      <h5>##{ERB::Util.html_escape title}</h5>
      <p><img src='/assets/icon-audios.png'></p>
    </a>
    <b>Etiquetado con</b>: #{ tags }
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => "/assets/icon-audios-small.png",
     "width" => "15",
     "height" => "16",
     "marker_anchor" => [ 5, 10]
    }
  end

  def preprocessing
    generate_slug()
  end

  private

  def url_path
    '/audios/'
  end

end
