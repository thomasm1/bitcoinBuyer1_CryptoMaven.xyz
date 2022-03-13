import { localResponse } from "../../functionalTest/src/test/java/resources/databrief.js";



  // Financial API

  export class ApiLister {
    constructor(apiArray, apiObj) {
      this.apiArray = apiArray || [];
      ///
      this.newsOutlets = this.newsOutlets || [];
      this.apiObj = apiObj || {};
    }
    // Metadata API
    getLocalAll() {
      for (let i = 0; i < localResponse.countries.length; i++) {
        this.apiObj = localResponse.countries[i];
  
        this.apiArray.push(this.apiObj);
      }
      return this.apiObj;
    }
  }

export class ApiWalker {
  constructor(apiArray, apiObj) {
    this.apiArray = apiArray || [];
    ///
    this.newsOutlets = this.newsOutlets || [];
    this.apiObj = apiObj || {};
  }
  // Metadata API
  getLocalAll() {
    for (let i = 0; i < localResponse.countries.length; i++) {
      this.apiObj = localResponse.countries[i];

      this.apiArray.push(this.apiObj);
    }
    return this.apiObj;
  }

  getAll(countriesArrays, strNation) {
    for (let i = 0; i < countriesArrays.length; i++) {
      if (countriesArrays[i].country_name_translated == strNation) {
        this.apiObj = countriesArrays[i];
        this.apiArray.push(this.apiObj);
      } else {
        this.apiArray.push("..mmh, check spelling?");
      }
    }
    return this.apiObj;
  }

  filterUser(array, strNationName) {
    strNationName = strNationName || "Albania";
    array.forEach();
    console.log("articles");

    const alb_name = localResponse.countries[2].country_name_translated;
    console.log("alb_name: " + alb_name);
  }
}

const input = "Algeria";
let a = new ApiWalker();
console.log(a.getAll(input));

console.log(a.getLocalAll());
