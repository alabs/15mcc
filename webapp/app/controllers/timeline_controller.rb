class TimelineController < ApplicationController

  # GET /timeline
  def index
    @contents = Text.all | Image.all | Video.all | Audio.all
    @contents.map do |c|
      user = c.user ? c.user.username : "anonymous"
      c.write_attribute(:user, user)
      c.write_attribute(:klass, c.class.to_s)
    end 

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @contents }
    end
  end

end

