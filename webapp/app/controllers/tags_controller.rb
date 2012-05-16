class TagsController < ApplicationController

  # GET /tags
  # GET /tags.json
  def index
    @tagcloud = Content.all_tags

    respond_to do |format|
      format.html # tagcloud.html.erb
      format.json { render json: @tagcloud }
    end
  end

  # GET /tags/show/<tagname>
  # GET /tags/show/<tagname>.json
  def show
    @tag = params['tag']
    @texts = Text.tagged_with(@tag) 
    @videos = Video.tagged_with(@tag) 
    @images = Image.tagged_with(@tag) 
    @audios = Audio.tagged_with(@tag)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: [@texts, @videos, @images, @audios] }
    end
  end

  # GET /tags/small/<tagname>
  # GET /tags/small/<tagname>.json
  def small
    @tags = params['tags']
    @texts = Text.tagged_with_any(@tags) 
    @videos = Video.tagged_with_any(@tags) 
    @images = Image.tagged_with_any(@tags) 
    @audios = Audio.tagged_with_any(@tags)

    respond_to do |format|
      format.html { render :layout => false } # small.html.erb
      format.json { render json: [@texts, @videos, @images, @audios] }
    end
  end

  # GET /tags/search.json
  # GET /tags/search.json?term="bla"
  def search

    # esto es un listado de todos los tags:
    # ["bla", "feature", "hola"]
    tags = Content.all_tags.map {|c| c[:name] }

    if params["term"]
      # buscamos el termino
      tags = tags.grep(/#{params["term"]}/i)
    end
    
    # devolvemos con una list un hash con cada termino que encontramos
    @tags = tags.map {|t| {"id" => t, "label" => t, "value" => t} }
    
    respond_to do |format|
      format.json { render :json => @tags }
    end

  end

end
