namespace :_15mcc do
  desc "Reprocess images"
  task :reprocess => :environment do
    Image.all.each {|i| i.img.reprocess! if i.img }
  end
end
