function jsplumb_init() {

  jsPlumb.Defaults.Endpoint = ["Dot", { radius: 2 } ];
//  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "#FF0000", lineWidth: 2 };

  jsPlumb.Defaults.ConnectionOverlays = [
    ["Arrow", { location: 1, id: "arrow", length: 14, foldback: 0.8 }],
    ["Label", { id: "label" }]
  ];

  jsPlumb.bind("jsPlumbConnection", function (conn) {
    conn.connection.setPaintStyle({ strokeStyle: "#737373" });
  });

  $(".node").each(function (i, e) {
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

}

$(function () {

  jsplumb_init();

});
