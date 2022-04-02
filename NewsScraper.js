
export class NewsScraper  { 
    /// Class : NEWS SCRAPER: 
    // - this will take 3 input articles; 
    // articles are classified by category
    // category and breadth-first search for more news on category & direction. 
    // 
    
      constructor(newsObj) {
      // Creating Singleton values & default values if no args passedOka
    this.newsObj = this.newsObj || {}; 
    
    // later make a singleton for these
    this.newsObj.tempArticles =  this.newsObj.tempArticles || [];
    // collect from UI initial keyword to search
    this.newsObj.tempKey = this.newsObj.tempKey || "Ethereum";
    this.newsObj.tempKeyArray =  this.newsObj.tempKeyArray ||  ["Ethereum", "NFT", "Web3"];
    
    // collect from UI initial websites to scrape
    this.newsObj.tempSites =  this.newsObj.tempSites || [
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
    this.newsObj.targetArticles =  this.newsObj.targetArticles || [];
    
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

        this.newsObj.tempArticles.push({
          title,
          url: news.baseUrl,
          source: news.name,
        });
      });
    });
  });
  return this.newsObj;
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

}
    