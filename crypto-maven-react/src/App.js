import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from './web3';

class App extends React.Component {
  render() {
    console.log("Web3 version: " + web3.version);
    web3.eth.getAccounts().then(console.log);

    return (
      <div className="App">
        
      </div>
    );
  }
}
export default App;
