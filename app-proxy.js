import 'dotenv/config';  // only CRYPTO_API_KEY here
import axios from "axios";
import express from "express";
import   {CheerioApi}   from "cheerio";

// Default Class helpers
//// this moving to AppControl soon 
import {HashSeparateChaining} from './index/dataStructures/DataHashTables.js';

const app = express();
const PORT = process.env.PORT || 5000;

///////////////// VARS
// Crypto News
const articles = [];

// Fin API
const apiData = [];

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
console.log("articles"+ articles)


newsOutlets.forEach(news => {
  axios.get(news.address).then((response) => {
    const html = response.data;
    const $ = Cheerio.load(html)
  
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
  // }
                            //* News OUTPUT Needs: 1. Filter out Ethereum Class; 2. De-Duplicator 
/*
// 20220228001654
// http://localhost:5000/cryptonews 
[
  {
    "title": "Ethereum$2,620.10-3.32%",
    "url": "/price/ethereum/"
  },
  {
    "title": "Ethereum Classic$27.33-2.34%",
    "url": "/price/ethereum-classic/"
  },
  {
    "title": "Ethereum Gets an Upgraded Scaling Testnet – And It's Actually Years Ahead of Schedule",
    "url": "/tech/2022/02/24/ethereum-gets-an-upgraded-scaling-testnet-and-its-actually-years-ahead-of-schedule/"
  }, 
*/ 
// {
//   "access-control-allow-credentials": "true",
//   "access-control-allow-headers": "ver",
//   "access-control-allow-methods": "GET, POST",
//   "access-control-allow-origin": "*",
//   "connection": "keep-alive",
//   "content-length": "72225",
//   "content-type": "application/json",
//   "date": "Fri, 18 Feb 2022 07:02:40 GMT",
//   "server": "RapidAPI-1.2.8",
//   "x-rapidapi-region": "AWS - ap-southeast-1",
//   "x-rapidapi-version": "1.2.8"
// }

// "countries":222 items
// [100 items
// 0:{7 items
// "ci":"104"
// "cc":"AF"
// "cname":"Afghanistan"
// "country_name_translated":"Afghanistan"
// "country_international_phone_code":"+93"
// "flag_image_32x32":"https://i-invdn-com.investing.com/flags_32x32/circle/Afghanistan.png"
// "flag_image_32x32_flat":"https://i-invdn-com.investing.com/flags_32x32_ios/Afghanistan.png"
// }

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
 
// Data to return crypto resources
app.get("/api", (req, res) => {

  res.json(res.data)
});

let options = {
  method: 'GET',
  url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/get-meta-data',
  params: {locale_info: 'en_US', lang_ID: '1', time_utc_offset: '28800'},
  headers: {
    'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
    'x-rapidapi-key':  process.env.CRYPTO_API_KEY
  }
};
                // moving to   MOVE    to DataScrapers   ******
function scraper() {
  axios.request(options).then(function (response) {
  

    console.log(response.data);
 
  return response.data
    
  }).catch(function (error) {
    console.error(error);
  });
}
scraper()

let re = [1,2,3]
const newOne = [];
function pleiades(arr) {
let object = scraper();

  arr.forEach(data => {
console.log(data)
                   
 
});
}

///  ///// END Routes




/////////////////   Static index path /
app.use(express.static("index"));
app.listen(PORT, () =>
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);  
  }, 2500)
);
