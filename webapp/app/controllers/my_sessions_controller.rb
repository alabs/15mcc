class MySessionsController < Devise::SessionsController

  def create
    cookies[:username] = {
      :value => current_user.username,
      :expires => 2.days.from_now,
      :domain => "bancodeideas.15m.cc"
    }

    super
  end
end
