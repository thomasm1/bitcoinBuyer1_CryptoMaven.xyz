import React from './app-react.js';
import ReactDOM from './app-react-dom.js';
console.log("REACT", React)
import './src/css/styles.css'
import "../src/assets/responciv.css";
import MainRouter from "./router/mainRouter";
import "animate.css";

function App1() {
  return <MainRouter />;
}

export default App1;