var timeline;
var data = [];

$(function(){

  if ($('#timeline').length != 0){
    // get the data list, we need start/content attributes for every content
    $.get('/timeline.json', function(resp){
      $.each(resp, function(){
        var date = $(this)[0].happened_at;
        if (date != null){
          var type_slug; var type_icon; 

          switch( $(this)[0].klass ){
            case "Text":
              type_slug = "/texts/"
              type_icon = "align-left"
              break;
            case "Image":
              type_slug = "/images/"
              type_icon = "picture"
              break;
            case "Video":
              type_slug = "/videos/"
              type_icon = "film"
              break;
            case "Audio":
              type_slug = "/audios/"
              type_icon = "film"
              break;
            default:
              type_slug = "/texts/"
              type_icon = "align-left"
          }

          var title = '<a href="' + type_slug + $(this)[0].slug + '"><i class="icon-' + type_icon + '"></i>' + $(this)[0].title + '</a>';
          data.push({ start: new Date(date), content: title });   
        }
      });

      // specify options
      var options = {
     //   'width':  '200', 
     //   'height': '500px',
        'showNavigation': true, 
        'style': 'box'
      };

      // Instantiate our timeline object.
      timeline = new links.Timeline(document.getElementById('timeline'));
      
      // Draw our timeline with the created data and options 
      timeline.draw(data, options);

    });

  }

});
