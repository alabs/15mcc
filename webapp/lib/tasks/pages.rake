
namespace :pages do
  desc "Creates static pages"
  task :create => :environment do
    pages = [ "Que es 15m.cc", "Como colaborar", "Quienes somos", "Contacto", "Donar", "Condiciones de uso", "Licencia", "VideoDownloader" ] 
    pages.each do |p|
      Page.create(:title => p )
    end
  end
end
