//= require external
//= require audios
//= require forms
//= require maps
//= require priority
//= require search
//= require time
//= require user
//= require welcome
//= require admin/users
// require_tree .
// mindmap 
// jquery.simplemm.js
//
//


$(function(){

  // cierra las alertas automaticamente a los 5 segundos
  setTimeout("$('#flash-message').slideUp('slow');",7000);

  $('#goback').click( function(){ 
    history.go(-1);
    return false;
  });

});
