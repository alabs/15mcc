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
						  { "id": "malestares", "name": "Malestares en la vida personal", "children":[
								{ "id": "nohacer", "name": "lo que no quiero hacer" },
								{ "id": "noquiero", "name": "lo que no quiero seguir" },
								{ "id": "curro", "name": "lo que no me gusta" },
								{ "id": "infeliz", "name": "infeliz" }
							]},
						  { "id": "enlaplaza", "name": "En la plaza", "children": [
								{ "id": "dry", "name": "Democracia real ya", "children": [
									{ "id": "escucha", "name": "escucha y respeto", "adjacencies": [
										{"nodeTo": "enlaplaza"}
										] 
									},
									{ "id": "implicarse", "name": "implicarse en los asuntos comunes" },
									{ "id": "palabra", "name": "uso de la palabra y no de la violencia" }
							  ]}
							], "adjacencies": [
								{"nodeTo": "palabra"},
								{"nodeTo": "escucha"}
							
							]},
						  { "id": "juntas", "name": "Estar juntas y convivir" },
						  { "id": "malestar", "name": "Malestar" }
						]
        },{
					"id": "inteligencia",
					"name": "inteligencia colectiva", "children":[
							{ "id": "heter", "name": "heterogenea e incluyente" },
							{ "id": "irrepresentable", "name": "irrepresentable", "children":[
								  {"id": "siglas", "name": "siglas y banderas porque dividen"}
								]
							},
							{ "id": "buen", "name": "buen ambiente" } 
						]
				},	{
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
        } ],
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
          color: "#000"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
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
              style.fontWeight = "bold";
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
          
          //Build the right column relations list.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
							html += "<li>" + child.name + "</li>";
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
