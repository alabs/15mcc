class TextsController < ApplicationController

  check_authorization
  skip_authorization_check :only => :abuse

  # GET /texts
  # GET /texts.json
  def index
    @texts = Text.desc(:created_at).page(params[:page])
    authorize! :index, @texts

    @map = Text.all.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @texts }
    end
  end

  # GET /texts/1
  # GET /texts/1.json
  def show
    @text = Text.find_by_slug(params[:id])
    authorize! :show, @text

    @map = @text.to_gmaps4rails if @text.country

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @text }
    end
  end

  # GET /texts/new
  # GET /texts/new.json
  def new
    @text = Text.new
    @map = @text.to_gmaps4rails
    authorize! :create, @text
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @text }
    end
  end

  # GET /texts/1/edit
  def edit
    @text = Text.find_by_slug(params[:id])
    @map = @text.to_gmaps4rails
    authorize! :update, @text
  end

  # POST /texts
  # POST /texts.json
  def create
    @text = Text.new(params[:text])
    authorize! :create, @text

    @text.user = current_user || nil

    respond_to do |format|
      if verify_captcha(@text) and @text.save
        format.html { redirect_to @text, notice: 'El texto se ha creado.' }
        format.json { render json: @text, status: :created, location: @text }
      else
        format.html { render action: "new" }
        format.json { render json: @text.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /texts/1
  # PUT /texts/1.json
  def update
    @text = Text.find_by_slug(params[:id])
    authorize! :update, @text

    respond_to do |format|
      if @text.update_attributes(params[:text])
        format.html { redirect_to @text, notice: 'El texto se ha actualizado.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @text.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /texts/1
  # DELETE /texts/1.json
  def destroy
    @text = Text.find_by_slug(params[:id])
    authorize! :destroy, @text
    @text.destroy

    respond_to do |format|
      format.html { redirect_to texts_url }
      format.json { head :no_content }
    end
  end

  # GET /texts/1/download
  def download
    @text = Text.find_by_slug(params[:id])
    authorize! :download, @text
    filename = "/tmp/#{@text.id}.txt"
    f = File.new(filename, 'w')
    f.puts(@text.body)
    f.close
    send_file filename, :filename => @text.title + '.txt', :type => 'text/plain'
  end

  # POST /texts/1/priority
  def priority
    @text = Text.find(params[:id])
    authorize! :priority, @text

    case params["priority-action"]  
    when "add"
      @text.priority = true
    when "remove"
      @text.priority = false
    end

    @text.save
    render :text => "OK"
  end

  def abuse
    from = user_signed_in? ? current_user.email : params[:from]
    url = request.url.gsub(/\/abuse/, '')
    Mailman.abuse(from, params[:message], url).deliver
    flash[:notice] = "Tu mensaje a sido enviado a los editores de 15m.cc para ser revisado"
    redirect_to url
  end
end
