//= require external
//= require_tree .
//


$(function(){

  // cierra las alertas automaticamente a los 5 segundos
  setTimeout("$('#flash-message').slideUp('slow');",7000);

  $('#goback').click( function(){ 
    history.go(-1);
  });

});
