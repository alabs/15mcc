class ApplicationController < ActionController::Base

  protect_from_forgery

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  protected

  def verify_captcha(model)
    unless user_signed_in?
      if verify_recaptcha(:model => model)
        return true
      else
        return false
      end
    else
      return true
    end
  end
end
