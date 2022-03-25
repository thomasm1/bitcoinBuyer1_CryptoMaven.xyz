import 'dotenv/config';  // only CRYPTO_API_KEY here
const API_KEY = process.env.CRYPTO_API_KEY 
const cryptoBaseUrl = "https://investing-cryptocurrency-markets.p.rapidapi.com/"

import {ApiWalker} from './index/dataServices/dataServices.js';

import axios from "axios";
import  CheerioApi   from "cheerio";

 

let options;
///////////////// Web Scraping VARS
// GLOBAL VARS     Crypto News
 const newsObj = {};   
          // later make a singleton for these 
          newsObj.tempArticles = newsObj.tempArticles || []; 
          // collect from UI initial keyword to search
          newsObj.tempKey = "Ethereum"
          newsObj.tempKeyArray = ["Ethereum","NFT", "Web3"]

          // collect from UI initial websites to scrape 
          newsObj.tempSites= newsObj.tempSites || [  // Go to these websites and scrape 
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

          newsObj.targetArticles = newsObj.targetArticles || [];

/// Methods for class
export function getAllArticles() {
  newsObj.tempSites.forEach(news => {
    axios.get(news.address).then((response) => {
  
      const html = response.data;
      const $ = CheerioApi.load(html)
    
      $(`a:contains(${newsObj.tempKeyArray[0]})`, html).each(function () {
        const title = $(this).text()
        const url = $(this).find('a').attr('href')
  
        newsObj.tempArticles.push({
          title, 
          url: news.baseUrl, 
          source: news.name
        })
      }) 
    })
  })
  return newsObj
}
 
export function getTargetArticles(newsId) { 
    const newsAddress = newsObj.tempSites.filter(news => news.name == newsId)[0].address
    const newsBase = newsObj.tempSites.filter(news => news.name == newsId)[0].baseUrl
  
    axios.get(newsAddress)
      .then(response => {
        const html = response.data
        const $ = CheerioApi.load(html) 
  
        $('a:contains("Ethereum")', html).each(function () {
          const title = $(this).text()
          const url = $(this).attr('href')
    
          newsObj.targetArticles.push({
            title, 
            url: newsBase+url, 
            source: newsId
          })
        })

        console.log("just got target", newsObj.targetArticles)  
      }).catch(err => console.log(err))

 return newsObj
}
   
///////////////// Web Scraping VARS
// GLOBAL VARS     Crypto News
  
const finObj = {}
finObj.newObjMappers = []
finObj.countriesMarket = []
finObj.allLangs = []
finObj.nations = [];
finObj.coins = [];
finObj.cal = [];

function getFinVars(paramOptions){
  // if coins 
if (paramOptions=='nations' ) return  {
  params: { 
    locale_info: 'en_US', 
    lang_ID: '1', 
    time_utc_offset: '28800'},
  path: 'get-meta-data'
};
if (paramOptions =='calendar')  return {
    params: {
      tabname: 'ongoing',
      lang_ID: '1',
      time_utc_offset: '28800',
      sort: 'related_days'
    },
    path:'get-ico-calendar'
}
if (paramOptions=='coinsList')  return {
 params: {
  edition_currency_id: '12',
  time_utc_offset: '28800',
  lang_ID: '1',
  sort: 'PERC1D_DN',
  page: '1'
 },
 path: 'coins/list'
}
if (paramOptions=='currenciesList' ) return {
  params: {
    lang_ID: '1', 
  time_utc_offset: '28800'
  }
} 
}

// // Data to return crypto resources   // META DATA
 
export function getMetaData(optString){ 
  
  const localVars = getFinVars(optString);

    options = { 
    method: 'GET',
    url: `${cryptoBaseUrl}${localVars.path}`,
    params: localVars.params,
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  API_KEY
    }
  }; 

    axios.request(options).then(response => {
      const apiWalker = new ApiWalker();
      finObj.nations = response.data

      for (let i = 0;i<finObj.nations.length;i++){ 
        apiWalker.newObjMappers.push({
          name:"tempMapper",
         nation: finObj.nations.countries[i]
        })   
      }       
    //                                const input =  "Albania"     /// REMOVE 
    // console.log("check Albania some objects from names");
    // console.log(apiWalker.getAll(nations.countries, input ));  
    // console.log("nations", nations)

    }).catch(function (error) {
      console.error(error);
    });  
    return finObj.nations
};


