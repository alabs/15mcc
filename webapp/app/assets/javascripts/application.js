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

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function displayLoggedinUserLinks() {
  var username = readCookie('username');
  console.log("15M.CC DEBUG: " + username);
  var loginLink = $("#login-link");
  var logoutLink = $("#logout-link");
  if (username == null) {
    loginLink.show();
    logoutLink.hide();
  } else {
    // user is logged in and we have his/her username
    loginLink.hide();
    // send HTML
    // if(userGreetings){ userGreetings.update("<span id='username'>username</span>"); }
    logoutLink.show();
  }
  return true;
}

$(function(){

  // mostrar enlaces dinámicos
  displayLoggedinUserLinks();

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
