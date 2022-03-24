
Background: Web-Scraping Results for news 

 Feature: News API karate test script

   Background:
     * url 'http://localhost:3000/'

   Scenario: get all posts and then get the first post by id
     Given path 'api/cryptonews'
     When method get
     Then status 200
     * def first = response[0]
     Given path 'api/posts', first.id
     When method get
     Then status 200

   Scenario: create a post and then get it by id
     * def post =
       """
     {
         "date": "May 22, 2021",
         "cat3": "Musing Blockchain",
         "post": " \n<p class=\"firstparagraph\">, \n<p class=\"quote\"><i>A Dogecoin (DOGE)-focused division of publicly traded over-the-counter software firm AppSwarm is looking to bring together global development teams to build off of the Dogecoin blockchain.<br /><br />\nDogeLabs — a newly launched division of AppSwarm’s blockchain research lab, TulsaLabs — announced Wednesday a new initiative calling on DevOps teams to unite their efforts in building a “sort of decentralized network” of DOGE developers across the globe.</i><sup>1</sup> \n</p>\n",
         "blogcite": "\n<p class=\"footnotes\">1. <a href=\"https://cointelegraph.com/news/appswarm-s-doge-division-calls-for-a-global-dev-teams-to-build-off-dogecoin\"   target=\"_blank\">https://cointelegraph.com/news/appswarm-s-doge-division-calls-for-a-global-dev-teams-to-build-off-dogecoin</a>\n</p>   ",
         "id": "2acb8e42-bef2-4626-8696-9db21aeca203",
         "author": "by Thomas Maestas, MA",
         "title": "Doge Days are Here Again, Part II: Overbuying",
         "did": "21-05-22"
     }
       """

     Given url 'http://localhost:8080/api/posts'
     And request post
     When method post
     Then status 201

     * def id = response.id
     * print 'created id is: ', id

     # Given path id
     # When method get
     # Then status 200
     # And match response contains post
  


* request = """



"""
WHEN POST

* response """
// 20220321163104
// http://localhost:3000/cryptonews

[
  {
    "title": "Ethereum$2,921.31+1.01%",
    "url": "https://www.coindesk.comundefined",
    "source": "coindesk"
  },
  {
    "title": "Ethereum Classic$38.59-0.13%",
    "url": "https://www.coindesk.comundefined",
    "source": "coindesk"
  },
  {
    "title": " Ethereum ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " Ethereum101 ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " ETH derivatives show pro traders are worried about Ethereum’s $2.5K support ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  }
]
" 
THEN



// 20220321163104
// http://localhost:3000/cryptonews

[
  {
    "title": "Ethereum$2,921.31+1.01%",
    "url": "https://www.coindesk.comundefined",
    "source": "coindesk"
  },
  {
    "title": "Ethereum Classic$38.59-0.13%",
    "url": "https://www.coindesk.comundefined",
    "source": "coindesk"
  },
  {
    "title": " Ethereum ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " Ethereum101 ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  },
  {
    "title": " ETH derivatives show pro traders are worried about Ethereum’s $2.5K support ",
    "url": "https://cointelegraph.comundefined",
    "source": "cointelegraph"
  }
]