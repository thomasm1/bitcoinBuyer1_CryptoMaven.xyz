"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
var App_1 = require("./App");
var reportWebVitals_1 = require("./reportWebVitals");
require("./index.css");
var container = document.getElementById('root');
var root = (0, client_1.createRoot)(container);
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.store}>
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
