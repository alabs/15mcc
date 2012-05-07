class Image < Content

  include Wizard
  include Mongoid::Paperclip

  validates_presence_of :title
  validates_uniqueness_of :title

  #paperclip
  has_mongoid_attached_file :img,:styles => {:small => ['260x180', :jpg],:marker => ['20x20', :jpg]}

  def gmaps4rails_infowindow
    "
    <a href='#{ get_absolute_url }'>
      <h5>#{ERB::Util.html_escape title}</h5>
      <img class='infowindow-thumb' src='#{ img.url(:small) }' />
    </a>
    <b>Etiquetado con</b>: #{ tags }
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

  def get_absolute_url
    user = self.user ? self.user.username : "anonymous" 
    '/' + user + '/images/' + self.slug
  end

  protected

  def preprocessing
    generate_slug()
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
      self.happened_at = exif_info.date_time
      #datos gps
      return if exif_info.gps.nil?
      self.coordinates = [exif_info.gps.longitude,exif_info.gps.latitude]
      logger.debug "Latitud: #{exif_info.gps.latitude} y Longitud: #{exif_info.gps.longitude}"
    rescue EXIFR::MalformedJPEG => mjpeg
      logger.error "Error en la captura de datos EXIF de una imagen: #{mjpeg.message}"
    end
  end

end
