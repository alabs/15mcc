class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    # este método debe estar implementado en el modelo
    @user = User.find_for_facebook_oauth(request.env['omniauth.auth'], current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => 'Facebook'
      sign_in_and_redirect @user, :event => :authentication
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end

  def google
    #logger.info('DEBUG 15M.CC: ' + request.env['omniauth'].inspect)
    omniauth = request.env['omniauth.auth']
    raise omniauth.to_yaml
    @user = User.find_for_open_id(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
end
