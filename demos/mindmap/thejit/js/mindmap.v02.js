var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
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
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
        "id": "347_0",
        "name": "AcampadaSol",
        "children": [{
            "id": "126510_1",
            "name": "Manifestación 15M",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            }
        }, {
            "id": "173871_4",
            "name": "personas",
            "children": [
						  { "id": "malestares", "name": "Malestares en la vida personal" },
						  { "id": "enlaplaza", "name": "En la plaza" },
						  { "id": "juntas", "name": "Estar juntas y convivir" },
						  { "id": "malestar", "name": "Malestar" }
						]
        }, {
            "id": "235952_5",
            "name": "James Woolley",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": []
        }, {
            "id": "235951_6",
            "name": "Jeff Ward",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "2382_7",
                "name": "Ministry",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "2415_8",
                "name": "Revolting Cocks",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "3963_9",
                "name": "Pigface",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "7848_10",
                "name": "Lard",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "235950_11",
            "name": "Richard Patrick",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "1007_12",
                "name": "Filter",
                "data": {
                    "band": "Richard Patrick",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "327924_13",
                "name": "Army of Anyone",
                "data": {
                    "band": "Richard Patrick",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "2396_14",
            "name": "Trent Reznor",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "3963_15",
                "name": "Pigface",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "32247_16",
                "name": "1000 Homo DJs",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "83761_17",
                "name": "Option 30",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "133257_18",
                "name": "Exotic Birds",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "36352_19",
            "name": "Cosas que han pasado",
            "children": [
						  { "id": "espana", "name": "España", 
								"children": [
									{ "id": "huelga", "name": "Huelga general (Septiembre)" },
									{ "id": "vivienda", "name": "V de Vivienda" },
									{ "id": "juventud", "name": "Juventud sin futuro (Abril)" },
									{ "id": "guerra", "name": "No a la guerra" },
									{ "id": "sinde", "name": "la Ley Sinde" },
									{ "id": "okupas", "name": "Centros sociales okupados" },
									{ "id": "acampadas07", "name": "Acampadas por el 0,7" },
									{ "id": "13m", "name": "13-M" }
								]
							},
						  { "id": "tunez", "name": "Túnez" },
						  { "id": "grecia", "name": "Grecia" },
						  { "id": "egipto", "name": "Egipto" },
						  { "id": "portugal", "name": "Portugal" },
						  { "id": "luchas", "name": "Luchas indígenas" },
						  { "id": "irlanda", "name": "Irlanda" },
						  { "id": "bolonia", "name": "Plan Bolonia" },
						  { "id": "revoluciones", "name": "Revoluciones pacíficas" }, //mejorar
						  { "id": "tiananmen", "name": "Tiananmen" },
						  { "id": "manifestos", "name": "Manifiestos" }, // mejorar
						  { "id": "mayo68", "name": "Mayo del 68" },
						  { "id": "mujeres", "name": "Luchas de las mujeres" },
						  { "id": "wikileaks", "name": "WikiLeaks" },
						  { "id": "periodismo", "name": "Nuevo periodismo" }, // mejorar
						  { "id": "anonymous", "name": "Anonymous" },
						  { "id": "islandia", "name": "Islandia" },
						  { "id": "zapatistas", "name": "Movimiento Zapatista" },
						  { "id": "obrero", "name": "Movimiento Obrero" }
            ]
        }, {
            "id": "236021_26",
            "name": "Aaron North",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": []
        }, {
            "id": "236024_27",
            "name": "Jeordie White",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "909_28",
                "name": "A Perfect Circle",
                "data": {
                    "band": "Jeordie White",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "237377_29",
                "name": "Twiggy Ramirez",
                "data": {
                    "band": "Jeordie White",
                    "relation": "is person"
                },
                "children": []
            }]
        }, {
            "id": "235953_30",
            "name": "Robin Finck",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "1440_31",
                "name": "Guns N' Roses",
                "data": {
                    "band": "Robin Finck",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "235955_32",
            "name": "Danny Lohner",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "909_33",
                "name": "A Perfect Circle",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1695_34",
                "name": "Killing Joke",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1938_35",
                "name": "Methods of Mayhem",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "5138_36",
                "name": "Skrew",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "53549_37",
                "name": "Angkor Wat",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "113510_38",
                "name": "Puscifer",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "113512_39",
                "name": "Renhold\u00ebr",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "is person"
                },
                "children": []
            }]
        }],
        "data": []
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id);
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#ddd";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },
      
      onAfterCompute: function(){
          Log.write("done");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onAfterCompute();
}
