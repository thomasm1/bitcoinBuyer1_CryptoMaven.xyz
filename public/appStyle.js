
export function AppStyle( ) {
    this.keyMapArray = [];
}      
 
                                                 ///////////////////////// 
////////////////// default properties 
//////////////////                               /////////////////////////
AppStyle.prototype.title = "Bitcoin Buyer Console: Phase I, Raw Materials";
AppStyle.prototype.tocTitle = "Guiding Inspiration for Bitcoin Buyer:";
AppStyle.prototype.toc = "Typically, momentum trading is effective in markets that 1) do not have valuation models, 2) have large amounts of volatility, and 3) have frequent mispricings. Momentum investing is not typically used in US stocks, bonds, or options \u2013 as they have clear valuation models (e.g. discounted cash flow analysis for stocks and black Scholes for options). However, for commodities and assets like crypto \u2013 momentum trading can be an effective strategy that allows protection from losses in downtrends and capture subside on the uptrends. Based on historical data, this may be an extremely effective strategy \u2013 until a valuation model has been figured out.\u201D <sup>1</sup><br />\n<br /> \n[using a strategy to]\n\"... create deep reinforcement learning agents that learn to make money trading Bitcoin. <br />\n... to experiment with state-of-the-art deep reinforcement learning technologies to see if we can create profitable Bitcoin trading bots. It seems to be the status quo to quickly shut down any attempts to create reinforcement learning algorithms, as it is \u201Cthe wrong way to go about building a trading algorithm\u201D. However, recent advances in the field have shown that RL agents are often capable of learning much more than supervised learning agents within the same problem domain.\" <sup>2</sup><br />\n<br />\n\n1. https://www.coindesk.com/set-protocol-launches-momentum-trading-strategy<br /><br />\n2: https://towardsdatascience.com/creating-bitcoin-trading-bots-that-dont-lose-money-2e7165fb0b29<br /><br />\n \ndata from: 07-04-2019<br />\nsource -https://www.cryptodatadownload.com/data/northamerican/";
AppStyle.prototype.possibleChoices = [];
AppStyle.prototype.options = {}
AppStyle.prototype.options.widgetOptions  = {
    color: "darkblue;",
    backgroundColor: "rgba(135, 207, 235, 0.875);",
    width: "100"
}

AppStyle.prototype.options.subWidgetOptions ={
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
 
AppStyle.prototype.options.dashboardOptions = {
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
AppStyle.prototype.instance = {};
AppStyle.prototype.headline, AppStyle.prototype.desc;
AppStyle.prototype.titleWidget = (spec) => {
    this.spec = spec || options.subWidgetOptions

     
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
// AppStyle.prototype.generateUserPropensity = () => { 
//     const random = new Random()
//     return random.generateRandom() // is it worth it or static Math.random()
// }

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
        console.log(ctrlsArray[i])
        const button = doc.createElement('button')
        button.id = ctrlsArray[i]
        button.addEventListener('click', this.handleClick)
        dashboardGrid.appendChild(button)
    }
} 
 
const appStyle= new AppStyle()
appStyle.dashboard()
// appStyle.headline(appStyle.title.toUpperCase());
//  appStyle.headline( appStyle.tocTitle)
//     .desc(appStyle.toc);

//   appStyle.widget.render();
// appStyle.subWidget.render(); 
// appStyle.titleWidget()
// appStyle.elemHeader();

 


// possibleChoices = document.getElementsByClassName('button')
// console.log("possibleChoices", possibleChoices)
// const apiNavChoiceDisplay = document.getElementById('api-nav-choice-display')

 
// let apiNavChoice 
// possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) =>{
//   apiNavChoice = e.target.id
//   apiNavChoiceDisplay.innerHTML = apiNavChoice
//   console.log(apiNavChoice)
//   // getResult(apiNavChoice);
// }))

// function getResult(apiNavChoice) { 
//   let path = '';
//   //                  // TEMP CASE SWITCH
//   switch(apiNavChoice) {
//   case 0:
//   console.log("0: "+"get-meta-data"+path);
//   path = 'get-meta-data'
//   break;
//   case 1:
//   console.log("1 search"+path);
//   path = 'coins/search';
//   break;
//   case 2:
//   console.log("2"+"coins/list"+path);
//   path = 'coins/list';
//   break;
//   case 3:
//   console.log("3"+"coins/list-pairs"+path);
//   path = 'coins/list-pairs';
//   break;
//   case 4:
//   console.log("4"+"get-overview"+path);
//   path = 'coins/get-overview'; 
//   break;
//   case 5:
//   console.log("4"+"get-technical"+path);
//   path = 'coins/get-technical';
//   break;
//   case 6:
//   console.log("4"+"get-markets"+path);
//   path = 'coins/get-markets';
//   break;
//   case 7:
//   console.log("4"+"get-historical-data"+path);
//   path = 'coins/get-historical-data';
//   break;
//   case 8:
//   console.log("4"+"get-analysis"+path);
//   path = 'coins/get-analysis';
//   break;
//   case 9:
//   console.log("4"+"get-news"+path);
//   path = 'coins/get-news';
//   break; 
//   }
  
// }
 