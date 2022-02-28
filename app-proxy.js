import axios from "axios";
import express from "express";
import   Cheerio   from "cheerio";

const app = express();
const PORT = process.env.PORT || 5000;

// global vars 
const articles = [];

app.use(express.static("index"));

app.get("/api", (req, res) => {
  res.json("welcome to CryptoMaven");
});

// DataScraper to return json data on topics:    MOVE    to DataScrapers   ******
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

app.listen(PORT, () =>
  setTimeout( () => {
    console.log(` ... serving on Port ${PORT}`);
  }, 3500)
);
