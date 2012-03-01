class Admin::UsersController < ApplicationController

  before_filter :authenticate_user!
  before_filter :check_role

  def index
    @users = User.asc(:username).page(params[:page])
  end

  respond_to :html, :json
  def update
    @user = User.where(:username => params[:username]).first
    @user.assign_attributes(params[:user], :as => :admin)
    @user.save
    respond_with @user
  end

  def search
    @users = User.where(:username => /#{params[:get]}/) | User.where(:email => /#{params[:get]}/) 

    respond_to do |format|
      format.html { render :layout => false }
      format.json { render :json => @users }
    end
  end


  protected

  def check_role
    if current_user.role != 'admin'
      flash[:error] = 'Acceso no autorizado'
      redirect_to root_path
    end
  end

end
