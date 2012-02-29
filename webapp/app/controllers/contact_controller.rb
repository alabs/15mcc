class ContactController < ApplicationController

  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])
    if @contact.save
      Mailman.send_contact_message(@contact).deliver
      redirect_to root_path, :notice => 'Mensaje recibido, pronto nos pondremos en contacto'

      return
    else
      render :index
    end
  end
end
