var xx = null;
var yy = null;
var id = "";
var elemd3 = null ;
var t = null;

var jour = null ;
var heure = null ;
var etage = 1 ; 
var idtemp = ""
    
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

    
function clear(){
	d3.select("svg")
	.select("g")
	.selectAll("path")
	.style("fill",function(d){return d.properties.fill;})
	.style("fill-opacity",function(d){return d.properties["fill-opacity"];});
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function getAbout(jour,heure,salle)
{
	
	readTextFile("dataF.json", 
		function(text)
		{
		    data = JSON.parse(text);

		    for(var i in data)
		    {
		        var d = data[i];
		        for (var j in d.Jour[jour][heure])
		        {
		        	var dd = d.Jour[jour][heure][j];
		        	if(dd.Salle == salle)
		        	{
		        		var fil = d.Filere;
				    	var sec = d.Section;
				    	var gr = d.Grade;
				    	var prof = dd.Prof ;
				    	var mod = dd.Module ;
				    	var type = "Cour";

				    	if (!(dd.Type === undefined)){
				    		type = dd.Type+" "+dd.Groupe;
				    	}
				    	
				    	//document.querySelector("#op3 > h1")
				    	document.getElementById("op3").innerHTML = ""+
						"<div class = 'closeFen' onclick=requestClose() >&#10006;</div>"+
				    	"<h3 class='titleSalle'>Salle : "+salle+"</h3>"+
						"<div class = 'otherinformations'>Filere : "+fil+"</div>"+
						"<div class = 'otherinformations'>Grade : "+gr+"</div>"+
						"<div class = 'otherinformations'>Section : "+sec+"</div>"+
						"<div class = 'otherinformations'>Module : "+mod+"</div>"+
						"<div class = 'otherinformations'>Prof : <a href='profedt.html?prof="+prof+"'  target='_blank' >"+prof+"</a></div>"+
						"<div class = 'otherinformations'>Type : "+type+"</div>"
				    	
		        	}
		        }
	    	}
		});

}



function onMouseUpdate(e) {
  xx = e.pageX;
  yy = e.pageY;
  
  //getInputs();
  if (document.getElementById("demo-input").value == ""){
  	document.querySelector("#did > div.select-selected").innerHTML = "Choisir Heure :" ;
  }else{
  	document.querySelector("#did > div.select-selected").innerHTML = document.getElementById("demo-input").value ;
  }
  
//	console.log(id);  



d3.select("svg")
	.select("g")
	.selectAll("path")
	.style("fill",function(d){
		if (d.properties.name == id ){
			return "white";
		}else{
			return d.properties.fill;
		}
	})
	.style("fill-opacity",function(d){
		if (d.properties.name == id ){
			return 0.8;
		}else{
			return d.properties["fill-opacity"];
		}
		
	});

	
  if (id == "" || id == "undefined"){
  	d3.select("text").remove();
	
  }else{

  	d3.select("svg").style("cursor","default");
  	d3.select("text").remove();
  	svg.append("text")
						.style("font", "10px times")
						.attr("fill", "darkslategray")
						.attr("transform", "translate("+(xx+320)+" "+(yy+300)+")")
						.attr("text-anchor", "end")
						.text(id);
		d3.select("svg").style("cursor","default");
  }
  
}

function getMouseX() {
  return xx;
}

function getMouseY() {
  return yy;
}


//Width and height
var w = screen.width*1.5;
var h = screen.height*1.5;


// dimensions
    var dims = {
        width: w,
        height: h,
        svg_dx: 100,
        svg_dy: 100
    };

//Define map projection
var proj = d3.geoMercator()
					   .translate([0,0])
					   .scale([1]);

//Define path generator
var path = d3.geoPath()
				 .projection(proj);



var svg = d3.select("#wrapper")
			.append("svg")
			.attr("width", w)
			.attr("height", h).attr("transform","translate(-500 -300)");
			
var g = svg.append("g");


function getInformation(){
	var sel = document.querySelector("#textgen").innerHTML ;

	document.getElementById("op3").style.top=""+yy+"px";
    document.getElementById("op3").style.left=""+(xx+10)+"px";
    document.getElementById("op3").style.display="inline";
    //document.getElementById("op3").innerHTML =""+sel+" "+jour+" "+document.getElementById("demo-input").value;

    // process //
    var time = document.getElementById("demo-input").value;
    var codevalue = parseInt(time[0])*1000 + parseInt(time[1])*100 + parseInt(time[3])*10 + parseInt(time[4])
    var timestr = ""

    if (codevalue >= 800 && codevalue <= 930 )
    {
    	timestr = "08:00 - 09:30"
    }
    if (codevalue >= 940 && codevalue <= 1110 )
    {
    	timestr = "09:40 - 11:10"
    }
    if (codevalue >= 1120 && codevalue <= 1250 )
    {
    	timestr = "11:20 - 12:50"
    }
    if (codevalue >= 1300 && codevalue <= 1430 )
    {
    	timestr = "13:00 - 14:30"
    }
    if (codevalue >= 1440 && codevalue <= 1610 )
    {
    	timestr = "14:40 - 16:10"
    }
    if (codevalue >= 1620 && codevalue <= 1750 )
    {
    	timestr = "16:20 - 17:50"
    }

    daystr = ""

    if (jour == "1")
    {
    	daystr = "Sam"
    }
    if (jour == "2")
    {
    	daystr = "Dim"
    }
    if (jour == "3")
    {
    	daystr = "Lun"
    }
    if (jour == "4")
    {
    	daystr = "Mar"
    }
    if (jour == "5")
    {
    	daystr = "Mer"
    }
    if (jour == "6")
    {
    	daystr = "Jeu"
    }

    document.getElementById("op3").innerHTML = ""+
				"<div class = 'closeFen' onclick=requestClose() >&#10006;</div>";
    // result //
    console.log(daystr,timestr,sel)
    getAbout(daystr,timestr,sel)

	
}


function requestClose(){
	document.getElementById("op3").style.display="none";
		   	document.getElementById("op3").innerHTML="";
		   	idtemp = "";
}

svg.on('click', function(d,i) {
    console.log("yes : "+document.querySelector("#textgen").innerHTML );
    getInformation();
});

d3.json("map1.geojson").then(function(json) {
    var b = path.bounds(json);
    
    s = .99 / Math.max( (b[1][0] - b[0][0]) / w , (b[1][1] - b[0][1]) / (h-20) ); 
    t = [ (w - s * (b[1][0] +b[0][0])) / 2 , ((h-20) - s * (b[1][1]+b[0][1])) / 2 ];
   
    proj.translate(t).scale(s);

	
		var map = g.selectAll("path")
		   .data(json.features)
   		.enter()
		   .append("path")
		   .attr("d", path)
		   .attr("fill",function(d){return d.properties.fill;})
		   .attr("fill-opacity",function(d){return d.properties["fill-opacity"];})
		   .attr("stroke",function(d){return d.properties.stroke;})
		   .attr("stroke-width","0.2")
		   .on('mouseover',function(d){
		   
		   		if (d.properties.name != "USTHB"){
		   			if (d.properties.fill != "#d7cbcb"){
		   				id = ""+d.properties.name
		   			}
		   		}
		   		
		   }).on('mouseenter',function(d){
		   		idtemp = ""+d.properties.name
		   		document.querySelector("#textgen").innerHTML = idtemp;
		   }).on('mouseout',function(d){
		   	id = "";/*
		   	document.getElementById("op3").style.display="none";
		   	document.getElementById("op3").innerHTML="";
		   	idtemp = "";*/
		   });
	});

var zoom = d3.zoom()
      .extent([[dims.svg_dx, dims.svg_dy], [dims.width-(dims.svg_dx*2), dims.height-dims.svg_dy]])
      .scaleExtent([1, 10])
      .translateExtent([[dims.svg_dx, dims.svg_dy], [dims.width-(dims.svg_dx*2), dims.height-dims.svg_dy]])
      .on('zoom', function() 
      {
      	g.selectAll('path')
           .attr('transform', d3.event.transform);
});

svg.call(zoom);
//d3.select("svg").on("dblclick.zoom", null);
d3.select("#zoom_in").on("click", function() {
  zoom.scaleBy(svg.transition().duration(200), 2);
});
d3.select("#zoom_out").on("click", function() {
  zoom.scaleBy(svg.transition().duration(200), 0.5);
});


document.getElementById('listeid').addEventListener('mousedown', function(e){
	document.querySelector("#demo-input").click();
	document.querySelector("#menu").classList.add("expanded");

	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left").style.top="46%";
	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left").style.left="0%";
	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left > div.arrow").style.left = "200px";


});


document.getElementById('listeid').addEventListener('mousedown', function(e)
{
	document.querySelector("#demo-input").click();
	document.querySelector("#menu").classList.add("expanded");

	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left").style.top="350px";
	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left").style.left="0%";
	document.querySelector("body > div.popover.clockpicker-popover.bottom.clockpicker-align-left > div.arrow").style.left = "200px";
});

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}
document.getElementById("etageid").addEventListener("mouseout", myFunction);
document.getElementById("did").addEventListener("mouseout", myFunction3);
document.getElementById("jourid").addEventListener("mouseout", myFunction2);

