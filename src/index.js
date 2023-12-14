import React from 'react';
import { createRoot } from 'react-dom/client' 
import  './index.css'; 
import App from './App.js';  
import "./index.css";
// import web3 from './web3.js';

const container = document.getElementById('rootX');
const root = createRoot(container);
root.render(<App tab="home" /> );
 