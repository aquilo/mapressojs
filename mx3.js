/* ************************************************************ */

// Model 1: from white to blue (not active)

var hue = 240;
var mapresso1 = {
  zfact: 1.5,
  colorMin: d3.hsl(hue, 1, 0.96),
  colorBot: d3.hsl(hue, 1, 0.94),
  colorTop: d3.hsl(hue, 1, 0.06),
  colorMax: d3.hsl(hue, 1, 0.03),

  classify: mapressoproc.classify1
}

// Model 2: from red via yellow to green

var mapresso2 = {
  zfact: 1.5,
  colorMin: d3.rgb(200, 0, 0),
  colorBot: d3.rgb(255, 0, 0),
  colorMedBot: d3.rgb(255, 255, 51),
  colorMedTop: d3.rgb(224, 255, 0),
  colorTop: d3.rgb(0, 255, 51),
  colorMax: d3.rgb(0, 136, 85),

  classify: mapressoproc.classify2
}


/* ************************************************************ */
// The program

var mapresso = mx3.mtyp === 1 ? mapresso1 : mapresso2; // activation of model 2

var thedata = d3.map();

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, mx3.geo)
    .defer(d3.tsv, mx3.datatxt, function(d) { 
      thedata.set(d[mx3.dataid], +d[mx3.datavar]); 
    })
    .await(ready);

function ready(error, geometry) {
 /* ************************************************************ */
 // zbot, ztop and zmed not yet defined
 // we calculate theses with mean and zfact * standard deviation
 var r = average(thedata.values());
  mapresso.zbot = r.mean - mapresso.zfact * r.deviation;
  mapresso.ztop = r.mean + mapresso.zfact * r.deviation;
  mapresso.zmed = r.mean;
  mapresso.zrange = mapresso.ztop - mapresso.zbot;
  console.log(r.mean + " " + r.variance + " " + r.deviation + " " + mapresso.zrange + " " + mapresso.zbot + " " + mapresso.zmed + " " + mapresso.ztop)
/* ************************************************************ */

  svg.append("g")
      .attr("class", mx3.geoid)
    .selectAll("path")
      .data(topojson.feature(geometry, geometry.objects[mx3.geoid]).features)
    .enter().append("path")
      .style('fill', mapresso.classify)     // apply the classification
      .attr("d", path);

}

d3.select(self.frameElement).style("height", height + "px");
