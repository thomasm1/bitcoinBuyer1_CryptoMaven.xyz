import 'dotenv/config';  // only CRYPTO_API_KEY here

import axios from "axios";
import {ApiWalker} from './index/dataServices/dataServices.js';

import express from "express";
import   CheerioApi   from "cheerio";


const app = express();
const PORT = process.env.PORT || 5000;

///////////////// Web Scraping VARS
// Crypto News
export const newsObj = {};
newsObj.tempArticles = newsObj.tempArticles || [];

// collect from UI initial keyword to search
newsObj.tempKey = "Ethereum"
newsObj.tempKeyArray = ["Ethereum","NFT", "Web3"]

// collect from UI initial websites to scrape 
newsObj.tempSites= [  // Go to these websites and scrape 
//for keyword 
  {
    name: 'cointelegraph',
    address: 'https://cointelegraph.com/',
    baseUrl: 'https://cointelegraph.com'
  },
  {
    name: 'coindesk',
    address: 'https://www.coindesk.com/tech/',
    baseUrl:'https://www.coindesk.com'
  },
] 
newsObj.targetArticles = [];
//  
export function getArticles() {
  newsObj.tempSites.forEach(news => {
    axios.get(news.address).then((response) => {
  
      const html = response.data;
      const $ = CheerioApi.load(html)
    
      $(`a:contains(${newsObj.tempKeyArray[0]})`, html).each(function () {
        const title = $(this).text()
        const url = $(this).find('a').attr('href')
  
        newsObj.tempArticles.push({
          title, 
          url: news.baseUrl+url, 
          source: news.name
        })
      })
    
    })
  })
  return newsObj
}


export function getSpecificArticles() {
  app.get("/cryptonews/:newsId", (req, res) => {
    console.log("/cryptonews/:newsId");
    const newsId = req.params.newsId
    const newsAddress = newsOutlets.filter(news => news.name == newsId)[0].address
    const newsBase = newsOutlets.filter(news => news.name == newsId)[0].baseUrl
   
    axios.get(newsAddress)
      .then(response => {
        const html = response.data
        const $ = CheerioApi.load(html)

  
        $('a:contains("Ethereum")', html).each(function () {
          const title = $(this).text()
          const url = $(this).attr('href')
    
          newsObj.targetArticles.push({
            title, 
            url: news.baseUrl+url, 
            source: newsId
          })
        })
        console.log("just got target", newsObj.targetArticles)
        
        return newsObj.targetArticles
      }).catch(err => console.log(err))
  
  }) 
}
  
app.get("/cryptonews/:newsId", (req, res) => {
  console.log("/cryptonews/:newsId");
  const newsId = req.params.newsId
  const newsAddress = newsOutlets.filter(news => news.name == newsId)[0].address
  const newsBase = newsOutlets.filter(news => news.name == newsId)[0].baseUrl
 
  axios.get(newsAddress)
    .then(response => {
      const html = response.data
      const $ = CheerioApi.load(html)
      const targetArticles = []

      $('a:contains("Ethereum")', html).each(function () {
        const title = $(this).text()
        const url = $(this).attr('href')
  
        targetArticles.push({
          title, 
          url: news.baseUrl+url, 
          source: newsId
        })
      })
      res.json(targetArticles)
    }).catch(err => console.log(err))

}) 
 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////
/// GLOBAL   VARS
const API_KEY = process.env.CRYPTO_API_KEY 
 
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
      'x-rapidapi-key':  API_KEY
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
        'x-rapidapi-key':  API_KEY
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
      'x-rapidapi-key':  API_KEY
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

 