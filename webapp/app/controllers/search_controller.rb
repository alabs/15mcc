class SearchController < ApplicationController

  def search
    @query = params[:q]
    @contents = Text.fulltext_search(@query) + Audio.fulltext_search(@query) + Video.fulltext_search(@query) + Image.fulltext_search(@query) 
    authorize! :search, @contents

    @map = @contents.to_gmaps4rails
    
    respond_to do |format|
      format.html # search.html.erb
      format.json { render json: @contents }
    end
  end

end
