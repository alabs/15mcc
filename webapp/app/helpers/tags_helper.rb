module TagsHelper

  def tag_weight_css(weight) 
    case 
    when weight == 1.0
      return "tag1"
    when (1..5).include?(weight)
      return "tag2"
    when (5..10).include?(weight)
      return "tag3"
    when (10..20).include?(weight)
      return "tag4"
    when weight > 20
      return "tag5"
    end
  end

end
