// import { render } from './indexModule';

const Module = function (id) {
    document.getElementById(id).innerHTML = `  
    <svg id="thisSVG">
    </svg>  
    `;
    
    
const svg = d3.select("#thisSVG");
svg.style("background", "red");

const width = +svg.attr("width", "600px");
const height = +svg.attr("height");

const colorScale = d3.scaleOrdinal()
  .domain(["btc", "eth", "hex"])
  .range(["yellow", "cyan", "magenta"]);

const radiusScale = d3.scaleOrdinal()
  .domain(["btc", "eth", "hex"])
  .range([50, 45, 30]);

  const render = (selection, { modules }) => {

  const circles = selection.selectAll("circle").data(modules);
  circles
    .enter().append("circle")
    .attr("cx", (d, i) => i * 100 + 110)
    .attr("cy", height / 3)
    .merge(circles) // enter+update
    // circles  // circles object IS the update function!!!!!
    .attr("fill", (d) => colorScale(d.type))
    .attr("r", (d) => radiusScale(d.type));
  circles.exit().attr("fill", "black");  // .remove()
};

//////////////////////////////////////

const makeModules = (type) => ({ type });
const modules = d3.range(5).map(() => makeModules("btc"));

render(svg, { modules }); 

setTimeout(() => {
  console.log("hey modules", modules);
  modules.pop();
  render(svg, { modules });
}, 1000);

setTimeout(() => {
  modules[1].type = "hex";
  render(svg, { modules });
}, 2000);

setTimeout(() => {
  modules[2].type = "eth";
  render(svg, { modules });
}, 3000);
};

let modInstance = new Module("module");