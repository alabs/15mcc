class TimelineController < ApplicationController

  # GET /timeline
  def index
    @timeline = {}
    @timeline["timeline"] = {}
    @timeline["timeline"]["headline"] = "Linea del tiempo"
    @timeline["timeline"]["type"] = "default"
#    @timeline["timeline"]["startDate"] = "2011,9,1"
    @timeline["timeline"]["text"] = "del banco de ideas de 15m.cc (http://bancodeideas.15m.cc)"
    @timeline["timeline"]["asset"] = {}
    @timeline["timeline"]["asset"]["media"] = "/assets/logo.png" 
    @timeline["timeline"]["date"] = []
    Text.all.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "<quote><a href='#{ c.get_absolute_url }'> #{c.body.truncate(300, :separator => ' ', :omission => '...')} </a></quote>",
          "asset" => { "media" => "", "credit" => "", "caption" => "" }
        }
      end
    end
    Image.all.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "",
          "asset" => { "media" => c.img.url(:large), "credit" => "", "caption" => "" }
        }
      end
    end
    Video.all.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "",
          "asset" => { "media" => c.embed_url, "credit" => "", "caption" => "" }
        }
      end
    end
#    Audio.all.each do |c| 
#      if c.happened_at then
#        @timeline["timeline"]["date"] << {
#          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
#          "text" => "<div class='center'>
#            <audio controls='controls'><source src='#{c.archive.url}' /></audio><div id='flash-fallback'></div>
#          </div>",
#          "asset" => { "media" => c.archive.url, "credit" => "", "caption" => "" }
#        }
#      end
#    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timeline }
    end
  end

end

