class PagesController < ApplicationController

  check_authorization
  skip_authorization_check :only => :banned

  def index
    authorize! :index, Page
    #set_http_cache(6.hours, visibility = true)
  end

  def bank
    authorize! :bank, Page
  end

  # método para mostrar el contenido generardo por
  # el usuario
  def profile
    @user = User.where(:username => params[:username]).first

    authorize! :profile, Page
    unless @user
      render_404
      return
    end

    #@tagcloud = @user.content.all_tags
    @tagloud = []
    # obtenemos un listado de todos los tags de todos los tipos de contenidos
    contents = @user.videos + @user.images + @user.texts
    tag_list = []
    tag_list = contents.each {|c| c.tags.each {|t| tag_list << t} }
    Content.all_tags.each do |c|
      if tag_list.include? c[:name] then
        @tagcloud << {:name => c[:name], :count => c[:count]}
      end  
    end  

    logger.info "       DEBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
    logger.info @tagcloud
    logger.info "       DEBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"

    @texts = @user.texts.all
    @images = @user.images.all
    @videos = @user.videos.all
    @audios = @user.audios.all

    @map = (@texts + @images + @videos + @audios).to_gmaps4rails
  end

  def show 
    @page = Page.find_by_slug(params[:id])

    unless @page
      render_404
      return
    end

    authorize! :show, @page
  end

  def mercury_update  
    page = Page.find_by_slug(params[:id])  
    page.body = params[:content][:page_body][:value]  
    authorize! :update, page
    page.save!  
    render text: ""  
  end  

  def banned
  end
end
