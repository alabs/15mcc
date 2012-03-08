# This file goes in config/initializers
require 'bootstrap_form_builder'

# Make this the default Form Builder. You can delete this if you don't want form_for to use
# the bootstrap form builder by default
ActionView::Base.default_form_builder = BootstrapFormBuilder::FormBuilder

# Add in our FormHelper methods, so you can use bootstrap_form_for. 
ActionView::Base.send :include, BootstrapFormBuilder::FormHelper

### Only use one of these error handling methods ###

# Get rid of the rails error handling completely.
ActionView::Base.field_error_proc = Proc.new do |html_tag, instance_tag|
  "#{html_tag}".html_safe
end

# Only remove the default rails error handling on input and label
# Relies on the Nokogiri gem.
# Credit to https://github.com/ripuk
ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
  html = %(<div class="field_with_errors">#{html_tag}</div>).html_safe
  elements = Nokogiri::HTML::DocumentFragment.parse(html_tag).css "label, input"
  elements.each do |e|
    if e.node_name.eql? 'label'
      html = %(#{e}).html_safe
    elsif e.node_name.eql? 'input'
      html = %(#{e}).html_safe
    end
  end
  html
end
