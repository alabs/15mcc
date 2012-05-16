module ApplicationHelper

  def flash_notice_cookie(msg, expiration=nil)
    flash.each do |name, msg|
      cookies[:flash_notice] = {
        :value => msg,
        :expires => Time.now - 24.hours
      }
      cookies[:flash_notice_class] = {
        :value => name,
        :expires => Time.now - 24.hours
      }
    end
  end
end
