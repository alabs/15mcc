$(function(){

  // profile-main-links - tabs
  $('#show-user-map').click( function(e){
    e.preventDefault();
    $('#user-timeline').hide();
    $('#user-tags').hide();
    $('#user-map').show();
    $('#profile-main-links a').removeClass('strong');
    Gmaps.loadMaps()
    $(this).addClass('strong');
  });

  $('#show-user-timeline').click( function(e){
    e.preventDefault();
    $('#user-timeline').show();
    $('#user-tags').hide();
    $('#user-map').hide();
    $('#profile-main-links a').removeClass('strong');
    $(this).addClass('strong');
  });

  $('#show-user-tags').click( function(e){
    e.preventDefault();
    $('#user-timeline').hide();
    $('#user-tags').show();
    $('#user-map').hide();
    $('#profile-main-links a').removeClass('strong');
    $(this).addClass('strong');
  });
});
