const Module = function (id) {
  document.getElementById(id).innerHTML = `  
      <svg id="thisSVG">
      </svg>  
      `;

const svg = d3.select("#thisSVG");
const width = +svg.attr("width", "600px");
const height = +svg.attr("height");
 
const render = (selection, {fruits}) => {
  svg
.style("background", "red");

const circles = selection.selectAll("circle")
  .data(modules);

circles
  .enter()
  .append("circle")
  .attr("cx", (d, i) => i * 100 + 110)
  .attr("cy", height / 3)
  .attr("fill", "darkblue")
  .attr("r", 50);

circles.exit()
  .attr("fill", "black");

svg
  .selectAll("circle")
  .data(modules)

};

const makeModules = (type) => ({ type });
const modules = d3.range(4)
  .map(() => makeModules("btc"));

  render(svg, { modules });

setTimeout(() => {
  console.log(modules);
  console.log("hey modules");
  modules.pop();
  render(svg, { modules });
}, 3000);

}
let modInstance = new Module("module");
 