function myFunction2(){
	jour = document.querySelector("#selectjour").value ;
}
function myFunction3(){
	
	//document.querySelector("#did > div.select-selected").innerHTML = document.getElementById("demo-input").value ;
}

function myFunction() {
  var selectedEtage = document.querySelector("#selectetage").value ;

  if (selectedEtage != 0){
  	if (selectedEtage == etage){
	  	
	  }else{
	  	etage = selectedEtage;
	  	var mp = "map"+selectedEtage+".geojson";
	  	d3.select("svg").select("g").selectAll("path").remove();
	  	d3.select("svg").on('click', function(d,i) {
					    console.log("yes : "+document.querySelector("#textgen").innerHTML );
					    getInformation();
					});
		  d3.json(mp).then(function(json) {
			
				var map = d3.select("svg").select("g").selectAll("path")
				   .data(json.features)
		   		.enter()
				   .append("path")
				   .attr("d", path)
				   .attr("fill",function(d){return d.properties.fill;})
				   .attr("fill-opacity",function(d){return d.properties["fill-opacity"];})
				   .attr("stroke",function(d){return d.properties.stroke;})
				   .attr("stroke-width","0.2")
				   .on('mouseover',function(d){
					   
					   		if (d.properties.name != "USTHB"){
					   			if (d.properties.fill != "#d7cbcb"){
					   				id = ""+d.properties.name
					   			}
					   		}
					   		
					   }).on('mouseenter',function(d){
					   		idtemp = ""+d.properties.name
					   		document.querySelector("#textgen").innerHTML = idtemp;
					   }).on('mouseout',function(d){
					   	id = "";
					   
					   });
				  d3.select("svg").call(zoom);


				  zoom.scaleBy(d3.select("svg").transition().duration(200), 1);
			});
	  }
  }

  
  /*
  d3.select("svg").select("g").selectAll("path").remove();

  d3.json("map2.geojson").then(function(json) {
	
		var map = d3.select("svg").select("g").selectAll("path")
		   .data(json.features)
   		.enter()
		   .append("path")
		   .attr("d", path)
		   .attr("fill",function(d){return d.properties.fill;})
		   .attr("fill-opacity",function(d){return d.properties["fill-opacity"];})
		   .attr("stroke",function(d){return d.properties.stroke;})
		   .attr("stroke-width","0.2")
		   .on('mouseover',function(d){
		   
		   		if (d.properties.name != "USTHB"){
		   			if (d.properties.fill != "#d7cbcb"){
		   				id = ""+d.properties.name
		   			}
		   		}
		   		
		   }).on('mouseout',function(d){
		   	id = "";
		   });
		  d3.select("svg").call(zoom);
		  zoom.scaleBy(d3.select("svg").transition().duration(200), 1);
	});
	*/

}