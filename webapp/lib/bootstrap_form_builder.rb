# This file goes in lib/
# Usage:
#= bootstrap_form_for @calendar_entry do |f|
#  %fieldset
#    %legend= locals[:title] || 'Edit Calendar Entry'
#    = f.text_field :name, :class => 'span3'
#    = f.text_area :description, :class => 'span3'
#    = f.jquery_datetime_select :start_time, :class => 'span3'
#    = f.jquery_datetime_select :end_time, :class => 'span3'
#    = f.check_box :all_day
#    = f.text_field :tag_string, :label => 'Tags', :class => 'span3'
#    .form-actions
#      = f.submit 'Save', :class => 'btn btn-primary'
#      = link_to 'Cancel', calendar_entries_path, :class => 'btn'
#
# I don't do HAML
# <%= bootstrap_form_for @calendar_entry do |f| %>
#   <%= content_tag :legend, (locals[:title] || 'Edit Calendar Entry') %>
#   <%= f.text_field :name, :class => 'span3' %>
#   <%= f.text_area :description, :class => 'span3' %>
#   <%= f.jquery_datetime_select :start_time, :class => 'span3' %>
#   <%= f.jquery_datetime_select :end_time, :class => 'span3' %>
#   <%= f.check_box :all_day %>
#   <%= f.text_field :tag_string, :label => 'Tags', :class => 'span3' do %>
#     <p class="help-block">Use commas to separate tags.</p>
#   <% end %>
#   <div class="form-actions">
#     <%= f.submit 'Save', :class => 'btn btn-primary' %>
#     <%= link_to 'Cancel', calendar_entries_path, :class => 'btn' %>
#   </div>

module BootstrapFormBuilder
  module FormHelper
    [:form_for, :fields_for].each do |method|
      module_eval do
        define_method "bootstrap_#{method}" do |record, *args, &block|
          # add the TwitterBootstrap builder to the options options           = args.extract_options!
          options[:builder] = BootstrapFormBuilder::FormBuilder

          if method == :form_for
            options[:html] ||= {}
            # fix para que no joda el content-form en caso de estar
            if defined? options[:html][:class] and options[:html][:class] != "content-form"
              options[:html][:class] = 'form-horizontal'
            end
          end

          # call the original method with our overridden options
          send method, record, *(args << options), &block
        end
      end
    end
  end

  class FormBuilder < ActionView::Helpers::FormBuilder
    include FormHelper

    def get_error_text(object, field, options)
      if object.nil? || options[:hide_errors]
        ""
      else
        errors = object.errors[field.to_sym]
        if errors.empty? then "" else errors.first end
      end
    end

    def get_object_id(field)
      object = @template.instance_variable_get("@#{@object_name}")
      return options[:id] || object.class.name.underscore + '_' + field.to_s
    end

    def get_label(field, options)
      # fix para que funcione el html en los labels
      labelOptions = {:class => 'control-label'} #.merge(options[:label] || {})
      if options.has_key? :label then
        labelTag = label(field, labelOptions) do 
          options[:label].html_safe
        end
      else
        labelTag = label(field, labelOptions)
      end
    end

    def jquery_datetime_select(field, options = {})
      id = get_object_id(field, options)
      
      date_time = 
        if options['start_time']
          options['start_time']
        elsif object.nil?
          DateTime.now.utc
        else
          object.send(field.to_sym)
        end

      datetime_picker_script = "<script type='text/javascript'>" +
            "$( function() { " +
              "$('##{id}')" +
              ".datetimepicker( $.datepicker.regional[ 'en-NZ' ] )" +
              ".datetimepicker( 'setDate', new Date('#{date_time}') ); } );" +
          "</script>"
      return basic_datetime_select(field, options.merge(javascript: datetime_picker_script))
    end

    def basic_datetime_select(field, options = {})
      placeholder_text = options[:placeholder_text] || ''
      id = get_object_id(field, options)

      errorText = get_error_text(object, field, options)
      wrapperClass = 'control-group' + (errorText.empty? ? '' : ' error')
      errorSpan = if errorText.empty? then "" else "<span class='help-inline'>#{errorText}</span>" end
      
      labelTag = get_label(field, options)

      date_time = 
        if options[:start_time]
          options[:start_time]
        elsif object.nil?
          DateTime.now.utc
        else
          object.send(field.to_sym)
        end

      javascript = options[:javascript] || 
        "
  <script>
    $(function() { 
      var el = $('##{id}');
      var currentValue = el.val();
      if(currentValue.trim() == '') return;
      el.val(new Date(currentValue).toString('dd MMM, yyyy HH:mm'));
    });
  </script>"

      ("<div class='#{wrapperClass}'>" + 
        labelTag +
        "<div class='controls'>" +
          super_text_field(field, {
            :id => id, :placeholder => placeholder_text, :value => date_time.to_s,
            :class => options[:class]
          }.merge(options[:text_field] || {})) + 
          errorSpan +
          javascript +
        "</div>" +
      "</div>").html_safe
    end

    basic_helpers = %w{text_field text_area select email_field password_field check_box}

    multipart_helpers = %w{date_select datetime_select}

    basic_helpers.each do |name|
      # First alias old method
      class_eval("alias super_#{name.to_s} #{name}")

      define_method(name) do |field, *args, &help_block|
        options = args.last.is_a?(Hash) ? args.last : {}
        object = @template.instance_variable_get("@#{@object_name}")

        labelTag = get_label(field, options)

        errorText = get_error_text(object, field, options)

        wrapperClass = 'control-group' + (errorText.empty? ? '' : ' error')
        errorSpan = if errorText.empty? then "" else "<span class='help-inline'>#{errorText}</span>" end 
        ("<div class='#{wrapperClass}'>" +
            labelTag + 
            "<div class='controls'>" + 
              super(field, *args) +
              errorSpan +
              (help_block ? @template.capture(&help_block) : "") +
            "</div>" +
          "</div>"
        ).html_safe
      end
    end  
    
    multipart_helpers.each do |name|
      define_method(name) do |field, *args, &help_block|
        options = args.last.is_a?(Hash) ? args.last : {}
        object = @template.instance_variable_get("@#{@object_name}")

        labelTag = get_label(field, options)

        options[:class] = 'inline ' + options[:class] if options[:class]
        
        errorText = get_error_text(object, field, options)

        wrapperClass = 'control-group' + (errorText.empty? ? '' : ' error')
        errorSpan = if errorText.empty? then "" else "<span class='help-inline'>#{errorText}</span>" end 
        ("<div class='#{wrapperClass}'>" +
            labelTag + 
            "<div class='controls'>" + 
                super(field, *args) +
                errorSpan +
                (help_block ? @template.capture(&help_block) : "") +
            "</div>" +
          "</div>"
        ).html_safe
      end
    end
  end
end

