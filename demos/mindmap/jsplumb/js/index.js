
var _getAllConnections = function(id) {
  var cons = jsPlumb.getConnections({target:id }),
  cons2 = jsPlumb.getConnections({source:id });
  Array.prototype.push.apply(cons, cons2);
  return cons;
};

var _highlightTweet = function(id, hl) {

  var cons = _getAllConnections(id);
  for(var i = 0; i < cons.length; i++) {
    cons[i].setHover(hl);
    if (hl) {
      cons[i].source.addClass("hl");					
      cons[i].target.addClass("hl");
    } else {
      cons[i].source.removeClass("hl");					
      cons[i].target.removeClass("hl");
    }
  }
  
  if (hl) {
    $("#" + id).addClass("hl");					
    $("#" + id).addClass("hl");
  } else {
    $("#" + id).removeClass("hl");					
    $("#" + id).removeClass("hl");
  }

};

var unhl = function(id, ignoreOpacity) {
  _highlightTweet(id, false);
};

var hl = function(id) {
  window.clearTimeout(hlint);
  if (hlid) unhl(hlid,true);
  hlid = null;
  _highlightTweet(id, true);				
};

var hlint = null, hlid = null;
			

function connect_nodes(source, target, label){

  var endpoint_options = {
    anchor: "Continuous",
    connector: ["StateMachine", { curviness: 20 }],
    connectorStyle: { strokeStyle: "#737373", lineWidth: 2 },
    maxConnections: -1
  }          

  jsPlumb.addEndpoint(source, endpoint_options);
  jsPlumb.addEndpoint(target, endpoint_options);
  
  jsPlumb.connect({
  	source:source,
  	target:target
  }).setLabel(label);

}

function jsplumb_show_init() {

  jsPlumb.Defaults.Endpoint = ["Dot", { radius: 2 } ];
  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "#FF0000", lineWidth: 2 };
  jsPlumb.Defaults.Connector = ["StateMachine", { curviness: 20 }];
  jsPlumb.Defaults.Anchor = "Continuous";
  jsPlumb.Defaults.PaintStyle = { lineWidth : 2, strokeStyle : "#737373" },
  jsPlumb.Defaults.MaxConnections = -1;

  jsPlumb.Defaults.ConnectionOverlays = [
    ["Arrow", { location: 1, id: "arrow", length: 10, foldback: 0.8 }],
    ["Label", { id: "label" }]
  ];

  jsPlumb.bind("jsPlumbConnection", function (conn) {
    conn.connection.setPaintStyle({ strokeStyle: "#737373" });
  });

  jsPlumb.makeTarget($(".node"), {
    dropOptions: { hoverClass: "dragHover" },
    endpoint: { anchor: "Continuous" }
  });

}

$(function () {

  jsplumb_show_init();

  connect_nodes("node0001", "node0002", "en" );
  connect_nodes("node0002", "node0003", "con" );
  connect_nodes("node0001", "node0004", "durante" );
  connect_nodes("node0001", "node0005", "cuando" );

  $(".node").hover(function() {
    hl($(this).attr("id"));
  }, function() {
    hlid = $(this).attr("id");
    hlint = window.setTimeout(function() { unhl(hlid); }, 100);
  });

});
