var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) {
      this.elem = document.getElementById('log');
		}
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    //By defining properties with the dollar sign ($)
    //in nodes and edges we can override the global configuration
    //properties for nodes and edges.
    //In this case we use "$type" and "$dim" properties to override
    //the type of the node to be plotted and its dimension.
    var json = [{
        "id": "mani15m",
        "name": "manifestación 15m"
    }, {
        "id": "acampadasol",
        "name": "acampadasol",
        "adjacencies": [
					{ "nodeTo": "personas" }, 
          { "nodeTo": "mani15m" }
				]
    },{
			  "id": "cosas",
				"name": "cosas que han pasado antes",
				"adjacencies": [
				{ "nodeTo": "acampadasol"},
				{ "nodeTo": "grecia"},
				{ "nodeTo": "tunez"},
				{ "nodeTo": "zapatistas"},
				{ "nodeTo": "guerra"},
				{ "nodeTo": "obrero"},
				{ "nodeTo": "egipto"},
				{ "nodeTo": "islandia"},
				{ "nodeTo": "insumicion"},
				{ "nodeTo": "vivienda"},
				{ "nodeTo": "wikileaks"},
				{ "nodeTo": "anonymous"},
				{ "nodeTo": "argentina"}
				]
		},
				{ "id": "argentina", "name": "Argentina: 19 y 20 Diciembre 2001 - Corralito" },
				{ "id": "grecia", "name": "Grecia" },
				{ "id": "guerra", "name": "No a la Guerra" },
				{ "id": "zapatistas", "name": "Movimiento Zapatista" },
				{ "id": "obrero", "name": "Movimiento Obrero" },
				{ "id": "tunez", "name": "Túnez" },
				{ "id": "insumicion", "name": "Insumición" },
				{ "id": "islandia", "name": "Islandia" },
				{ "id": "wikileaks", "name": "WikiLeaks" },
				{ "id": "vivienda", "name": "V de Vivienda" },
				{ "id": "anonymous", "name": "Anonymous" },
				{ "id": "egipto", "name": "Egipto" },
				{
        "id": "personas",
        "name": "personas",
        "adjacencies": [{
            "nodeTo": "malestar",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "enlaplaza",
            "data": {
                "weight": 1
            }
        }]
    }, {
        "id": "malestar",
        "name": "malestar",
        "data": {
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "personas",
            "data": {
                "weight": 1
            }
        }]
    }, {
        "id": "enlaplaza",
        "name": "en la plaza",
        "data": {
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "personas",
            "data": {
                "weight": 1
            }
        }]
    }];
    //end
    //init Hypertree
    var ht = new $jit.Hypertree({
        //id of the visualization container
        injectInto: 'infovis',
        //By setting overridable=true,
        //Node and Edge global properties can be
        //overriden for each node/edge.
        Node: {
            overridable: true,
            'transform': false,
            color: "#fff"
        },
        
        Edge: {
            overridable: true,
            color: "#088"
        },
        //calculate nodes offset
        offset: 0.2,
        //Change the animation transition type
        transition: $jit.Trans.Back.easeOut,
        //animation duration (in milliseconds)
        duration:1000,
        
        //This method is called right before plotting an
        //edge. This method is useful for adding individual
        //styles to edges.
       // onBeforePlotLine: function(adj){
       //     //Set random lineWidth for edges.
       //     if (!adj.data.$lineWidth) 
       //         adj.data.$lineWidth = Math.random() * 7 + 1;
       // },
        
        //Attach event handlers on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.style.cursor = "pointer";
            domElement.onclick = function () {
                ht.onClick(node.id, { hideLabels: false });
            };
        },
        //This method is called when moving/placing a label.
        //You can add some positioning offsets to the labels here.
        onPlaceLabel: function(domElement, node){
            var width = domElement.offsetWidth;
            var intX = parseInt(domElement.style.left);
            intX -= width / 2;
            domElement.style.left = intX + 'px';
        },
        
        onAfterCompute: function(){

            //Make the relations list shown in the right column.
            var node = ht.graph.getClosestNodeToOrigin("current");
            var html = "<h4>" + node.name + "</h4><b>Conecciones:</b>";
            html += "<ul>";
            node.eachAdjacency(function(adj){
                var child = adj.nodeTo;
                html += "<li>" + child.name + "</li>";
            });
            html += "</ul>";
            $jit.id('inner-details').innerHTML = html;
        }
    });
    //load JSON graph.
    ht.loadJSON(json, 2);
    //compute positions and plot
    ht.refresh();
    //end
    ht.controller.onBeforeCompute(ht.graph.getNode(ht.root));
    ht.controller.onAfterCompute();
}
