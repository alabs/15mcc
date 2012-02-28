class TagsController < ApplicationController

  # GET /tags
  # GET /tags.json
  def index
    tags = Text.tags_with_weight + Image.tags_with_weight + Video.tags_with_weight + Audio.tags_with_weight
    @tagcloud = {}
    tags.each do |t|
      if @tagcloud[t[0]] == nil then @tagcloud[t[0]] = t[1]
      else @tagcloud[t[0]] = @tagcloud[t[0]] + t[1]
      end
    end

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
    if params["term"]
      # It's only from Text but it seems like is in all the other taggable models
      all_tags = Text.tags.grep(/#{params["term"]}/)
    else
      all_tags = Text.tags
    end
    
    @tags = all_tags.map {|t| {"id" => t, "label" => t, "value" => t} }
    
    respond_to do |format|
      format.json { render :json => @tags }
    end

  end

end
