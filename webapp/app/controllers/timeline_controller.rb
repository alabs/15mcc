class TimelineController < ApplicationController

  # GET /timeline
  def index
    @timeline = {}
    @timeline["timeline"] = {}
    @timeline["timeline"]["headline"] = "Linea del tiempo"
    @timeline["timeline"]["type"] = "default"
#    @timeline["timeline"]["startDate"] = "2011,9,1"
    @timeline["timeline"]["text"] = "Linea del tiempo del banco de ideas de 15m.cc (http://bancodeideas.15m.cc)"
    @timeline["timeline"]["date"] = []
    Text.all.each do |c| 
      @timeline["timeline"]["date"] << {
        "startDate" => c.happened_at.strftime("%Y, %m, %d"), "headline" => c.title, "text" => c.body,
        "asset" => { "media" => "", "credit" => "", "caption" => "" }
      }
    end
    Image.all.each do |c| 
      @timeline["timeline"]["date"] << {
        "startDate" => c.happened_at.strftime("%Y, %m, %d"), "headline" => c.title, "text" => "",
        "asset" => { "media" => c.img.url(:small), "credit" => "", "caption" => "" }
      }
    end
    Video.all.each do |c| 
      @timeline["timeline"]["date"] << {
        "startDate" => c.happened_at.strftime("%Y, %m, %d"), "headline" => c.title, "text" => "",
        "asset" => { "media" => c.embed_url, "credit" => "", "caption" => "" }
      }
    end
    Audio.all.each do |c| 
      @timeline["timeline"]["date"] << {
        "startDate" => c.happened_at.strftime("%Y, %m, %d"), "headline" => c.title, "text" => "",
        "asset" => { "media" => "", "credit" => "", "caption" => "" }
      }
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timeline }
    end
  end

end

