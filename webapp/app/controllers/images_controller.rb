class ImagesController < ApplicationController

  check_authorization
  skip_authorization_check :only => :abuse

  # GET /images
  # GET /images.json
  def index
    @images = Image.desc(:created_at).page(params[:page])
    authorize! :index, @images

    @map = Image.all.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @images }
    end
  end

  # GET /images/1
  # GET /images/1.json
  def show
    @image = Image.find(params[:id])
    authorize! :show, @image

    @map = @image.to_gmaps4rails

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @image }
    end
  end

  # GET /images/new
  # GET /images/new.json
  def new
    @image = Image.new
    @map = @image.to_gmaps4rails
    authorize! :create, @image
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @image }
    end
  end

  # GET /images/1/edit
  def edit
    @image = Image.find(params[:id])
    @map = @image.to_gmaps4rails
    authorize! :update, @image
  end

  # POST /images
  # POST /images.json
  def create
    @image = Image.new(params[:image])
    authorize! :create, @image

    @image.user = current_user || nil

    respond_to do |format|
      if verify_captcha(@image) and @image.save
        format.html { redirect_to @image, notice: 'La foto se ha creado.' }
        format.json { render json: @image, status: :created, location: @image }
      else
        format.html { render action: "new" }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end



  # PUT /images/1
  # PUT /images/1.json
  def update
    @image = Image.find(params[:id])
    authorize! :update, @image

    respond_to do |format|
      if @image.update_attributes(params[:image])
        format.html { redirect_to @image, notice: 'La imagen se ha actualizado.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /images/1
  # DELETE /images/1.json
  def destroy
    @image = Image.find(params[:id])
    authorize! :destroy, @image
    @image.destroy

    respond_to do |format|
      format.html { redirect_to images_url }
      format.json { head :no_content }
    end
  end

  # GET /texts/1/download
  def download
    @image = Image.find(params[:id])
    authorize! :download, @image
    send_file @image.img.path, :type => @image.img.content_type
  end

  # POST /images/1/priority
  def priority
    @image = Image.find(params[:id])
    authorize! :priority, @image

    case params["priority-action"]  
    when "add"
      @image.priority = true
    when "remove"
      @image.priority = false
    end

    @image.save
    render :text => "OK"
  end

  def abuse
    if verify_recaptcha and params[:honeypot].blank?
      from = user_signed_in? ? current_user.email : params[:from]
      url = request.url.gsub(/\/abuse/, '')
      Mailman.abuse(from, params[:message], url).deliver
      flash[:notice] = "Tu mensaje a sido enviado a los editores de 15m.cc para ser revisado"
      redirect_to url
    else
      redirect_to root_url, :notice => 'Bla bla'
    end
  end
end
