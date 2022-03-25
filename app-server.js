import 'dotenv/config';  // only CRYPTO_API_KEY here
 
import {ApiWalker} from './index/dataServices/dataServices.js';
import {  getAllArticles, getTargetArticles, getMetaData, getCoinsData, getCalData} from "./app-proxy.js"

import express from "express"; 


const app = express();
const PORT = process.env.PORT || 3000;

let newsObj; 
/// // Imported from app-proxy's UI inputs 


////////////////////////////////////////////////
///////////// NEWS API /////////////////////////

// DataScraper to return json data on NEWS topics:   
app.get("/cryptonews", (req, res) => {
  console.log("/api/coins") 
  newsObj = getAllArticles() 
  
  // delete log when making unit tests
  console.log("/cryptonews using newsObj.tempArticles: ", newsObj.tempArticles)
  res.json(newsObj.tempArticles)
  });

 
 
  // TODO  ->  place calculations into app-proxy
app.get(`/cryptonews/:newsId`, (req, res) => {
  const newsId = req.params.newsId 

  // Pass in user's param (calculated by getTargetArticles)
  newsObj = getTargetArticles(newsId)
                                          // delete log after making unit tests
                                        console.log(" newsObj.targetArticles: ", newsObj.targetArticles)
  res.json(newsObj.targetArticles) 
}) 



////////////////////////////////////////////////
///// FIN API ////////////////////////////////// 
 
// Data to return crypto resources     // META DATA BY NATION
app.get("/api/nations", (req, res) => { 
      const finMeta = getMetaData("nations") 
      console.log("RUNNING /api/nations finMeta: ", finMeta);  

      res.json(finMeta)  
  });

  
 app.get("/api/coins", (req, res) => {    // COINS DATA
      const finCoins = getCoinsData()
      console.log(finCoins);
      // res.json(coins[0].screen_data[2].crypto_data) 
      res.json(finCoins)  
    });


// Calendar
app.get("/api/calendar", (req, res) => {    // CALENDAR/TIME
  const cal = getCalData()
      // let cal = response.data[0].screen_data.icoData.data
    res.json(cal)  
    }); 
  
   
/////////////////   Static index path /
app.use(express.static("index"));

app.listen(PORT, () => {
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);  
  }, 2500)
})

 