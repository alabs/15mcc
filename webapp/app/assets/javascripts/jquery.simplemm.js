/*

jquery.simplemm.js 
=================

Simple MindMap for jQuery using jsPlumb and underscore.js

*/
(function ($) {

  // opciones por defecto de jsplumb
  jsPlumb.Defaults.Endpoint = ["Dot", { radius: -1 } ];
  jsPlumb.Defaults.HoverPaintStyle = { strokeStyle: "#FF0000", lineWidth: 2 };
  jsPlumb.Defaults.Connector = ["StateMachine", { curviness: 20 }];
  jsPlumb.Defaults.Anchor = "Continuous";
  jsPlumb.Defaults.PaintStyle = { lineWidth : 2, strokeStyle : "#737373" },
  jsPlumb.Defaults.MaxConnections = -1;
  jsPlumb.Defaults.ConnectionOverlays = [
    ["Arrow", { location: 1, id: "arrow", length: 14, foldback: 0.8 }],
    ["Label", { id: "label" }]
  ];

  $.simpleMM = {

    connectionsClean: function(){
      // borra todas las conexiones del nodo seleccionado (.hl)
      var node_id = $('.hl').attr('id');
      connections = this._getAllConnections({node:node_id});

      for(var i=0; i<connections.length; i++) {
        var value = connections[i];
        jsPlumb.detach(value);
      }
    },

    _getAllConnections: function(options) {
      if (options.node === null) {
        // si no hay nodo dicho, conseguimos todas las conexiones
        var all_conns = []; var connections = jsPlumb.getConnections();
        for (var i=0; i<connections.length; i++){
          // las conexiones aparecen duplicadas, por el endpoint + overlay
          // vamos a tomar 1 de cada 2 y a darlo por hecho
          if (i%2===0){ all_conns.push({'source': connections[i].sourceId, 'target': connections[i].targetId}); }
        }
        return all_conns;
      } else {
        // consigue todas las conexiones para un nodo dado
        var targets = jsPlumb.getConnections({target:options.node});
        var sources = jsPlumb.getConnections({source:options.node});
        var cons = targets.concat(sources);
        return cons
      }
    },

    initShow: function(){
      // opciones especificas solo para la navegacion con jsplumb
    
      $('#mindmap-wrapper').scroll( function(){ jsPlumb.repaintEverything(); });
    
      $('.node').click( function(e){
        e.preventDefault();
        $(this).zoomTo({ targetsize: 0.2 });
      });
    
      $("body").click(function(evt) {
         $(this).zoomTo({targetsize:1.0});
         evt.stopPropagation();
      });

      $(".node").hover(function() {
        $.simpleMM.hl($(this).attr("id"));
      }, function() {
        hlid = $(this).attr("id");
        hlint = window.setTimeout(function() { $.simpleMM.unhl(hlid); }, 100);
      });
    
    },

    initEdit: function() {
      // opciones especificas para la edicion con jsplumb
    
      $("#footer, #header").hide();

      // permitir que los nodos se arrastren
      jsPlumb.draggable($(".node"), {
        stop: function() {
          // al mover el nodo lo actualizamos tambien en el servidor, ajax al rescate :) 
          var data = $.simpleMM.nodeToData($(this));
          var node_id = $(this).attr('id');
          $.ajax({ type: "PUT", url: '/nodes/' + node_id, data: data, dataType: "json" });
      }}); //, {containment: "#mapmind-editor"});
    
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
        // al crear la conexion la creamos tambien en el servidor, ajax al rescate :) 
        var data = 'connection[source_id]=' + c.sourceId + '&connection[target_id]=' + c.targetId;
        $.post('/connections.json', data);
      });
    
      // INTERACTIVIDAD CRUD
      jsPlumb.bind("click", function (c, e) {
        e.preventDefault();
        $.simpleMM.updateConnection(c);
      });
    
      jsPlumb.bind("contextmenu", function (c, e) {
        e.preventDefault();
        $.simpleMM.removeConnection(c);
      });
    
    
    // FIXME: toggle o algo mas chulo q esto q tiene bugs
      $('.node').click( function(e){
        e.preventDefault();
        $.simpleMM.controlShow($(this));
      });
    
      $('.hl').bind('click', function(e){
        e.preventDefault();
        $(this).removeClass('hl');
        $('.node-selected').hide('slow');
      });
    
    },

    controlShow: function($node){
      var title = $node.children('span').html();
      $('#node-title').html(title);
      $('.hl').removeClass('hl');
      $node.addClass('hl');
      $('.node-selected').show('slow');
    },

    nodeToData: function($node){
      var label = $node.children('span').text();
      var pos_left = $node.css('left').replace('px','');
      var pos_top = $node.css('top').replace('px','');
      var data = "node[label]=" + label + "&node[pos_top]=" +  pos_top + "&node[pos_left]=" + pos_left;
      return data;
    },

    drawConnection: function (params){
      // pinta las uniones entre los nodos
      // recibe un objeto de este tipo:
      // {source: node._id, target:node._id, label:str}
    
      // comprobamos que se encuentren los IDs de los nodos
      if ( $('#' + params.source).length != 0 && $('#' + params.target).length != 0 ) {
        jsPlumb.addEndpoint(params.source);
        jsPlumb.addEndpoint(params.target);
        var connect = jsPlumb.connect({ source:params.source, target:params.target, fireEvent: params.fireEvent});
        if (params.label != null){ connect.setLabel(params.label); }
      }
    
    },

    drawNode: function(properties){
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
      $('#mindmap-editor, #mindmap').append(compiledTmpl);
    },

    loadMap: function(mode){
      // consigue los nodos por JSON y los pinta
    
      $.getJSON("/nodes.json", function(d){ 
        for(var i=0; i<d.length; i++) $.simpleMM.drawNode({id: d[i]._id, label: d[i].label, pos_left: d[i].pos_left, pos_top: d[i].pos_top});
        switch(mode){
          case "editable":
            $.simpleMM.initEdit();
            break;
          case "navegable":
            $.simpleMM.initShow();
            break;
          default:
            $.simpleMM.initShow();
        }
      });
    
      $.getJSON("/connections.json", function(d){ 
        for(var i=0; i<d.length; i++){
          var data = { source: d[i].source_id, target: d[i].target_id, fireEvent: false }
          // label puede estar o no 
          if (d[i].label != null) { data.label = d[i].label }
          $.simpleMM.drawConnection(data);
        }
      });
    },
    
    createNode: function(){
      var node_name = prompt("¿Nombre del nodo?", "");
      if ( node_name !== null){ 
        var data = "node[label]=" + node_name;
        $.post('/nodes.json', data, function(resp){
          // actualizamos los IDs de los nodos, los necesitamos para guardar las conexiones del JSPlumb
          $.simpleMM.drawNode({id: resp._id, label: node_name, pos_left: 0, pos_top: 0});
          $.simpleMM.initEdit();
          $.simpleMM.controlShow($('#' + resp._id));
        });
      }
    },

    removeNode: function(){
      var confirm_remove = confirm("¿Quieres borrar este nodo?");
      if ( confirm_remove === true ){ 
        $('.hl').fadeOut(300, function() { $(this).remove() });
        $('.node-selected').hide('slow');
        $.simpleMM.connectionsClean();
        var node_id = $('.hl').attr('id');
        $.ajax({ type: "DELETE", url: '/nodes/' + node_id + '.json', dataType: "json" });
      }
    },

    updateNode: function(){
      var node_name_old = $('.hl').children('.node_name').text();
      var node_name = prompt("¿Nombre del nodo?", node_name_old);
      if ( node_name !== null){ 
        $('.hl').children('.node_name').html(node_name);
        $('.node-selected').hide('slow');
        var data = $.simpleMM.nodeToData($('.hl'));
        var node_id = $('.hl').attr('id');
        $.ajax({ type: "PUT", url: '/nodes/' + node_id, data: data, dataType: "json" });
      }
    },

    removeConnection: function(c){
      var confirm_remove = confirm("¿Quieres borrar esta conexión?");
      if ( confirm_remove === true ){ 
        var data = "source=" + c.sourceId + "&target=" + c.targetId;
        // como no tenemos un ID primero tenemos que buscar la conexion en la BBDD, conseguirlo y por ultimo borrarla
        $.get("/connections/search.json", data, function(resp){
          $.ajax({ type: "DELETE", url: '/connections/' + resp[0]._id + '.json', dataType: "json" });
          jsPlumb.detach(c);
        });
      }
    },

    updateConnection: function(c){
      var connection_name_old = c.getLabel();
      var connection_name = prompt("¿Nombre de la conexion?", connection_name_old);
      if ( connection_name !== null){ 
        var data = "source=" + c.sourceId + "&target=" + c.targetId;
        // como no tenemos un ID primero tenemos que buscar la conexion en la BBDD, conseguirlo y por ultimo borrarla
        $.get("/connections/search.json", data, function(resp){
          $.ajax({ type: "PUT", url: '/connections/' + resp[0]._id, data: "connection[label]=" + connection_name, dataType: "html" });
          c.setLabel(connection_name);
        })
      }
    },

    fullscreen: function(){

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
    },

    fullscreenUndo: function(){

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

    },

    _highlightTweet: function(id, hl) {
      // para todas las conexiones de un nodo dado agrega una clase hl (highlight)  
      // sacado de tweetplumb

      var cons = this._getAllConnections({ node: id});
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

    },

    unhl: function(id, ignoreOpacity) {
      // quita todos los hls
      this._highlightTweet(id, false);
      $('.hlhigh').removeClass('hlhigh');
    },
    
    hl: function(id) {
     // window.clearTimeout(hlint);
     // if (hlid) unhl(hlid,true);
     // hlid = null;
      this._highlightTweet(id, true);				
    }
    
  };

})(jQuery);
