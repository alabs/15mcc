class MySessionsController < Devise::SessionsController

  after_filter :set_cookie

  protected

  def set_cookie
    if current_user
      cookies[:username] = {
        :value => current_user.username,
        :expires => 2.days.from_now
      }
      if current_user.role == 'admin'
        cookies[:a] = {
          :value => 1,
          :expires => 2.days.from_now
        }
      end
    else
      cookies.delete(:username)
      cookies.delete(:a)
    end
  end
end
