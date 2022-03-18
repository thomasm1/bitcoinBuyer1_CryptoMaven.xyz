import React from './app-react.js';
import ReactDOM from './app-react-dom.js'


const width = window.innerWidth;
const height = window.innerHeight;
const centerX = width/2;
const centerY = height/2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20; 
const mouthRadius = 140;



console.log(React);
export const App = () => (
 <div>
    <svg width="960"> 
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="silver"
        stroke="silver"
        stroke-width="1"
      ></circle>
      </svg>
    {console.log("2!!!!!!!!,", React) }
 </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
