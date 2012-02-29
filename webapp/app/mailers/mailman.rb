class Mailman < ActionMailer::Base
  default from: "noreply@15m.cc"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.mailman.abuse.subject

  def abuse(from, message, url)
    @message = message
    @url = url
    subject = '[15m.cc] Denuncia de contenido inapropiado'
    mail to: 'contacto@15m.cc', reply_to: from, subject: subject
  end

  def send_contact_message(message)
  end
end
