import "dotenv/config"; // only CRYPTO_API_KEY here

import { getAllArticles, getTargetArticles } from "./NewsScraper.js";
 import {FinClass} from "./FinClass.js"

import express from "express";

// import
const app = express();
const PORT = process.env.PORT || 3000;

let newsObj = {};  
/// // Imported from app-proxy's UI inputs

////////////////////////////////////////////////
///////////// NEWS API ///////////////////////// 

// DataScraper to return json data on NEWS topics:
app.get("/cryptonews", (req, res) => {
  console.log("/cryptonews");
  newsObj = getAllArticles();

  // delete log when making unit tests
  console.log("/cryptonews using newsObj.tempArticles: ", newsObj.tempArticles);
  res.json(newsObj.tempArticles);
});

// TODO  ->  place calculations into app-proxy
app.get(`/cryptonews/:newsId`, (req, res) => {
  const newsId = req.params.newsId;

  // Pass in user's param (calculated by getTargetArticles)
  newsObj = getTargetArticles(newsId);
  // delete log after making unit tests
  console.log(" newsObj.targetArticles: ", newsObj.targetArticles);
  res.json(newsObj.targetArticles);
});

//////////////////////////////////////p/////////
///// FIN API //////////////////////////////////

const finClass = new FinClass(); // one singleton per session

// Data to return crypto resources     // META DATA BY NATION
app.get("/api/countries", (req, res) => {
  const finMeta = finClass.getMetaData("countries");
  console.log("RUNNING /api/countries finMeta: ", finMeta);

  res.json(finMeta);
});

app.get("/api/coins", (req, res) => {
  // COINS DATA
  const finCoins = finClass.getCoinsData();
  console.log(finCoins);
  // res.json(coins[0].screen_data[2].crypto_data)
  res.json(finCoins);
});

// Calendar
app.get("/api/calendar", (req, res) => {
  // CALENDAR/TIME
  const cal = finClass.getCalData();
  // let cal = response.data.screen_data.icoData.data
  // let cal = response.data.screen_data.icoData.categories
  res.json(cal);
});

// app.get("/api/local", (req, res) => {
//   // CALENDAR/TIME
//   ;
//   // let cal = response.data.screen_data.icoData.data
//   // let cal = response.data.screen_data.icoData.categories
//   res.json(cal);
// });
/////////////////   Static index path / // will put REACT build There; 
app.use(express.static("index"));

app.listen(PORT, () => {
  setTimeout(() => {
    console.log(` ... serving on Port ${PORT}`);
  }, 2500);
});
