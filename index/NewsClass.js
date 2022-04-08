import "dotenv/config"; // only CRYPTO_API_KEY here
import CheerioApi from "cheerio";
import axios from "axios";

/// Methods for class
export class NewsScraper {

     constructor(newsObj) {
      this.API_KEY = process.env.NEWS_API_KEY;
      this.API_KEY = process.env.NYTTECH_API_KEY;
      this.cryptoBaseUrl =
      "";

       ///////////////// Web Scraping VARS
// GLOBAL VARS     Crypto News
this.newsObj = this.newsObj || {};
// later make a singleton for these
this.newsObj.tempArticles = this.newsObj.tempArticles || [];
// collect from UI initial keyword to search
this.newsObj.tempKey = this.newsObj.tempKey  || "Ethereum";
this.newsObj.tempKeyArray = this.newsObj.tempKeyArray || ["Ethereum", "NFT", "Web3"];

// collect from UI initial websites to scrape
this.newsObj.tempSites = this.newsObj.tempSites  || [
  // Go to these websites and scrape
  //for keyword
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
  {
    name: "coinbase",
    address: "https://coinbase.com/price/",
    baseUrl: "https://coinbase.com",
  },
  {
    name: "thesun",
    address: "https://www.the-sun.com/money/",
    baseUrl: "https://www.the-sun.com",
  },
]; 
this.newsObj.targetArticles = this.newsObj.targetArticles || [];

     }

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
     newsId = newsId || "cointelegraph";
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
 
 ///////////////// Web Scraping VARS
 // GLOBAL VARS     Crypto News
 } 