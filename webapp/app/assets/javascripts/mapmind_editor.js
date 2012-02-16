// rails and underscore both use <%= bla => for templates
// so instead we change it to {{= }}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

var _getAllConnections = function(id) {
  // consigue todas las conexiones para un nodo dado, devuelve un array
  var cons = jsPlumb.getConnections({target:id }),
  cons2 = jsPlumb.getConnections({source:id });
  Array.prototype.push.apply(cons, cons2);
  return cons;
};

function connections_clean(){
  var node_id = $('.hl').attr('id');
  connections = _getAllConnections(node_id);

  for(var i=0; i<connections.length; i++) {
    var value = connections[i];
    jsPlumb.detach(value);
  }

}


function jsplumb_edit_init() {

  // opciones por defecto de jsplumb
  jsPlumb.Defaults.Endpoint = ["Dot", { radius: 2 } ];
  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "#FF0000", lineWidth: 2 };
  jsPlumb.Defaults.Connector = ["StateMachine", { curviness: 20 }];
  jsPlumb.Defaults.Anchor = "Continuous";
  jsPlumb.Defaults.PaintStyle = { lineWidth : 2, strokeStyle : "#737373" },
  jsPlumb.Defaults.MaxConnections = -1;
  jsPlumb.Defaults.ConnectionOverlays = [
    ["Arrow", { location: 1, id: "arrow", length: 14, foldback: 0.8 }],
    ["Label", { id: "label" }]
  ];

  // permitir que los nodos se arrastren
  jsPlumb.draggable($(".node"));

  // conectar los node-connect con los nodos
  $(".node-connect").each(function (i, e) {
    var p = $(e).parent();
    jsPlumb.makeSource($(e), { parent: p });
  });
  jsPlumb.makeTarget($(".node"), {
    dropOptions: { hoverClass: "dragHover" },
    endpoint: { anchor: "Continuous" }
  });

  // INTERACTIVIDAD CRUD
  jsPlumb.bind("click", function (c) {
    $(this).addClass('hl');
//    var confirm_remove = confirm("¿Quieres borrar esta conexión?");
//    if ( confirm_remove === true ){ 
//      jsPlumb.detach(c);
//    }
  });

  jsPlumb.bind("contextmenu", function (c) {
    var confirm_rename = confirm("¿Quieres nombrar esta conexión?");
    if ( confirm_rename === true ){ 
      var connection_name = prompt("¿Nombre de la conexion?", "");
      c.setLabel(connection_name);
    }
  });

  $('.node').on('click', function(e){
    e.preventDefault();
    $('.hl').removeClass('hl');
    $(this).addClass('hl');
    $('.node-selected').show('slow');
  });

  $('.hl').on('click', function(e){
    e.preventDefault();
    $(this).removeClass('hl');
    $('.node-selected').hide('slow');
  });

}

$(function () {

  jsplumb_edit_init();

  $('#footer').hide();
  $('#mapmind-editor #control').draggable();

  $("#node-create").click(function () {
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === "")){ 
      $('.hl').removeClass('hl');
      $('.node-selected').show('slow');
      var tmplMarkup = $('#tmpl-node').html();
      var compiledTmpl = _.template(tmplMarkup, { name : node_name });
      $('#mapmind-editor').append(compiledTmpl);
      jsplumb_edit_init();
    }
  });

  $("#node-remove").on('click', function () {
    var confirm_remove = confirm("¿Quieres borrar este nodo?");
    if ( confirm_remove === true ){ 
      $('.hl').fadeOut(300, function() { $(this).remove() });
      $('.node-selected').hide('slow');
      connections_clean();
    }
  });

  $("#node-update").click( function (e) {
    e.preventDefault();
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === "")){ 
      $('.hl').children('.node_name').replaceWith(node_name);
      $('.node-selected').hide('slow');
    }
  });


});

