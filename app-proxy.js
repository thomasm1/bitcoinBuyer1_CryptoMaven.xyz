import 'dotenv/config';  // only CRYPTO_API_KEY here
import axios from "axios";
import express from "express";
import   Cheerio   from "cheerio";

// this moving to AppControl soon
import {HashSeparateChaining} from './dataStructures/dataHashTablesProto.js';
 
const app = express();
const PORT = process.env.PORT || 5000;

///////////////// VARS
// Crypto News
const articles = [];

const newsOutlets = [ 
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
  DeDupeArticles(articles)
  res.json(articles) 
});

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
 // TEMPORARY PLACEMENT OF PLEIADES II
/// De-duplicator based on class-based, Large Prime-HashMap, with O(1) Speed, pump. 
class DeDupeArticlesHash {
  constructor(size) {
    this.keyMap  = new Array(size);
  } 

};

app.get("/cryptonews/:newsId", (req, res) => {
  const newsId = req.params.newsId
  const newsAddress = newsOutlets.filter(news => news.name == newsId)[0].address
  const newsBase = newsOutlets.filter(news => news.name == newsId)[0].baseUrl

  axios.get(newsAddress)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
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
  res.json("welcome to CryptoMaven");
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
axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});




///  ///// END Routes




/////////////////   Static index path /
app.use(express.static("index"));
app.listen(PORT, () =>
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);  
  }, 2500)
);
