import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App.js';
// import reportWebVitals from './reportWebVitals.js';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import web3 from './web3.js';
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" /> );
