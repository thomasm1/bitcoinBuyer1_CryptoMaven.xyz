import Quotations from '../txt/quotations.js'
import Random from './dataUtil/Random.js'


export function AppStyle(options) {
    this.options = options || {}
    this.keyMapArray = [];
}      
 
                                                 ///////////////////////// 
////////////////// default properties 
//////////////////                               /////////////////////////

AppStyle.prototype.options.widget  = {
    color: "darkblue;",
    backgroundColor: "rgba(135, 207, 235, 0.875);",
    width: "100"
}

AppStyle.prototype.options.subWidget ={
    color: "blue;",
    backgroundColor: "rgba(135, 207, 235 );",
    opacity: "1",
    minWidth: "100",
    margin: "0",
    height: "220px;",
    maxHeight: "220px;",
    overflowY: "scroll;",
    textAlign: "justify;",
    titleTextAlign: "center;",
    padding: "0px 0px;"
}
 
AppStyle.prototype.options.dashboardOptions= {
   elemSize: "h3",
   dashGrid: "#dashGrid",
   ctrlsArray: ["Hashing", "visualDAG", "Sankey"]
    }
     
////////////////// functions placed on prototype ///////////////////////// 
//////////////////                               /////////////////////////

AppStyle.prototype.elemHeader = (elemId) => {
    let elem = elemId || '#header'
    d3.select(elem)
  .append('p')
  // .attr('class', 'foo')
  // .attr('class', 'bar')
  .classed('foo', true)
  .classed('bar', false)
  .text('Data Driven Documents - d3 - connect')
  .style('color', 'blue')
  .style('text-align','right')
  .style('margin-right', '10px');
}
AppStyle.prototype.titleWidget = (spec) => {
    let spec = options.subWidget
    let instance = {};
    let headline, desc;
     
    instance.render = function () {
        var div = d3.select(".appStyle").append("div");
        div.append("h1").text(headline)
            .attr(
                "style",
                "text-align:" +
                spec.titleTextAlign
            );
        div
            .attr("class", "box")
            // .attr("style", "color:" + spec.color)
            .attr(
                "style",
                "background-color: " +
                spec.backgroundColor +
                "opacity: " +
                spec.opacity +
                "color:" +
                spec.color +
                "width:" +
                spec.minWidth +
                "%;" +
                "height:" +
                spec.height +
                "max-height:" +
                spec.maxHeight +
                "overflow-y:" +
                spec.overflowY +
                "text-align:" +
                spec.textAlign +
                "padding:" +
                spec.padding
            )
            .append("p")
            .html(desc);
        return instance;
    };

    instance.headline = function (h) {
        if (!arguments.length) return headline;
        headline = h;
        return instance;
    };

    instance.desc = function (d) {
        if (!arguments.length) return desc;
        desc = d;
        return instance;
    };
    return instance;
} // end TitleWidget
AppStyle.prototype.generateUserPropensity = () => { 
    const random = new Random()
    return random.generateRandom(options.dashboardOptions.ctrlsArray) // is it worth it or static Math.random()
}

AppStyle.prototype.handleClick = (e) => {
    userChoice = e.target.id 
    userDisplay1.innerHTML = userChoice; 
}

AppStyle.prototype.dashboard = (options) =>{ 
    let spec = options.dashboardOptions 
    let instance = {}
    let elemSize = spec.elemSize || "h3"
    let dashGrid = spec.dashGrid || "#dashboardGrid"
    const userDisplay1 = document.createElement(elemSize)
    const userDisplay2 = document.createElement(elemSize)
    const outputDisplay  = document.createElement(elemsize)
    const ctrlsArray = spec.ctrlsArray ||  ["Hashing", "DAG Visual", "Sankey"]
    const dashboardGrid = document.getElementById(dashGrid)
 
    dashboardGrid.append(userDisplay1,userDisplay2,outputDisplay); 

    for(let i = 0;i<ctrlsArray.length;i++){
        const button = doc.createElement('button')
        button.id = ctrlsArray[i]
        button.addEventListener('click', handleClick)
        dashboardGrid.appendChild(button)
    }
}
  
const appStyle= new AppStyle(options)
appStyle.headline(title.toUpperCase());
 appStyle.headline(tocTitle)
    .desc(toc);

    appStyle.widget.render();
appStyle.subWidget.render(); 
 