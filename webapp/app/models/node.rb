class Node

  include Mongoid::Document
  include Mongoid::Timestamps
  #include Mongoid::Taggable

  field :label, :type => String
  field :pos_left, :type => Integer
  field :pos_top, :type => Integer

end
