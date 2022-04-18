// D3
area = d3.area()
        .defined(function(d) { return d.average >= 0; })
        .x(function (d) { return xScale(d.date); })
        .y0(function() {return yScale.range()[0]; })
        .y1(function(d) { return yScale(d.average); });

dangerArea = d3.area()
        .defined(function(d) {return d.average >= 350; })
        .x(function(d) {return xScale(d.date);})
        .y0(function() {yScale(350); })
        .y1(function(d) {return yScale(d.average); })


// REACT / REDUX
 


 // SVG
 svg.append("path")
 .datum(dataset)
 .attr("class", "area")
 .attr("d", area);

 svg.append("path")
 .datum(dataset)
 .attr("class", "area danger")
 .attr("d", dangerArea)

 // PATH
 <path className="area" d={area(dataset)}></path>
 <path className="area danger" d={dangerArea(dataset)}></path>
 