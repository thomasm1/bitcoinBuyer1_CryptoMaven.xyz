import React from 'react';
import { createRoot } from 'react-dom/client' 
import  './index.css'; 
import App from './App.js'; 
import d3 from './app-d3v7.js';
import './indexd3.js' 
 
 
console.log("heyj-index")
 
 
// import logo from "./assets/logo.png";
// import "./App.css";
// import web3 from './web3.js';

const container = document.getElementById('rootX');
const root = createRoot(container);
root.render(<App tab="home" /> );
 