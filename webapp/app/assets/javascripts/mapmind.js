var _getAllConnections = function(id) {
  var cons = jsPlumb.getConnections({target:id }),
  cons2 = jsPlumb.getConnections({source:id });
  Array.prototype.push.apply(cons, cons2);
  return cons;
};

var _highlightTweet = function(id, hl) {

  var cons = _getAllConnections(id);
  $('#' + id).addClass('hlhigh');
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
  $('.hlhigh').removeClass('hlhigh');
};

var hl = function(id) {
 // window.clearTimeout(hlint);
 // if (hlid) unhl(hlid,true);
 // hlid = null;
  _highlightTweet(id, true);				
};

//var hlint = null, hlid = null;
			

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
  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "green", lineWidth: 2 };
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

//  connect_nodes("node0001", "node0002", "en" );
//  connect_nodes("node0002", "node0003", "con" );
//  connect_nodes("node0001", "node0004", "durante" );
//  connect_nodes("node0001", "node0005", "cuando" );
connect_nodes('node0001', 'node0002', 'formada por');
connect_nodes('node0002', 'node0003', 'que se autoconvocan');
connect_nodes('node0003', 'node0004', 'para hacer');
connect_nodes('node0001', 'node0007', 'se difunde y se organiza');
connect_nodes('node0007', 'node0008', 'en');
connect_nodes('node0007', 'node0009', 'en');
connect_nodes('node0007', 'node0010', 'en');
connect_nodes('node0007', 'node0011', 'en'); 
connect_nodes('node0002', 'node0006', 'unidas por un'); 
connect_nodes('node0006', 'node0012', 'contra'); 
connect_nodes('node0006', 'node0013', 'contra'); 

  $(".node").hover(function() {
    hl($(this).attr("id"));
  }, function() {
    hlid = $(this).attr("id");
    hlint = window.setTimeout(function() { unhl(hlid); }, 100);
  });

  $('#zoom-in').click(function(e){
    e.preventDefault();
    //#demo { zoom: 1; -moz-transform: scale(1); -moz-transform-origin: 0 0}
    var $zoom = $('#zoom-level');
    var zoom_level = parseFloat($zoom.html()) + 0.1;
    zoom_level = zoom_level.toFixed(1);
    $('#mindmap-demo').css('zoom', zoom_level)
      .css('-moz-transform', 'scale(' + zoom_level + ')')
      .css('-moz-transform-origin', '0 0'); 
    $zoom.html(zoom_level);
    jsPlumb.repaintEverything();
  })

  $('#zoom-out').click(function(e){
    e.preventDefault();
    //#demo { zoom: 1; -moz-transform: scale(1); -moz-transform-origin: 0 0}
    var $zoom = $('#zoom-level');
    var zoom_level = parseFloat($zoom.html()) - 0.1;
    zoom_level = zoom_level.toFixed(1);
    $('#mindmap-demo').css('zoom', zoom_level)
      .css('-moz-transform', 'scale(' + zoom_level + ')')
      .css('-moz-transform-origin', '0 0'); 
    $zoom.html(zoom_level);
    jsPlumb.repaintEverything();
  })

  $('.node').click(function(e){
    e.preventDefault();
    var node_name = $(this).children('span').html();
    $('#node-info').html('<p>Aqui se mostrarian algunos de los contenidos relacionados con los tags relacionados con el nodo <b> ' + node_name + '</b></p><ul class="thumbnails"> <li class="span2"> <a href="#" class="thumbnail"> <img src="http://placehold.it/260x180" alt=""> </a> </li> <li class="span2"> <a href="#" class="thumbnail"> <img src="http://placehold.it/260x180" alt=""> </a> </li> </ul> <h3>Etiquetas<i class="icon-tags"></i></h3> <ul> <li> Tag1</li><li> Tag2</li></ul>');
    $('#node-info').show(500) 
  });
  
  $('.well').draggable();

});
