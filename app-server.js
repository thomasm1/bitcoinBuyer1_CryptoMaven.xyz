import 'dotenv/config';  // only CRYPTO_API_KEY here

import axios from "axios";
import {ApiWalker} from './index/dataServices/dataServices.js';

import express from "express";
import   CheerioApi   from "cheerio";


const app = express();
const PORT = process.env.PORT || 3000;

///////////////// Web Scraping VARS // Imported from app-proxy's UI inputs
import {newsObj, getArticles, getSpecificArticles} from "./app-proxy.js"
 

// Just serve
// DataScraper to return json data on NEWS topics:   
app.get("/cryptonews", (req, res) => { 
  getArticles()
  console.log("/cryptonews using newsObj.tempArticles: ", newsObj.tempArticles)
  res.json(newsObj.tempArticles)
  });

  



let newsId = "newsId"
  // TODO  ->  place calculations into app-proxy
app.get(`/cryptonews/:${newsId}`, (req, res) => {
  getSpecificArticles()
  console.log("/cryptonews using newsObj.targetArticles: ", newsObj.targetArticles)
 
  // console.log("/cryptonews/:newsId");
  // const newsId = req.params.newsId
  // const newsAddress = newsOutlets.filter(news => news.name == newsId)[0].address
  // const newsBase = newsOutlets.filter(news => news.name == newsId)[0].baseUrl
  res.json(newsObj.targetArticles)
 

}) 
 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////
/// GLOBAL   VARS

const newObjMappers = []
const countriesMarket = []
const allLangs = []
 
//////////////////////////////////////////////////////////////////////
let nations = [];
let coins = [];

function getParams(paramOptions){
  // if coins 
if (paramOptions=='nations' ) return  {
  locale_info: 'en_US', 
  lang_ID: '1', 
  time_utc_offset: '28800'
};
if (paramOptions =='calendar')  return {
  tabname: 'ongoing',
  lang_ID: '1',
  time_utc_offset: '28800',
  sort: 'related_days'
}
if (paramOptions=='coinsList')  return {
  edition_currency_id: '12',
  time_utc_offset: '28800',
  lang_ID: '1',
  sort: 'PERC1D_DN',
  page: '1'
}
if (paramOptions=='currenciesList' ) return {
  lang_ID: '1', 
  time_utc_offset: '28800'
}

}

// Data to return crypto resources
app.get("/api/nations", (req, res) => {    // META DATA
  let thisPath = "get-meta-data"                       // REMOVE!
  let thisParam = 'nations';
  console.log("/api/nations"); 
  let options = { 
    method: 'GET',
    url: `https://investing-cryptocurrency-markets.p.rapidapi.com/${thisPath}`,
    params: getParams(thisParam),
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  process.env.CRYPTO_API_KEY
    }
  }; 
    axios.request(options).then(response => {
      const apiWalker = new ApiWalker();
      nations = response.data
console.log(nations);
      for (let i = 0;i<nations.length;i++){ 
        apiWalker.newObjMappers.push({
          name:"tempMapper",
         nation: nations.countries[i]
        })   
      }       const input =  "Albania"     /// REMOVE 
    console.log("check Albania some objects from names");
    console.log(apiWalker.getAll(nations.countries, input )); 
    res.json(nations) 
    }).catch(function (error) {
      console.error(error);
    }); 
  });


  app.get("/api/coins", (req, res) => {    // META DATA
    const thisPath = "coins/list"                       // REMOVE!
    const thisParam = 'coinsList';
    let options = { 
      method: 'GET',
      url: `https://investing-cryptocurrency-markets.p.rapidapi.com/${thisPath}`,
      params: getParams(thisParam),
      headers: {
        'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
        'x-rapidapi-key':  process.env.CRYPTO_API_KEY
      }
    }; 
      axios.request(options).then(response => {
        const apiWalker = new ApiWalker();
        coins = response.data
  // console.log(coins[0].screen_data.crypto_data);
  console.log(coins);
        for (let i = 0;i<coins.length;i++){ 
          apiWalker.newObjMappers.push({
            name:"tempMapper",
            coin: coins[0].screen_data.crypto_data[i]
          })   
        }      
     
      // res.json(coins[0].screen_data[2].crypto_data) 
      res.json(coins) 
      }).catch(function (error) {
        console.error(error);
      }); 
    });

// Calendar
app.get("/api/calendar", (req, res) => {    // META DATA
  const thisPath = "get-ico-calendar"                       // REMOVE!
  const thisParam = 'calendar'; 
  let options = { 
    method: 'GET',
    url: `https://investing-cryptocurrency-markets.p.rapidapi.com/${thisPath}`,
    params: getParams(thisParam),
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  process.env.CRYPTO_API_KEY
    }
  }; 
    axios.request(options).then(response => { 
      let cal = response.data[0].screen_data.icoData.data
    res.json(cal) 
    }).catch(function (error) {
      console.error(error);
    }); 
  });
  
   
/////////////////   Static index path /
app.use(express.static("index"));

app.listen(PORT, () => {
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);  
  }, 2500)
})

 