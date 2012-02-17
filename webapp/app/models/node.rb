class Node
  include Mongoid::Document
  field :label, :type => String
  field :pos_left, :type => Integer
  field :pos_top, :type => Integer
end
