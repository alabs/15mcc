class TimelineController < ApplicationController

  # GET /timeline
  def index
    # JSON para el timeline general
    config = {
      :text => "del banco de ideas de 15m.cc (http://bancodeideas.15m.cc)",
      :media => "/assets/logo.png",
    }
    @timeline = create_timeline(config)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timeline }
    end
  end

  # GET /profile/[:username]/timeline.json
  def show
    # JSON para el timeline del usuario que se pasa en el params
    config = {
      :user => params[:username],
      :text => "del banco de ideas de 15m.cc (http://bancodeideas.15m.cc)",
      :media => "/assets/logo.png",
    }
    @timeline = create_timeline(config)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timeline }
    end
  end

  private

  def create_timeline(config)
    # Se le pasa un diccionario con los siguientes valores 
    # :user => el usuario si es que tiene, si no tiene mostrara el timeline general
    # :headline => titulo de la linea del tiempo
    # :text => descripcion de la linea del tiempo
    # :media => la imagen que se muestra al iniciar la linea temporal. Debe ser la seccion de la URL "/assets/imagen.png" 
    if config[:user] then
      @user = User.where(:username => config[:user]).first
      #audios = Audio.where(:user_id => @user.id).all
      images = Image.where(:user_id => @user.id).all
      texts = Text.where(:user_id => @user.id).all
      videos = Video.where(:user_id => @user.id).all
    else
      #audios = Audio.all
      images = Image.all
      texts = Text.all
      videos = Video.all
    end
    @timeline = {
      "timeline" => {
        "headline" => "Linea del tiempo",
        "type" => "default",
        "text" => config[:text],
        "asset" => {
          "media" => config[:media],
        },
        "date" => [],
      }
    }
    texts.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "<quote><a href='#{ c.get_absolute_url }'> #{c.body.truncate(300, :separator => ' ', :omission => '...')} </a></quote>",
          "asset" => { "media" => "", "credit" => "", "caption" => "" }
        }
      end
    end
    images.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "",
          "asset" => { "media" => c.img.url(:large), "credit" => "", "caption" => "" }
        }
      end
    end
    videos.each do |c| 
      if c.happened_at then
        @timeline["timeline"]["date"] << {
          "startDate" => c.print_timeline_startdate, "headline" => c.print_timeline_headline,
          "text" => "",
          "asset" => { "media" => c.embed_url, "credit" => "", "caption" => "" }
        }
      end
    end
    return @timeline
  end

end

