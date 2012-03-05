SitemapGenerator::Sitemap.default_host = "http://15m.cc"

SitemapGenerator::Sitemap.create do

  # Páginas semi estaticas
  Page.all.each do |page|
    add page_path(page)
  end
  
  add tags_path
  add texts_path
  add images_path
  add audios_path
  add videos_path

  # Contenidos
  contents = [Text, Audio, Image, Video]
  contents.each do |ct|
    ct.all.each do |c|
      add c.get_absolute_url, :lastmod => c.updated_at, :changefreq => 'daily'
    end
  end

end
