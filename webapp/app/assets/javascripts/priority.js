function changePriority(el, action){
  // cambiar la prioridad.
  // recibe el elemento, la accion (add o remove) y la imagen nueva

  var url;
  var img; 
  var new_action;

  switch (action){
    case "add":
      new_action = "remove";
      img = '/assets/priority-ko.png';
      break;
    case "remove":
      new_action = "add";
      img = '/assets/priority-ok.png';
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


  $('.priority').bind('click', function(e){
    e.preventDefault();
 
    switch ( $(this).attr('data-priority-action') ){
      case "add": 
        changePriority( $(this), 'add');
        break;
      case "remove": 
        changePriority( $(this), 'remove');
        break;
    }
  });

})


