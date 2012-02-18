// rails y underscore.js usan los dos <%= bla => para las plantillas
// con esto lo cambiamos a {{= }}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};


////*** JSPLUMB - start ****////

var _getAllConnections = function(id) {
  // consigue todas las conexiones para un nodo dado, devuelve un array
  var cons = jsPlumb.getConnections({target:id }),
  cons2 = jsPlumb.getConnections({source:id });
  Array.prototype.push.apply(cons, cons2);
  return cons;
};


function connections_clean(){
  // borra todas las conexiones del nodo seleccionado (.hl)
  var node_id = $('.hl').attr('id');
  connections = _getAllConnections(node_id);

  for(var i=0; i<connections.length; i++) {
    var value = connections[i];
    jsPlumb.detach(value);
  }

}


function jsplumb_show_init(){
  // opciones especificas solo para la navegacion con jsplumb

  jsPlumb.makeTarget($(".node"), {
    dropOptions: { hoverClass: "dragHover" },
    endpoint: { anchor: "Continuous" }
  });

}

function jsplumb_edit_init() {
  // opciones especificas para la edicion con jsplumb

  // permitir que los nodos se arrastren
  jsPlumb.draggable($(".node"), {
    stop: function() {
      var data = node_to_data($(this));
      var node_id = $(this).attr('id');
      $.ajax({ type: "PUT", url: '/nodes/' + node_id, data: data, dataType: "json" });
  }}); //, {containment: "#mapmind-editor"});
  // TODO: Tiene que dejar en algun lado para que lo levante 
  // el ajax_update_nodes

  // conectar los node-connect con los nodos
  $(".node-connect").each(function (i, e) {
    var p = $(e).parent();
    jsPlumb.makeSource($(e), { parent: p });
  });
  jsPlumb.makeTarget($(".node"), {
    dropOptions: { hoverClass: "dragHover" },
    endpoint: { anchor: "Continuous" }
  });

  jsPlumb.bind("jsPlumbConnection", function (c) {
    var data = 'connection[source_id]=' + c.sourceId + '&connection[target_id]=' + c.targetId;
    $.post('/connections.json', data);
  });

  // INTERACTIVIDAD CRUD
  jsPlumb.bind("click", function (c) {
    // TODO: agregar una clase a la conexion selecionada
    //       mostrar las opciones en el controls
    var connection_name = prompt("¿Nombre de la conexion?", "");
    c.setLabel(connection_name);
  });

  jsPlumb.bind("contextmenu", function (c) {
    var confirm_remove = confirm("¿Quieres borrar esta conexión?");
    if ( confirm_remove === true ){ 
      jsPlumb.detach(c);
    }
  });

// FIXME: toggle o algo mas chulo q esto q tiene bugs
  $('.node').on('click', function(e){
    e.preventDefault();
    var title = $(this).children('span').html();
    $('#node-title').html(title);
    $('.hl').removeClass('hl');
    $(this).toggleClass('hl');
    $('.node-selected').show('slow');
  });

  $('.hl').on('click', function(e){
    e.preventDefault();
    $(this).removeClass('hl');
    $('.node-selected').hide('slow');
  });


}

function get_all_connections(){

  var all_conns = [];
  var connections = jsPlumb.getConnections();
  
  for (var i=0; i<connections.length; i++){
    if (i%2===0){
      var conn = connections[i];
      all_conns.push({'source': conn.sourceId, 'target': conn.targetId});
    }
  }
  
  return all_conns;
}

function draw_connection(properties){
  // pinta las uniones entre los nodos
  // recibe un objeto de este tipo:
  // {source: node._id, target:node._id, label:str}
  console.log(properties);

  var endpoint_options = {
    anchor: "Continuous",
    connector: ["StateMachine", { curviness: 20 }],
    connectorStyle: { strokeStyle: "#737373", lineWidth: 2 },
    maxConnections: -1
  }          

  jsPlumb.addEndpoint(properties.source, endpoint_options);
  jsPlumb.addEndpoint(properties.target, endpoint_options);
  
  if (properties.label == null){
    jsPlumb.connect({ source:properties.source, target:properties.target});
  } else {
    jsPlumb.connect({ source:properties.source, target:properties.target})
      .setLabel(properties.label);
  }

}

