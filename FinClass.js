 
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
}
  