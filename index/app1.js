import React from './app-react.js';
import ReactDOM from './app-react-dom.js';
console.log("REACT", React)
import './src/css/styles.css' 
import "../src/assets/responciv.css";
import MainRouter from "./router/mainRouter";
import "animate.css";
function App() {
  return <MainRouter />;
}
 
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

import "../src/assets/style.css";
import "../src/assets/responciv.css";
import MainRouter from "./router/mainRouter";
import "animate.css";
function App() {
  return <MainRouter />;
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 