class SearchController < ApplicationController

  def search
    @query = params[:q]
    @contents = Content.fulltext_search(@query)
    #@map = @contents.to_gmaps4rails
    respond_to do |format|
      format.html # search.html.erb
      format.json { render json: @contents }
    end
  end

  def ajax
    query = params[:term]
    contents = Content.fulltext_search(query) 
    @result = contents.map {|x| {"id" => x.title, "label" => x.title, "url" => x.get_absolute_url}}.compact
    logger.info @result
    respond_to do |format|
      format.json { render json: @result }
    end
  end 

end
