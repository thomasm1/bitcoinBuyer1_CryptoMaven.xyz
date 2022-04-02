import "dotenv/config"; // only CRYPTO_API_KEY here

import { ApiWalker } from "./index/dataServices/dataServices.js";

import axios from "axios";
import CheerioApi from "cheerio";

///////////////// Web Scraping VARS
// GLOBAL VARS     Crypto News


export class NewsScraper { 
/// Class : NEWS SCRAPER: 
// - this will take 3 input articles; 
// articles are classified by category
// category and breadth-first search for more news on category & direction. 
// 

constructor(newsObj) {
  // Creating Singleton values & default values if no args passedOka
this.newsObj = newsObj || {};
news = this.newsObj

// later make a singleton for these
news.tempArticles = news.tempArticles || [];
// collect from UI initial keyword to search
news.tempKey = news.tempKey || "Ethereum";
news.tempKeyArray = news.tempKeyArray ||  ["Ethereum", "NFT", "Web3"];

// collect from UI initial websites to scrape
news.tempSites = news.tempSites || [
  // Go to these websites and scrape  keyword
  {
    name: "cointelegraph",
    address: "https://cointelegraph.com/",
    baseUrl: "https://cointelegraph.com",
  },
  {
    name: "coindesk",
    address: "https://www.coindesk.com/tech/",
    baseUrl: "https://www.coindesk.com",
  },
]; 
newsObj.targetArticles = newsObj.targetArticles || [];

}

/// Methods for class
  getAllArticles() {
  newsObj.tempSites.forEach((news) => {
    axios.get(news.address).then((response) => {
      const html = response.data;
      const $ = CheerioApi.load(html);

      $(`a:contains(${newsObj.tempKeyArray[0]})`, html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");

        newsObj.tempArticles.push({
          title,
          url: news.baseUrl,
          source: news.name,
        });
      });
    });
  });
  return newsObj;
}
  getTargetArticles(newsId) {
  const newsAddress = newsObj.tempSites.filter((news) => news.name == newsId)[0]
    .address;
  const newsBase = newsObj.tempSites.filter((news) => news.name == newsId)[0]
    .baseUrl;

  axios
    .get(newsAddress)
    .then((response) => {
      const html = response.data;
      const $ = CheerioApi.load(html);

      $('a:contains("Ethereum")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        newsObj.targetArticles.push({
          title,
          url: newsBase + url,
          source: newsId,
        });
      });

      console.log("just got target", newsObj.targetArticles);
    })
    .catch((err) => console.log(err));

  return newsObj;
}

} // END News Scraper Class

///////////////// Web Scraping VARS
// GLOBAL VARS     Crypto News

export class FinClass {
  constructor(finObj) {
    this.API_KEY = process.env.CRYPTO_API_KEY;
    this.cryptoBaseUrl =
      "https://investing-cryptocurrency-markets.p.rapidapi.com/";

    this.finObj = finObj || {};

    this.finObj.newObjMappers = [];
    this.finObj.countriesMarket = [];
    this.finObj.allLangs = [];
    this.finObj.nations = [];
    this.finObj.coins = [];
    this.finObj.cal = [];
  }

  getFinVars(paramOptions) {
    // if coins
    if (paramOptions == "nations")
      return {
        params: {
          locale_info: "en_US",
          lang_ID: "1",
          time_utc_offset: "28800",
        },
        path: "get-meta-data",
      };
    if (paramOptions == "calendar")
      return {
        params: {
          tabname: "ongoing",
          lang_ID: "1",
          time_utc_offset: "28800",
          sort: "related_days",
        },
        path: "get-ico-calendar",
      };
    if (paramOptions == "coinsList")
      return {
        params: {
          edition_currency_id: "12",
          time_utc_offset: "28800",
          lang_ID: "1",
          sort: "PERC1D_DN",
          page: "1",
        },
        path: "coins/list",
      };
    if (paramOptions == "currenciesList")
      return {
        params: {
          lang_ID: "1",
          time_utc_offset: "28800",
        },
      };
  }

  // // Data to return crypto resources   // META DATA

  getMetaData(optString) {
    const localVars = this.getFinVars(optString);

    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY,
      },
      url: `${this.cryptoBaseUrl}${localVars.path}`,
      params: localVars.params,
    };

    axios
      .request(this.options)
      .then((response) => {
        const apiWalker = new ApiWalker();
        this.finObj.nations = response.data;

        for (let i = 0; i < this.finObj.nations.length; i++) {
          apiWalker.newObjMappers.push({
            name: "tempMapper",
            nation: this.finObj.nations.countries[i],
          });
        }
        //                                const input =  "Albania"     /// REMOVE
        // console.log("check Albania some objects from names");
        // console.log(apiWalker.getAll(nations.countries, input ));
        // console.log("nations", nations)
      })
      .catch(function (error) {
        console.error(error);
      });
    return this.finObj.nations;
  }

  // // Data to return crypto resources   // COINS
  getCoinsData() {
    const localVars = this.getFinVars("coinsList");

    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY,
      },
      url: `${this.cryptoBaseUrl}${localVars.path}`,
      params: localVars.params,
    };

    axios
      .request(this.options)
      .then((response) => {
        const apiWalker = new ApiWalker();
        this.finObj.coins = response.data;
        // console.log(coins[0].screen_data.crypto_data);

        for (let i = 0; i < this.finObj.coins.length; i++) {
          apiWalker.newObjMappers.push({
            name: "tempMapper",
            coin: this.finObj.coins[0].screen_data.crypto_data[i],
          });
        }
        // UNIT TEST
        // res.json(coins[0].screen_data[2].crypto_data)
        console.log(this.finObj.coins);
      })
      .catch(function (error) {
        console.error(error);
      });
    return this.finObj.coins;
  }

  // Calendar
  getCalData() {
    // ICO CALENDAR DATA
    const localVars = this.getFinVars("calendar");

    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY,
      },
      url: `${this.cryptoBaseUrl}${localVars.path}`,
      params: localVars.params,
    };

    axios
      .request(this.options)
      .then((response) => {
        // finObj.cal = response.data[0].screen_data.icoData.data
        this.finObj.cal = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    return this.finObj.cal;
  }
}

const n = new NewsScraper();
const articles = n.getAllArticles();

const targetedByUser = n.getTargetArticles();
// const t = n.
const fn = new FinClass();