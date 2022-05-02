import React, { Component } from "react";
import MainRouter from "./router/mainRouter"; 
import "animate.css";
// import "./assets/application.scss";
import "./assets/style.css";
import "./assets/responciv.css";
// import web3 from './web3.js';

 
class App extends React.Component {
  render() {
    // console.log("Web3 version: " + web3.version);
    // web3.eth.getAccounts().then(console.log);

    return (
      <div className="App">
        <h1>CryptoMaven</h1>
        <MainRouter />
      </div>
    );
  }
}
export default App;
