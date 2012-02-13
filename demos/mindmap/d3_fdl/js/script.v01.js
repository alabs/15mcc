
var w = 960,
     h = 500,
     fill = d3.scale.category20();
 
 var vis = d3.select("#chart").append("svg")
     .attr("width", w)
     .attr("height", h)
     .append('g');

 

	d3.json("./js/conceptual15M.v01.json", function(json) {
	
	
		var force = d3.layout.force()
			.charge(-500)
			.linkDistance(100)
			.nodes(json.nodes)
			.links(json.links)
			.size([w, h])
			.start();
   
   
		var link = vis.selectAll("line.link")
			.data(json.links)
			.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); /*return d.value;*/ })
			.style("stroke", "#ccc" )
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
   
  
		var node = vis.selectAll("circle.node")
			.data(json.nodes)
			.enter().append("circle")
			.attr("class", function(d){return ("node tipo"+d.group);})
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r", 5)
			.call(force.drag);
 
 
		var titulos = vis.selectAll("text.node")
			.data(json.nodes)
			.enter().append("svg:text")
			.attr("class", "nodetext")
			.attr("x", function(d) { return d.x + 5; })
			.attr("y", function(d) { return d.y +5; })
			.text(function(d) { return d.name; });

  
		force.on("tick", function() {
				link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
 
				node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
    
				titulos.attr("x", function(d) { return d.x+5; })
				.attr("y", function(d) { return d.y+5; });
			});
 
	});//d3.json
 






