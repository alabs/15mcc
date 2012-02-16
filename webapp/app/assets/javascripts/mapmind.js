/*
function mapmind_fullscreen(){

  $('#node-info').remove();
  $('#mindmap-demo-wrapper').css('overflow', 'inherit');
  $('._jsPlumb_connector, ._jsPlumb_endpoint, ._jsPlumb_overlay').hide();

  $('#header, #footer, .span3').hide('slow', function(){ 
    jsPlumb.repaintEverything();
    $('._jsPlumb_connector, ._jsPlumb_endpoint, ._jsPlumb_overlay').show(); 
  });
  $('#control')
    .addClass('well span3')
    .attr('id','control-fullscreen')
    .append('<div id="node-info" class="hide"></div>')
    .draggable()
    .resizable();

};

function mapmind_undo_fullscreen(){
  console.log('yeah');

  //$('#node-info').remove();
  $('#mindmap-demo-wrapper').css('overflow', 'auto');
  $('._jsPlumb_connector, ._jsPlumb_endpoint, ._jsPlumb_overlay').hide();

  $('#header, #footer, .span3').show('slow', function(){ 
    jsPlumb.repaintEverything();
    $('._jsPlumb_connector, ._jsPlumb_endpoint, ._jsPlumb_overlay').show(); 
  });
  $('#control')
    .removeClass('well span3')
    .addClass('span1')
    .attr('id','control')
    .draggable()
    .resizable();

};


var _getAllConnections = function(id) {
  // consigue todas las conexiones para un nodo dado, devuelve un array
  var cons = jsPlumb.getConnections({target:id }),
  cons2 = jsPlumb.getConnections({source:id });
  Array.prototype.push.apply(cons, cons2);
  return cons;
};

var _highlightTweet = function(id, hl) {
  // para todas las conexiones de un nodo dado agrega una clase hl (highlight)  

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
  // quita todos los hls
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
    zoom('up');
  })

  $('#zoom-out').click(function(e){
    e.preventDefault();
    zoom('down');
  })

  $('.node').click(function(e){
    e.preventDefault();
    var node_name = $(this).children('span').html();
    $('#node-info').html('<p>Aqui se mostrarian algunos de los contenidos relacionados con los tags relacionados con el nodo <b> ' + node_name + '</b></p><ul class="thumbnails"> <li class="span2"> <a href="#" class="thumbnail"> <img src="http://placehold.it/260x180" alt=""> </a> </li> <li class="span2"> <a href="#" class="thumbnail"> <img src="http://placehold.it/260x180" alt=""> </a> </li> </ul> <h3>Etiquetas<i class="icon-tags"></i></h3> <ul> <li> Tag1</li><li> Tag2</li></ul>');
    $('#node-info').show(500) 
  });
  
  $('.well').draggable();

  $('#mapmind-fullscreen').click(function(e){
    e.preventDefault();
    mapmind_fullscreen();
    $(this).attr('id', 'mapmind-undo-fullscreen');
    $(this).children('i').attr('class', 'icon-resize-small');
  });

  $('#mapmind-undo-fullscreen').click(function(e){
    e.preventDefault();
    mapmind_undo_fullscreen();
    $(this).attr('id', 'mapmind-fullscreen');
    $(this).children('i').attr('class', 'icon-resize-full');
  });


});

function zoom(dir){
  var $zoom = $('#zoom-level');
  var result = parseFloat($zoom.html());
  var zoom_level = 0;
  switch(dir){
    case 'up':
      zoom_level = result + 0.05;
      break;
    case 'down':
      zoom_level = result - 0.05;
      break;
  }
  zoom_level = zoom_level.toFixed(2);
  $('#mindmap-demo').css('zoom', zoom_level)
    .css('-moz-transform', 'scale(' + zoom_level + ')')
    .css('-moz-transform-origin', '0 0'); 
  $zoom.html(zoom_level);
  jsPlumb.repaintEverything();

}

/* 

$('#footer, #header, .span3, .span1').hide('slow'); 

$('#mindmap-demo-wrapper').css('overflow', 'inherit');

    $('body')
        .bind('mousewheel', function(event, delta) {
            var dir = delta > 0 ? 'up' : 'down',
                vel = Math.abs(delta);

  switch(dir){
    case 'up':
      zoom('up');
      break;
    case 'down':
      zoom('down');
      break;
  }

            return false;
        });

    jsPlumb.repaintEverything();



  var gesturesY = 0;
    var startPosition = 0;
    var isMouseDown = false;

    $(document.body).mousemove( function (e) {
        gesturesY = parseInt(e.pageY, 10);
        if (isMouseDown) {
            window.scrollBy(0, startPosition - gesturesY);
            return false;
        }
    });

    $(document.body).mousedown( function() {
        startPosition = gesturesY;
        isMouseDown = true;
    });

    $(document.body).mouseup( function() {
        isMouseDown = false;
        return false;
    });

*/
