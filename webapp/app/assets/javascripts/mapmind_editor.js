// rails y underscore.js usan los dos <%= bla => para las plantillas
// con esto lo cambiamos a {{= }}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

$(function () {

  $.simpleMM.loadMap("editable");

  $('#mapmind-editor #control').draggable();

  $("#node-create").click(function (e) {
    e.preventDefault();
    $.simpleMM.createNode();
  });

  $("#node-remove").click( function (e) {
    e.preventDefault();
    $.simpleMM.removeNode();
  });

  $("#node-update").click( function (e) {
    e.preventDefault();
    $.simpleMM.updateNode();
  });

  $("#node-tags").click( function (e) {
    e.preventDefault();
    $("#modal-node-tags").modal();
  });

  // autocomplete for tags
  $('#text_tags, #video_tags, #image_tags, #node_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });

});
