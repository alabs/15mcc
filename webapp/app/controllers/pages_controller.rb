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
  end
end
