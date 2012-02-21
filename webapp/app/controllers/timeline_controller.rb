class TimelineController < ApplicationController

  # GET /timeline
  def index
    @contents = Text.all || Image.all || Video.all || Audio.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @contents }
    end
  end

end

