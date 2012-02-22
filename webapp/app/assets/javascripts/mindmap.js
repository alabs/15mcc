// rails y underscore.js usan los dos <%= bla => para las plantillas
// con esto lo cambiamos a {{= }}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

$(function () {


  // estamos en modo editable
  if ($('#mindmap-editor').length != 0){

    // mostramos el mapa con sus conexiones
    $.simpleMM.loadMap("editable");

    // permitimos que la ventana de control pueda moverse
    $('#mapmind-editor #control').draggable();

    // CRUD (sin la R) y tags
    $("#node-create").click(function (e) { e.preventDefault(); $.simpleMM.createNode(); });
    $("#node-remove").click( function (e) { e.preventDefault(); $.simpleMM.removeNode(); });
    $("#node-update").click( function (e) { e.preventDefault(); $.simpleMM.updateNode(); });

    // tags
    $("#node-tags").click( function (e) {
      e.preventDefault();
      $.get('/nodes/' + $('.hl').attr('id') + '.json', function(resp){
        var tags = resp.tags_array ; 
        $('.tagit-choice').remove();
        for (var i=0; i<tags.length; i++){
          var compiledTmpl = _.template($('#tmpl-tags').html(), { "label": tags[i] });
          $('.tagit').prepend(compiledTmpl);
        }
        $("#modal-node-tags").modal();
      })
    });

    $('#node-tags-save').click( function(e){
      tags = [];
      $('.tagit-label').each(function(){ tags.push($(this).html()); })
      $.ajax({ type: "PUT", url: '/nodes/' + $('.hl').attr('id'), data: "node[tags]=" + tags, dataType: "json" });
    });

    $('#text_tags, #video_tags, #image_tags, #node_tags').tagit({ 
      tagSource: "/tags/search.json",
      removeConfirmation: true,
      allowSpaces: true
    });

  }

  // estamos en modo navegable
  if ($('#mindmap').length != 0){ $.simpleMM.loadMap("navegable"); }

});
