function jsplumb_init() {

  jsPlumb.Defaults.Endpoint = ["Dot", { radius: 2 } ];
  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "#FF0000", lineWidth: 2 };

  jsPlumb.Defaults.ConnectionOverlays = [
    ["Arrow", { location: 1, id: "arrow", length: 14, foldback: 0.8 }],
    ["Label", { id: "label" }]
  ];

  jsPlumb.draggable($(".node"));

  jsPlumb.bind("jsPlumbConnection", function (conn) {
    conn.connection.setPaintStyle({ strokeStyle: "#737373" });
  });

  $(".ep").each(function (i, e) {
    var p = $(e).parent();
    jsPlumb.makeSource($(e), {
      parent: p,
      endpoint: {
        anchor: "Continuous",
        connector: ["StateMachine", { curviness: 20 }],
        connectorStyle: { strokeStyle: "#737373", lineWidth: 2 },
        maxConnections: -1
      }
    });
  });

  jsPlumb.makeTarget($(".node"), {
    dropOptions: { hoverClass: "dragHover" },
    endpoint: { anchor: "Continuous" }
  });

  jsPlumb.bind("click", function (c) {
    var confirm_remove = confirm("¿Quieres borrar esta conexión?");
    if ( confirm_remove === true ){ 
      jsPlumb.detach(c);
    } else {
      var confirm_rename = confirm("¿Quieres nombrar esta conexión?");
      if ( confirm_rename === true ){ 
        var connection_name = prompt("¿Nombre de la conexion?", "");
        c.setLabel(connection_name);
      }
    }
  });

  $(".remove_node").bind('click', function () {
    var confirm_remove = confirm("¿Quieres borrar este nodo?");
    if ( confirm_remove === true ){ 
      $(this).parent().fadeOut(300, function() { $(this).remove() });
    }
  });

  $(".update_node").bind('click', function () {
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === null)){ 
      $(this).parent().children('.node_name').replaceWith(node_name);
    }
  });
}

$(function () {

  jsplumb_init();
  $('#modal_node_name').hide();

  $("#create_node").click(function () {
    //$('#modal_node_name').modal('show');
    var node_name = prompt("¿Nombre del nodo?", "");
    if ( !(node_name === null)){ 
      $("#demo").append('<div class="node"><span class="node_name">' + node_name + '</span><br /><i class="icon-pencil update_node"></i><i class="icon-repeat ep"></i><i class="icon-remove remove_node"></i>');
      jsplumb_init();
    }
  });


});
