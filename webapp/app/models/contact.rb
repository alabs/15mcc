class Contact

  include Mongoid::Document
  field :name, :type => String
  field :email, :type => String
  field :subject, :type => String
  field :message, :type => String
end
