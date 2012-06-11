function changePriority(el, action){
  // cambiar la prioridad.
  // recibe el elemento, la accion (add o remove) y la imagen nueva

  var url;
  var img; 
  var new_action;

  switch (action){
    case "add":
      new_action = "remove";
      el.html('<i class="icon-star"></i> Quitar prioridad')
      break;
    case "remove":
      new_action = "add";
      el.html('<i class="icon-star-empty"></i> Dar prioridad')
      break;
  }

  el.attr('data-priority-action', new_action);
  
  switch ( el.attr('data-type') ) {
    case "Text":
      url = '/profile/all/texts/';
      break;
    case "Image":
      url = '/profile/all/images/';
      break;
    case "Audio":
      url = '/profile/all/audios/';
      break;
    case "Video":
      url = '/profile/all/videos/';
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


