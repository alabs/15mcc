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
  // borra todas las conexiones del nodo seleccionado (.hl)
  var node_id = $('.hl').attr('id');
  connections = _getAllConnections(node_id);

  for(var i=0; i<connections.length; i++) {
    var value = connections[i];
    jsPlumb.detach(value);
  }

}

function jsplumb_init(){
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
}

function jsplumb_edit_init() {

  jsplumb_init();

  // permitir que los nodos se arrastren
  jsPlumb.draggable($(".node")); //, {containment: "#mapmind-editor"});

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
    $(this).attr('stroke','#FFF');
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

function ajax_save_nodes(){
  $('.node-new').each(function(){
    var $node = $(this);
    var label = $node.children('span').text();
    var pos_left = $node.css('left').replace('px','');
    var pos_top = $node.css('top').replace('px','');
    var data = "node[label]=" + label + "&node[pos_top]=" +  pos_top + "&node[pos_left]=" + pos_left;
    $.post('/nodes.json', data, function(resp){
      // actualizamos los IDs de los nodos, los necesitamos para 
      // guardar las conexiones del JSPlumb
      $node.attr('id', resp._id);
    });
    // trata las conexiones
  });
}


function draw_node(properties){
  // dibuja un nodo recibiendo  un objeto
  // draw_node({id: node._id, label: node.label, pos_left: node.pos_left, pos_right: node.pos_top});
  // en caso de no recibir la propiedad ID, lo crea con otro template 
  
  if (properties.id == null) {
    var tmplMarkup = $('#tmpl-node-new').html();
    var data = { "label": properties.label, "pos_left": properties.pos_left + 'px', "pos_top": properties.pos_top + 'px'};
  } else {
    var tmplMarkup = $('#tmpl-node').html();
    var data = { "id": properties.id, "label": properties.label, "pos_left": properties.pos_left + 'px', "pos_top": properties.pos_top + 'px'};
  }
  var compiledTmpl = _.template(tmplMarkup, data);
  $('#mapmind-editor').append(compiledTmpl);
}

function ajax_load_nodes(){
  // consigue los nodos por JSON y los pinta

  $.getJSON("/nodes.json", function(data){ 
  
    for(var i=0; i<data.length; i++) {
      var node = data[i];
      draw_node({id: node._id, label: node.label, pos_left: node.pos_left, pos_right: node.pos_top});
    }

    $('.hl').removeClass('hl');

  });

}

function get_all_plumbs(){

  var all_conns = [];
  var connections = jsPlumb.getConnections();
  
  for (var i=0; i<connections.length; i++){
    var conn = connections[i];
    all_conns.push({'source': conn.sourceId, 'target': conn.targetId});
  }
  
  console.log(all_conns[1] === all_conns[2]);

}

$(function () {

  ajax_load_nodes();
  jsplumb_edit_init();

  $('#footer').hide();

  $('#mapmind-editor #control').draggable();

  $("#node-create").click(function () {
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === "")){ 
      $('.hl').removeClass('hl');
      $('.node-selected').show('slow');
      draw_node({label: node_name, pos_left: 0, pos_right: 0});
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
    var node_name_old = $('.hl').children('.node_name').text();
    var node_name = prompt("¿Nombre del nodo?", node_name_old);
    if ( !(node_name === "")){ 
      $('.hl').children('.node_name').replaceWith(node_name);
      $('.node-selected').hide('slow');
    }
  });

  $('#mapmind-update').click( function(e) {
    ajax_save_nodes();
    //window.location.href = "/bank";
  });

});

