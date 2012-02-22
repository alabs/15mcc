class Connection

  include Mongoid::Document
  include Mongoid::Timestamps

  field :label, :type => String
  field :source_id, :type => String
  field :target_id, :type => String

end
