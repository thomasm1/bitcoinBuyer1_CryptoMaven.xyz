// https://web3js.readthedocs.io/en/v1.7.3/getting-started.html#adding-web3-js
import Web3 from "web3";

window.ethereum.request({ method: "eth_requestAccounts" });

// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// const web3 = new Web3(window.web3.currentProvider);
const web3 = new Web3(window.ethereum); 

export default web3; 

