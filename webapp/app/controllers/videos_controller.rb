class VideosController < ApplicationController
  
  check_authorization

  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.desc(:created_at).page(params[:page])
    authorize! :index, @videos

    @map = Video.all.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @videos }
    end
  end

  # GET /videos/1
  # GET /videos/1.json
  def show
    @video = Video.find_by_slug(params[:id])
    authorize! :show, @video

    @map = @video.to_gmaps4rails

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @video }
    end
  end

  # GET /videos/new
  # GET /videos/new.json
  def new
    @video = Video.new
    authorize! :create, @video

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @video }
    end
  end

  # GET /videos/1/edit
  def edit
    @video = Video.find_by_slug(params[:id])
    authorize! :update, @video
  end

  # POST /videos
  # POST /videos.json
  def create
    @video = Video.new(params[:video])
    authorize! :create, @video

    @video.user = current_user || nil

    respond_to do |format|
      if verify_captcha(@video) && @video.save
        format.html { redirect_to @video, notice: 'Video was successfully created.' }
        format.json { render json: @video, status: :created, location: @video }
      else
        format.html { render action: "new" }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /videos/1
  # PUT /videos/1.json
  def update
    @video = Video.find_by_slug(params[:id])
    authorize! :update, @video

    respond_to do |format|
      if @video.update_attributes(params[:video])
        format.html { redirect_to @video, notice: 'Video was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
    @video = Video.find_by_slug(params[:id])
    authorize! :destroy, @video
    @video.destroy

    respond_to do |format|
      format.html { redirect_to videos_url }
      format.json { head :no_content }
    end
  end

  # POST /videos/1/priority
  def priority
    @video = Video.find(params[:id])
    authorize! :priority, @video

    case params["priority-action"]  
    when "add"
      @video.priority = true
    when "remove"
      @video.priority = false
    end

    @video.save
    render :text => "OK"
  end
end
