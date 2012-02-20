class TagsController < ApplicationController

  # GET /tags
  # GET /tags.json
  def index
    @tagcloud = Text.tags_with_weight

    respond_to do |format|
      format.html # tagcloud.html.erb
      format.json { render json: @tagcloud }
    end
  end


  # GET /tags/show/<tagname>
  # GET /tags/show/<tagname>.json
  def show
    @tag = params['tag']
    @contents = Text.tagged_with(@tag) || Video.tagged_with(@tag) || Image.tagged_with(@tag)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @contents }
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