// // Data to return crypto resources   // COINS 
export function getCoinsData() { 
  const localVars = getFinVars("coinsList")  

    options = { 
    method: 'GET',
    url: `${cryptoBaseUrl}${localVars.path}`,
    params: localVars.params,
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  API_KEY
    }
  };  
  
      axios.request(options).then(response => {
        const apiWalker = new ApiWalker();
        finObj.coins = response.data
      // console.log(coins[0].screen_data.crypto_data); 

     for (let i = 0;i<finObj.coins.length;i++){ 
          apiWalker.newObjMappers.push({
            name:"tempMapper",
            coin: finObj.coins[0].screen_data.crypto_data[i]
          })   
        }      
                                // UNIT TEST
                              // res.json(coins[0].screen_data[2].crypto_data) 
                              console.log(finObj.coins);
      }).catch(function (error) {
        console.error(error);
      });  
      return finObj.coins
    }


// Calendar
export function getCalData() {    // ICO CALENDAR DATA 
  const localVars = getFinVars("calendar");

    options = { 
    method: 'GET',
    url: `${cryptoBaseUrl}${localVars.path}`,
    params: localVars.params,
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key':  API_KEY
    }
  };   
 
    axios.request(options).then(response => { 
      // finObj.cal = response.data[0].screen_data.icoData.data
      finObj.cal  = response.data
     
    }).catch(function (error) {
      console.error(error);
    }); 
    return finObj.cal
  };
  
 
 

/// API      localhost:5000/api/coins '
const response_coins = { 
  "data": [
    {
      "screen_ID": "83",
      "screen_data": {
        "next_page": 2,
        "crypto_data": [ 
          {
            "id": "672",
            "name": "ERC20",
            "country_id": "725",
            "pair_id": 1072082,
            "currency_symbol": "ERC20",
            "inst_price_usd": "0.0000440",
            "pair_change_arrow": "up_green",
            "change_percent_1d": "+190.88%",
            "pair_change_percent_numeric": "190.88",
            "change_percent_1d_color": "#3fc932",
            "change_percent_7d": "0.00%",
            "percent_change_7d_plain": "0.00",
            "change_percent_7d_color": "#c2c1c2",
            "cross_rates_name": "ERC20",
            "inst_price_btc": "0",
            "inst_market_cap": "&#x24;6.81M",
            "inst_market_cap_plain": "6813912",
            "volume_24h_usd": "&#x24;52.59K",
            "volume_24h_usd_plain": "52588",
            "total_volume_plain": "0.00",
            "total_volume": "0.00%",
            "flag_url": "https://i-invdn-com.investing.com/ico_flags/80x80/v32/erc-20.png",
            "logo_url": "https://i-invdn-com.investing.com/ico_flags/80x80/v32/erc-20.png"
          },
        ]
      }
    }
  ]
}

// http://localhost:5000/cryptoNews
const response_cryptoNews = 
[ 
  {
    "title": " Ethereum Classic up 75% in 8 days, but will ETH miners migrate after ETC ‘fifthening’? ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " Ethereum Classic up 75% in 8 days, but will ETH miners migrate after ETC ‘fifthening’? ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " Grayscale launches smart contract fund for Ethereum competitors   ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " ETH price hits $3K as major crypto fund adds over $110M Ethereum to Lido's staking pool ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  }
]

// http://localhost:5000/api/nations
const response_nations =  {
  "countries": [
    {
      "ci": "104",
      "cc": "AF",
      "cname": "Afghanistan",
      "country_name_translated": "Afghanistan",
      "country_international_phone_code": "+93",
      "flag_image_32x32": "https://i-invdn-com.investing.com/flags_32x32/circle/Afghanistan.png",
      "flag_image_32x32_flat": "https://i-invdn-com.investing.com/flags_32x32_ios/Afghanistan.png"
    }
  ]
}