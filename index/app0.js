// React  ==>global obj at load' <==/app-react.js'; 

// ReactDOM ==>global obj at load' <==./app-react-dom.js';   

// window ==> global obj at load

(function (React, ReactDOM){
  "use strict"; 
    React = React && React.hasOwnProperty('default') ? React['default'] : React;
    ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
    
  const width = window.innerWidth /1.5;
  const height = window.innerHeight/3;
  const centerX = width/2;
  const centerY = height/2;
  const strokeWidth = 20;
  const eyeOffsetX = 90;
  const eyeOffsetY = 100;
  const eyeRadius = 40;
  const mouthWidth = 20; 
  const mouthRadius = 140;
  const blue ="blue"
  
  
   const App0 = () => ( 
     React.createElement('svg', {width:width, height:height},
        React.createElement('g', {transform: `translate(${centerX},${centerY})`},

          React.createElement('circle', {
            r:centerY -strokeWidth /2, fill: "silver", stroke:"blue", 'stroke-width':strokeWidth }),
          React.createElement('circle', {
            cx:-eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius, fill: blue, stroke:"red" }),
          React.createElement('circle', {
            cx:eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius, fill: "blue", stroke:"black" }) 
        ) // End g group element
          )
  );
  
  const rootElement = document.getElementById('root0');
  ReactDOM.render(React.createElement(App0, null), rootElement);
   

}(React,ReactDOM));
 

 