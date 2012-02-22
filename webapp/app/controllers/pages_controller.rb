class PagesController < ApplicationController

  def index
  end

  def bank
  end

  # método para mostrar el contenido generardo por
  # el usuario
  def profile
    @user = User.where(:username => params[:username]).first
    
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
    @page = Page.find(params[:id])
  end

  def mercury_update  
    page = Page.find(params[:id])  
    puts params
    page.content = params[:content][:page_body][:value]  
    page.save!  
    render text: ""  
  end  

end
