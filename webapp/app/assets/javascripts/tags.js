$(function(){

  $('#text_tags, #video_tags, #image_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });

});
