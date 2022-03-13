import Quotations from '../txt/quotations.js';

export function appStyle(option = null) {

function makeDarkMode(spec) {
    let instance = {};
    instance.render = function() {
        let body = d3.select("body");
        body.attr(
            "style",+
            "color:"+
            spec.body.color+
            "font:"+
            spec.body.font+
            "background-color:"+
            spec.body.backgroundColor
        ) 
        let a = d3.selctAll("a");
        a.attr(
            "style",+
            "color:"+
            spec.a.color
        )
    }
}       
if (option) { 
    spec = {}
    spec.body.color = "#222;"
    spec.body.backgroundColor = "#fff;"
    spec.body.font = "100% system-ui;"
    spec.a.color = "0033cc;"
    makeDarkMode(spec)
}    

/* Dark Mode */ 
// body {
//     color: #222;
//     background: #fff;
//     font: 100% system-ui;
//   }
  
//   a {
//     color: #0033cc;
//   }
  
//   @media (prefers-color-scheme: dark) {
//     body {
//       color: #eee;
//       background: #121212;
//     }
  
//     body a {
//       color: #809fff;
//     }
//   }
       
//////////////////////////////////////////////////////////
// const pBrowser = document.querySelector('p')
const element = d3.select('#module')
  .append('p')
  // .attr('class', 'foo')
  // .attr('class', 'bar')
  .classed('foo', true)
  .classed('bar', false)
  .text('Data Driven Documents - d3 - connect')
  .style('color', 'blue')
  .style('text-align','right')
  .style('margin-right', '10px');

// console.log(pBrowser)
console.log(element)
/////////////////////////////////////////////////////////

function TitleWidget(spec) {
    var instance = {};
    var headline, desc;
     
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

var widget = new TitleWidget({
    color: "darkblue;",
    backgroundColor: "rgba(135, 207, 235, 0.875);",
    width: "100"
})
    .headline(title.toUpperCase());

var subWidget = new TitleWidget({
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
})
    .headline(tocTitle)
    .desc(toc);

widget.render();
subWidget.render(); 
 
}