////*** JSPLUMB - end ****////

function node_to_data($node){
  var label = $node.children('span').text();
  var pos_left = $node.css('left').replace('px','');
  var pos_top = $node.css('top').replace('px','');
  var data = "node[label]=" + label + "&node[pos_top]=" +  pos_top + "&node[pos_left]=" + pos_left;
  return data;
}

function draw_node(properties){
  // dibuja un nodo recibiendo  un objeto
  // draw_node({id: node._id, label: node.label, pos_left: node.pos_left, post_top: node.pos_top});
  // en caso de no recibir la propiedad ID, lo crea con otro template 
  
  if (properties.id == null) {
    var tmplMarkup = $('#tmpl-node-new').html();
    var data = { "label": properties.label, "pos_left": properties.pos_left + 'px', "pos_top": properties.pos_top + 'px'};
  } else {
    var tmplMarkup = $('#tmpl-node').html();
    var data = { "id": properties.id, "label": properties.label, "pos_left": properties.pos_left + 'px', "pos_top": properties.pos_top + 'px'};
  }
  var compiledTmpl = _.template(tmplMarkup, data);
  $('#mapmind-editor, #mapmind').append(compiledTmpl);
}

function ajax_load_mapmind(mode){
  // consigue los nodos por JSON y los pinta

  $.getJSON("/nodes.json", function(d){ 
    for(var i=0; i<d.length; i++) draw_node({id: d[i]._id, label: d[i].label, pos_left: d[i].pos_left, pos_top: d[i].pos_top});
    switch(mode){
      case "editable":
        jsplumb_edit_init();
        $('#footer, #header').hide();
        break;
      case "navegable":
        jsplumb_show_init();
        break;
      default:
        jsplumb_show_init();
    }
  });

  $.getJSON("/connections.json", function(d){ 
    for(var i=0; i<d.length; i++){
      draw_connection({ source: d[i].source_id, target: d[i].target_id });
    }
  });

}

$(function () {

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

  ajax_load_mapmind("editable");
  //ajax_load_mapmind("navegable");

  $('#mapmind-editor #control').draggable();

  $("#node-create").click(function () {
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === "")){ 
      $('.hl').removeClass('hl');
      $('.node-selected').show('slow');
      var data = "node[label]=" + node_name;
      $.post('/nodes.json', data, function(resp){
        // actualizamos los IDs de los nodos, los necesitamos para guardar las conexiones del JSPlumb
        draw_node({id: resp._id, label: node_name, pos_left: 0, pos_top: 0});
        jsplumb_edit_init();
      });
    }
  });

  $("#node-remove").on('click', function () {
    var confirm_remove = confirm("¿Quieres borrar este nodo?");
    if ( confirm_remove === true ){ 
      $('.hl').fadeOut(300, function() { $(this).remove() });
      $('.node-selected').hide('slow');
      connections_clean();
      var node_id = $('.hl').attr('id');
      $.ajax({ type: "DELETE", url: '/nodes/' + node_id });
      // TODO: lo tiene que dejar en algun lado para que lo levante 
      // el ajax_update_nodes
    }
  });

  $("#node-update").click( function (e) {
    e.preventDefault();
    var node_name_old = $('.hl').children('.node_name').text();
    var node_name = prompt("¿Nombre del nodo?", node_name_old);
    if ( !(node_name === "")){ 
      $('.hl').children('.node_name').html(node_name);
      $('.node-selected').hide('slow');
      var data = node_to_data($('.hl'));
      var node_id = $('.hl').attr('id');
      $.ajax({ type: "PUT", url: '/nodes/' + node_id, data: data, dataType: "json" });
      // TODO: Tiene que dejar en algun lado para que lo levante 
      // el ajax_update_nodes
    }
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

