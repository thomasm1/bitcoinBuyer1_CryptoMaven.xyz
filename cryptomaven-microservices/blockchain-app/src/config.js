"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CITATION_OPTIONS = exports.styles = exports.JWT_TOKEN = exports.PORT_EVENT_BUS = exports.BUS_HOST = exports.BLOCKCHAIN_PORT = exports.BLOCKCHAIN_HOST = exports.API_BASE_URL = void 0;
// STRINGS
exports.API_BASE_URL = "http://localhost:8083/api";
exports.BLOCKCHAIN_HOST = "localhost"; //"http://blockchain-clusterip-srv:9009"; 
exports.BLOCKCHAIN_PORT = "3001"; //"http://blockchain-clusterip-srv:9009"; 
exports.BUS_HOST = "localhost"; //"http://event-bus-srv:9009"; 
exports.PORT_EVENT_BUS = "8083"; //"http://event-bus-srv:9009";  
exports.JWT_TOKEN = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0dEBnbWFpbC5jb20iLCJpYXQiOjE3NDIzNDQ1MTcsImV4cCI6MTc0Mjk0OTMxN30._id34kpGi0O-jWDLh7zhf4M8l69qbntZtGHjIgaW47H1GLkfHnkErlofYTyT2DKC";
// OBJECTS
exports.styles = {
    small: {
        color: "#48a0ff",
        fontSize: "0.8em",
    },
    li: {
        color: "blue",
    },
    h1: {
        color: "darkblue",
        fontFamily: "Monoton Sans-serif",
        fontSize: "1.2em"
    },
    h6: {
        color: "darkblue",
        fontFamily: "Monoton Sans-serif",
        fontSize: "1.2em"
    },
    ul: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    }
};
exports.CITATION_OPTIONS = [
    "Musing Blockchain",
    "Sociology Now!",
    "A.I.Now.AI",
    "Quantum Data",
    "WebDev Affairs",
];
