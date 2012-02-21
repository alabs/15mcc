class TimelineController < ApplicationController

  # GET /timeline
  def index
    @contents = Text.all | Image.all | Video.all | Audio.all
    @contents.map {|c| c.write_attribute(:klass, c.class.to_s) }

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @contents }
    end
  end

end

