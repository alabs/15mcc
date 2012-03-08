class Image < Content

  include Wizard
  include Mongoid::Paperclip
  

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
    "/images/" + slug
  end

  protected

  def preprocessing
    generate_slug()
    #Exif metadata
    extract_metadata()
  end

  private

  def extract_metadata
    return if img.queued_for_write[:original].nil?
    exif_info = EXIFR::JPEG.new(img.queued_for_write[:original].path)

    return unless exif_info.exif?
    #logger.debug 'escribiendo metadatos exif'
    self.happened_at = exif_info.date_time
    #logger.debug "fecha: #{exif_info.date_time}"
    #datos gps
    return if exif_info.gps.nil?
    self.coordinates = [exif_info.gps.longitude,exif_info.gps.latitude]
    logger.debug "Latitud: #{exif_info.gps.latitude} y Longitud: #{exif_info.gps.longitude}"
  end

end
