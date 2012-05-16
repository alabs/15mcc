class MySessionsController < Devise::SessionsController

  after_filter :set_cookie

  protected

  def set_cookie
    if current_user
      cookies[:username] = {
        :value => current_user.username,
        :expires => 2.days.from_now,
        :domain => "bancodeideas.15m.cc"
      }
    end
  end
end
