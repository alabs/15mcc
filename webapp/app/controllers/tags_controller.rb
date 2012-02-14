class TagsController < ApplicationController

  # GET /tags/tagcloud
  # GET /tags/tagcloud.json
  def tagcloud
    @tagcloud = Text.tags_with_weight

    respond_to do |format|
      format.html # tagcloud.html.erb
      format.json { render json: @tagcloud }
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
