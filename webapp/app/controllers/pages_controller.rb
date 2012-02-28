class PagesController < ApplicationController

  check_authorization

  def index
    authorize! :index, Page
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
      render :text => "404 Not Found", :status => 404
      return
    end

    @texts = Text.where(:user_id => @user.id).all
    @images = Image.where(:user_id => @user.id).all
    @videos = Video.where(:user_id => @user.id).all
    @audios = Audio.where(:user_id => @user.id).all
  end

  def show 
    @page = Page.find_by_slug(params[:id])
    authorize! :show, @page
  end

  def mercury_update  
    page = Page.find_by_slug(params[:id])  
    page.body = params[:content][:page_body][:value]  
    authorize! :update, page
    page.save!  
    render text: ""  
  end  

end
