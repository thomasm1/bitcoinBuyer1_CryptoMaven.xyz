import 'dotenv/config';  // only CRYPTO_API_KEY here
import axios from "axios";

import express from "express";
import   Cheerio   from "cheerio";

// Default Prototypes
import {apiWalker} from './index/dataServices/dataServices.js';

// Default Class helpers 
import {HashSeparateChaining} from './index/dataStructures/DataHashTables.js';
import { local } from 'd3-selection';

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
  function hash(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }
   // TEMPORARY PLACEMENT OF PLEIADES  
/// De-duplicator based on class-based, Large Prime-HashMap, with O(1) Speed, pump. 
const newClassDupe = new HashSeparateChaining( articles.length *20); 
const e = newClassDupe._hash(articles.length);
console.log(e.toString())
 console.log("length"+ articles)

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
 ////////////////////////////////////////////////////////////////////////////////
 

 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////


      //////////////////////////////////////////////////////////////////////
//  VARS
      //////////////////////////////////////////////////////////////////////

const apiSchema = {
  countries: [  // Go to these websites and scrape for keyword 
{
"ci": "95",
"cc": "AL",
"cname": "Albania",
"country_name_translated": "Albania",
"country_international_phone_code": "+355",
"flag_image_32x32": "https://i-invdn-com.investing.com/flags_32x32/circle/Albania.png",
"flag_image_32x32_flat": "https://i-invdn-com.investing.com/flags_32x32_ios/Albania.png"
}
],
countries_popular: '5,4,22,17,35,25',
ipo_countries: [
  206,  29,  25,  54, 145,  47,  34,   8, 174, 163,  32,  70,
    6, 232,  27,  37, 122,  15,  78, 113, 107,  55,  24, 121,
    59,  89,  72,  71,  22,  17, 147,  51,  39,  93, 106,  14,
    48,  66,  33,  23,  10, 119,  35,  92, 102,  57,  94,  97,
    68, 190,  96, 103, 111,  42, 109, 188,   7, 115, 139, 247,
  105, 172,  21,  43,  20,  60,  87,  44, 193, 125,  45,  53,
    38, 170, 100,  56,  80,  52, 238,  36,  90, 112, 110,  11,
    26, 162,   9,  12,  46,  85,  41, 202,  63, 123,  61, 143,
    4,   5, 138, 178
],
 
default_ipo_countries: [ 5, 4, 6 ],
countries_market: '5,4,22,17,35,25,29,32,6,27,122,15,119,7,125,138,54,34,174,70,113,107,55,24,89,72,71,51,93,106,33,10,97,96,103,109,247,21,60,53,38,100,56,238,90,112,26,9,12,63,61,47,37,39,14,48,102,42,43,44,45,36,11,162,46,41,178,145,59,66,23,92,94,68,87,193,170,52,143,163,78,57,111,188,105,172,20,80,110,85,202,123,84,75',
market_default_country: {
  flag_image_32x32: 'https://i-invdn-com.investing.com/flags_32x32/circle/United_States.png',
  flag_image_32x32_flat: 'https://i-invdn-com.investing.com/flags_32x32_ios/United_States.png',
  country_ID: 5,
  flag: 'USA'
},
edition_currency_id: 12,
edition_currency_short_name: 'USD',
all_langs: [
  {
    iso_639_lang_code: 'en',
    lang_dir: 'ltr',
    lang_ID: 1,
    lang_foreign: 'English',
    ci: '5',
    is_currency_onright: false
  }]
}

// Data to return crypto resources
app.get("/api", (req, res) => { 

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
    axios.request(options).then(response => {
      const a = new apiWalker();
    const d = response.data
    let newObjMappers 
    let countries_market 
    let all_langs 
      for (let i = 0;i<d.length;i++){
   
        newObjMappers.push({
         i: d.countries[i]
        })    // mapper for caching later
        countries_market.push({
          i: d.countries_market[i]  // for quick-lookup by index
        })
        all_langs.push({
          i:d.all_langs[i]
        })

      
      }
      

  console.log(newObjMappers)
  console.log(countries_market)
  console.log(all_langs)
                                              // for next Method GET     console.log( a.local(d.countries, input ))
    const input =  "Afghanistan"
    console.log("grab some objects from names");
    console.log( a.local(d.countries, input ));

     
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
});
