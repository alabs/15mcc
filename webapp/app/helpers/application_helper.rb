module ApplicationHelper

  def flash_notice_cookie(msg, expiration=nil)
    flash.each do |name, msg|
      cookies[:flash_notice] = {
        :value => msg,
        :expires => expiration || Time.now
      }
      cookies[:flash_notice_class] = {
        :value => name,
        :expires => expiration || Time.now
      }
    end
  end
end
