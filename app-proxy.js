import 'dotenv/config';  // only CRYPTO_API_KEY here
import axios from "axios";

import express from "express";
import   CheerioApi   from "cheerio";

// Default Prototypes
import {ApiWalker} from './index/dataServices/dataServices.js';

// Default Class helpers 
import {HashSeparateChaining} from './index/dataStructures/DataHashTables.js';
 

const app = express();
const PORT = process.env.PORT || 5000;

///////////////// VARS
// Crypto News
const articles = [];


const newsOutlets = [  // Go to these websites and scrape for keyword 
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

//  
  newsOutlets.forEach(news => {
  axios.get(news.address).then((response) => {
    const html = response.data;
    const $ = CheerioApi.load(html)
  
    $('a:contains("Ethereum")', html).each(function () {
      const title = $(this).text()
      const url = $(this).attr('href')

      articles.push({
        title, 
        url: news.baseUrl+url, 
        source: news.name
      })
    })
 

  })
})
 
// DataScraper to return json data on NEWS topics:    MOVE    to DataScrapers   ******
app.get("/cryptonews", (req, res) => { 
  res.json(articles)
  });

  
app.get("/cryptonews/:newsId", (req, res) => {
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
 

 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////
/// GLOBAL   VARS
//////////////////////////////////////////////////////////////////////
const newObjMappers = []
const countriesMarket = []
const allLangs = []

const meta = 'get-meta-data';
const list = 'list';
const pairs = 'list-pairs'
const headers = headers 
switch(x) {
case 0:
console.log("0: "+"get-meta-data");

case 1:
console.log("1");

case 2:
console.log("2"+"coins/list");

case 2:
console.log("3"+"coins/list-pairs");

case 3:
console.log("4"+"get-overview"
headers =  {
  'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
  'x-rapidapi-key': '57bfc2747fmshb53b12354ec93fdp18a6dcjsn6f2efa89fa36'
}
}

// Data to return crypto resources
app.get("/api", (req, res) => {    // META DATA

  let options = {

    method: 'GET',
    url: `https://investing-cryptocurrency-markets.p.rapidapi.com/${path}`,
    params: {locale_info: 'en_US', lang_ID: '1', time_utc_offset: '28800'},
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  process.env.CRYPTO_API_KEY
    }
  };
 
    axios.request(options).then(response => {
      const apiWalker = new ApiWalker();
    const d = response.data
console.log(d);
      for (let i = 0;i<d.length;i++){
   
        newObjMappers.push({
          name:"tempMapper",
         i: d.countries[i]
        })    // mapper for caching later
        countriesMarket.push({
          i: d.countriesMarket[i]  // for quick-lookup by index
        })
        allLangs.push({
          i:d.allLangs[i]
        }) 
      } 
 
                                              // for next Method GET     console.log( a.local(d.countries, input ))
    const input =  "Afghanistan"
    console.log("grab some objects from names");
    console.log(apiWalker.nonLocal(d.countries, input ));
     
    res.json(d) 
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

 