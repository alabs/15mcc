$(function(){

  // date and time picker for Fecha
  $('#text_happened_at').datetimepicker({
    dateFormat: 'yy-mm-dd',
    timeFormat: 'hh:mm:ss'
  });

  // autocomplete for tags
  $('#text_tags, #video_tags, #image_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });

});
