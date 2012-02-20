class AudiosController < ApplicationController

  check_authorization

  # GET /audios
  # GET /audios.json
  def index
    @audios = Audio.desc(:created_at).page(params[:page])
    authorize! :index, @audios

    @map = Audio.all.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @audios }
    end
  end

  # GET /audios/1
  # GET /audios/1.json
  def show
    @audio = Audio.find(params[:id])
    authorize! :show, @audio

    @map = @audio.to_gmaps4rails

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @audio }
    end
  end

  # GET /audios/new
  # GET /audios/new.json
  def new
    @audio = Audio.new
    authorize! :create, @audio

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @audio }
    end
  end

  # GET /audios/1/edit
  def edit
    @audio = Audio.find(params[:id])
    authorize! :update, @audio
  end

  # POST /audios
  # POST /audios.json
  def create
    @audio = Audio.new(params[:audio])
    authorize! :create, @audio

    @audio.user = current_user || nil

    respond_to do |format|
      if @audio.save
        format.html { redirect_to @audio, notice: 'Audio was successfully created.' }
        format.json { render json: @audio, status: :created, location: @audio }
      else
        format.html { render action: "new" }
        format.json { render json: @audio.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /audios/1
  # PUT /audios/1.json
  def update
    @audio = Audio.find(params[:id])
    authorize! :update, @audio

    respond_to do |format|
      if @audio.update_attributes(params[:audio])
        format.html { redirect_to @audio, notice: 'Audio was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @audio.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /audios/1
  # DELETE /audios/1.json
  def destroy
    @audio = Audio.find(params[:id])
    authorize! :destroy, @audio
    @audio.destroy

    respond_to do |format|
      format.html { redirect_to audios_url }
      format.json { head :no_content }
    end
  end
end
