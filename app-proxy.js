import 'dotenv/config';  // only CRYPTO_API_KEY here
import axios from "axios";
import express from "express";
import   Cheerio   from "cheerio";

 

///////////////// VARS

const app = express();
const PORT = process.env.PORT || 5000;
const articles = [];
console.log(process.env)


/////////////////   Static index path /
app.use(express.static("index"));
app.listen(PORT, () =>
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);  
  }, 2500)
);


/////////////// Dynamic Paths

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



// DataScraper to return json data on NEWS topics:    MOVE    to DataScrapers   ******
app.get("/cryptonews", (req, res) => {
  axios.get("https://www.coindesk.com/tech/").then((response) => {
    const html = response.data;
    // console.log(html);
        const $ = Cheerio.load(html)

        $('a:contains("Ethereum")', html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,url
            })
            
        })
        res.json(articles)
    }).catch((err) => console.log(err));
});

//* News OUTPUT Needs a dDE Duplicator

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
  {
    "title": "Ethereum Gets an Upgraded Scaling Testnet – And It's Actually Years Ahead of Schedule",
    "url": "/tech/2022/02/24/ethereum-gets-an-upgraded-scaling-testnet-and-its-actually-years-ahead-of-schedule/"
  },
  {
    "title": "Ethereum Gets an Upgraded Scaling Testnet – And It's Actually Years Ahead of Schedule",
    "url": "/tech/2022/02/24/ethereum-gets-an-upgraded-scaling-testnet-and-its-actually-years-ahead-of-schedule/"
  }
]
*/ 