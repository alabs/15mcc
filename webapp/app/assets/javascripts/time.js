var timeline;
var data;

// Called when the Visualization API is loaded.
function drawVisualization() {
  // Create a JSON data table
  data = [
    {
      'start': new Date(2010,7,23),
      'content': 'Conversation<br><img src="img/comments-icon.png" style="width:32px; height:32px;">'
    },
    {
      'start': new Date(2010,7,23,23,0,0),
      'content': 'Mail from boss<br><img src="img/mail-icon.png" style="width:32px; height:32px;">'
    },
    {
      'start': new Date(2010,7,24,16,0,0),
      'content': 'Report'
    },
    {
      'start': new Date(2010,7,26),
      'end': new Date(2010,8,2),
      'content': 'Traject A'
    },
    {
      'start': new Date(2010,7,28),
      'content': 'Memo<br><img src="img/notes-edit-icon.png" style="width:48px; height:48px;">'
    },
    {
      'start': new Date(2010,7,29),
      'content': 'Phone call<br><img src="img/Hardware-Mobile-Phone-icon.png" style="width:32px; height:32px;">'
    },
    {
      'start': new Date(2010,7,31),
      'end': new Date(2010,8,3),
      'content': 'Traject B'
    },
    {
      'start': new Date(2010,8,4,12,0,0),
      'content': 'Report<br><img src="img/attachment-icon.png" style="width:32px; height:32px;">'
    }        
  ];

  // specify options
  var options = {
    'width':  '100', 
    'height': '300px',
    'editable': true,   // enable dragging and editing events 
    'style': 'box'
  };

  // Instantiate our timeline object.
  timeline = new links.Timeline(document.getElementById('timeline'));
  
  function onRangeChanged(properties) {
    document.getElementById('info').innerHTML += 'rangechanged ' +
      properties.start + ' - ' + properties.end + '<br>';
  }
  
  // attach an event listener using the links events handler
  links.events.addListener(timeline, 'rangechanged', onRangeChanged);

  // Draw our timeline with the created data and options 
  timeline.draw(data, options);
}

$(function(){

  $("body").onload(drawVisualization());

});
