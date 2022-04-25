
(function() {
   

 
  console.log("heyj-index D3")
const DUMMY_DATA = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];
console.log(DUMMY_DATA)
const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
  .rangeRound([0, 250])
  .padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);



const containerD3 = d3.select('svg').classed('visual', true);

const bars = containerD3
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  .attr('x', data => xScale(data.region))
  .attr('y', data => yScale(data.value));

setTimeout(() => {
  bars.data(DUMMY_DATA.slice(0, 2)).exit().remove();
}, 2000);



var newDiv = document.getElementById("d3") 
const ul = document.createElement("ul")

d3.select(ul).classed('d3ul',true)
newDiv.append(ul)
 
  const countryData = {

  items: ['China', 'India', 'USA'],
  addItem(item) {
    this.items.push(item);
  },
  removeItem(index) {
    this.items.splice(index, 1);
  },
  updateItem(index, newItem) {
    this.items[index] = newItem;
  },
};

d3.select('.d3part')
  .selectAll('li')
  .data(countryData.items, data => data)
  .enter()
  .append('li')
  .text((data) => data);

setTimeout(() => {
  countryData.addItem('France');
  d3.select('.d3ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .enter()
    .append('li')
    .classed('added', true)
    .text((data) => data);
}, 1400);                                        

setTimeout(() => {
  countryData.removeItem(0);
  d3.select('.d3ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .exit()
    .classed('redundant', true);
}, 1600);

setTimeout(() => {
  countryData.updateItem(1, 'Russia')
  d3.select('.d3ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .exit()
    .classed('updated', true)
    .text('Russia');
}, 2000);

 
})()