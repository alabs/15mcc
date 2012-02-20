/*



$(function () {

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
