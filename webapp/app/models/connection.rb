class Connection

  include Mongoid::Document
  include Mongoid::Timestamps

  # evitamos que haya conexiones duplicadas con mismo origen y destino
  validates :target_id, :uniqueness => {:scope => :source_id}

  field :label, :type => String
  field :source_id, :type => String
  field :target_id, :type => String

end
