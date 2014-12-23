average = function(a) {
  var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
  for(var m, s = 0, l = t; l--; s += a[l]);
  for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
  return r.deviation = Math.sqrt(r.variance = s / t), r;
};

mapressoproc = {
	
  classify1: function (d, i) {
    var z = thedata.get(d.id);
    if (z < mapresso.zbot) return mapresso.colorMin;
    if (z > mapresso.ztop) return mapresso.colorMax;
    var interpolate = d3.interpolateHsl(mapresso.colorBot, mapresso.colorTop);
    return interpolate((z - mapresso.zbot) / mapresso.zrange);
  },

	classify2: function (d, i) {
	    var z = thedata.get(d.id);
	    if (z < mapresso.zbot) return mapresso.colorMin;
	    if (z > mapresso.ztop) return mapresso.colorMax;
	    var interpolate;
	    if (z <= mapresso.zmed) {
	      interpolate = d3.interpolateHsl(mapresso.colorBot, mapresso.colorMedBot);
	      return interpolate((z - mapresso.zbot) / (mapresso.zmed - mapresso.zbot));
	    }
	    interpolate = d3.interpolateHsl(mapresso.colorMedTop, mapresso.colorTop);
	    return interpolate((z - mapresso.zmed) / (mapresso.ztop - mapresso.zmed));

  }

}

