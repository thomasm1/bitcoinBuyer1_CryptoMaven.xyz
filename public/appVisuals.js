export function appVisuals() {
     
const placeHolderVis = () => {
    d3.json("./data/json/btc-array.json", function (data) {
      var canvas = d3
        .select("#d3data")
        .append("svg")
        .attr("width", 800)
        .attr("height", 300);

      canvas
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function (d) {
          return d.Close / 100;
        })
        .attr("height", 20)
        .attr("y", function (d, i) {
          return i * 30;
        })
        .attr("fill", "green");
    });
  };

placeHolderVis();
}