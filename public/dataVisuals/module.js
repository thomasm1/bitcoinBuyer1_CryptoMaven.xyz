 
  function Module(id) {
  document.getElementById(id).innerHTML = `  
      <svg id="thisSVG">
      </svg>  
      `;

const svg = d3.select('#thisSVG');
const width = +svg.attr('width');
const height = +svg.attr('height');

const makeModules = type => ({type});
const modules = d3.range(5)
    .map(() => makeModules('btc'));

setTimeout(() => {
  console.log(modules);
  console.log("hey modules");
}
,3000)

svg.selectAll('circle').data(modules)
    .enter().append('circle')
        .attr('cx', (d,i) => i * 100)
        .attr('cy', height/2)
        .attr('r', 50);
svg.style('background','red');

      };

let mod1 = new Module("module");
let mod2 = new Module("module2");
let mod3 = new Module("module3");
// mod.render();
        //
         
        //     document.getElementById(id).innerHTML = ` 
             
        //     <div class="appQueue">
        //     </div>  
        //     `;
 
        //     let ETH = 20.53,
        //       BTC = 25.44; //,  e = 15, i = 20, u = 30
        //     let XRP = 70.65,
        //       LTC = 75.76,
        //       b = 45.92,
        //     c= 46.07,
        //     d=56.68,
        //     e=22.82,
        //     f=41.71,
        //     g=223.53,
        //     h=324.66,
        //     i=23.34,
        //     j=27.26,
        //     k=22.44,
        //     l=44.55,
        //     m=233.11,
        //     n=211.56,
        //     o=111.33,
        //     p=234.22;
        //     let data = [ETH, BTC, XRP, LTC,ETH, BTC,XRP,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p];
            
        //     function render(data) {
        //       var bars = d3
        //         .select(".appQueue")
        //         .selectAll("div.h-bar")
        //         .data(data); //UPDATE data
            
        //       bars // ENTER data
        //         .enter()
        //         .append("div")
        //         .attr("class", "h-bar")
        //         .merge(bars) //Enter + Update data
        //         .style("width", function(d) {
        //           return d * 3 + "px";
        //         })
        //         .text(function(d) {
        //           return '$ '+ d;
        //         });
            
        //       bars
        //         .exit() // Exit
        //         .remove();
        //     }
            
        //     setInterval(function() {
 
        //       data.unshift((50+ Math.random() * 100).toFixed(2));
        //       data.pop();
        //       render(data);
        //     }, 1500);
            
        //     render(data);
             
            
        //   