class Image < Content

  include Wizard
  include Mongoid::Paperclip

  validates_presence_of :title
  # ya no es necesaria esta validación porque la URL del
  # recurso siempre es diferente
  #validates_uniqueness_of :title

  # esto no se puede activar por el flujo del new_step, create_step, confirm_step, etc
  # validates_presence_of :happened_at

  before_save :preprocessing

  #paperclip
  has_mongoid_attached_file :img,:styles => {
    :big => ['750x600', :jpg],
    :large => ['500x300', :jpg],
    :small => ['260x180', :jpg],
    :marker => ['20x20', :jpg]
  }

  def gmaps4rails_infowindow
    "
    <a href='#{ get_absolute_url }'>
      <h5>#{ERB::Util.html_escape title}</h5>
      <img class='infowindow-thumb' src='#{ img.url(:small) }' />
    </a>
    "
  end

  def gmaps4rails_marker_picture
    {
     "picture" => img.url(:marker),
     "width" => "20",
     "height" => "20",
     "marker_anchor" => [ 5, 10]
    }
  end

  protected

  def preprocessing
    #Exif metadata
    extract_metadata()
  end

  private

  def url_path
    '/images/'
  end

  def extract_metadata
    return if img.queued_for_write[:original].nil?
    begin
      exif_info = EXIFR::JPEG.new(img.queued_for_write[:original].path)
      #si no tengo datos exif no continuo
      return unless exif_info.exif?
      # la lógica para pillar el exif y 
      # los datos del form para happened_at
      # no es correcta, comento esta llamada
      # self.happened_at = exif_info.date_time
      #datos gps
      return if exif_info.gps.nil?
      self.coordinates = [exif_info.gps.longitude,exif_info.gps.latitude]
      logger.debug "Latitud: #{exif_info.gps.latitude} y Longitud: #{exif_info.gps.longitude}"
    rescue EXIFR::MalformedJPEG => mjpeg
      logger.error "Error en la captura de datos EXIF de una imagen: #{mjpeg.message}"
    end
  end

end
