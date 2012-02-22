//= require external
//= require_tree .
//

function changePriority(el, action, img){

  var url;
  var new_action;

  switch (action){
    case "add":
      new_action = "remove";
      break;
    case "remove":
      new_action = "add";
      break;
  }

  el.attr('data-priority-action', new_action);
  el.children().attr('src', img );
  
  switch ( el.attr('data-type') ) {
    case "Text":
      url = '/texts/';
      break;
    case "Image":
      url = '/images/';
      break;
    case "Audio":
      url = '/audios/';
      break;
    case "Video":
      url = '/videos/';
      break;
  }

  $.post( url + el.attr('data-id') + '/priority', 'priority-action=' + action);
}

$(function () {

  $('#flash-message').click( function(){
      $(this).hide('slow');
  });

  $('.priority').bind('click', function(e){
    e.preventDefault();
 
    switch ( $(this).attr('data-priority-action') ){
      case "add": 
        changePriority( $(this), 'add', '/assets/priority-ok.png');
        break;
      case "remove": 
        changePriority( $(this), 'remove', '/assets/priority-ko.png');
        break;
    }
  });

})


