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

// Image Map Rollover with jQuery - svenerberg
// http://www.svennerberg.com/2008/09/imagemap-rollover/
// Runs when the DOM has been loaded
$(document).ready(function() {
        // Check if map exists
        if($('#homepage-map')) {
                // Loop through each AREA in the imagemap
                $('#homepage-map area').each(function() {
        
                        // Assigning an action to the mouseover event
                        $(this).mouseover(function(e) {
                                var country_id = $(this).attr('id').replace('area-', 'section-');
                                $('#'+country_id).show();
                        });
                        
                        // Assigning an action to the mouseout event
                        $(this).mouseout(function(e) {
                                var country_id = $(this).attr('id').replace('area-', 'section-');
                                $('#'+country_id).hide();
                        });
                        
                });
        }
});
