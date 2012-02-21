var timeline;
var data = [];

$(function(){

  if ($('#timeline').length != 0){
    // get the data list, we need start/content attributes for every content
    $.get('/timeline.json', function(resp){
      $.each(resp, function(){
        var date = $(this)[0].happened_at;
        if (date != null){
          data.push({ start: new Date(date), content: $(this)[0].title});   
        }
      });

      // specify options
      var options = {
        'width':  '100', 
        'height': '300px',
        'editable': false,   // enable dragging and editing events 
        'style': 'box'
      };

      // Instantiate our timeline object.
      timeline = new links.Timeline(document.getElementById('timeline'));
      
      // Draw our timeline with the created data and options 
      timeline.draw(data, options);

    });

  }

});
