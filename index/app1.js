import React from './app-react.js';
import ReactDOM from './app-react-dom.js';
console.log("REACT", React)
import './src/css/styles.css'

const App = () =>  (
// {
//     return (   
     <svg width="600" height="450">
   <h2>app-d3-react-title</h2>
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="silver"
        stroke="silver"
        stroke-width="1"
      ></circle>
</svg> 
    );

const rootElement = document.getElementById("root1")
ReactDOM.render(<App />, rootElement);