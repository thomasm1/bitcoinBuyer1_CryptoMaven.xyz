import "dotenv/config"; // AWS_API_KEY

import axios from "axios";
 

// GLOBAL VARS     Crypto Blog
 
export class BlogClass {
    constructor(blogObj = {}) {
      this.blogObj = blogObj 
      this.API_KEY = process.env.AWS_API_KEY;
      this.dailytechBaseUrl =  "https://z3noflrq9b.execute-api.us-east-1.amazonaws.com";
 
    }
   
    // // Data to return crypto Blog   // Blog
    getBlogData() {
     const localVars = {} 
     localVars.path = '/dev/posts' 
  
      this.options = {
        method: "GET",
        // headers: {
        // //   "x-rapidapi-host": "https://z3noflrq9b.execute-api.us-east-1.amazonaws.com",
        // //   "x-rapidapi-key": this.API_KEY,
        // },
        url: `${this.dailytechBaseUrl}${localVars.path}`,
        // params: localVars.params,
      };
  
      axios
        .request(this.options)
        .then((response) => {
        //   const apiWalker = new ApiWalker();
          this.blogObj.blogs = response.data; 
  
          for (let i = 0; i < this.blogObj.blogs.length; i++) {
            // apiWalker.newObjMappers.push({
            //   name: "tempMapper-"+i,
            //   coin: this.blogObj.blogs[i].post,
            // });
          }
          
          console.log(this.blogObj.blogs[0].post);
        })
        .catch(function (error) {
          console.error(error);
        });
      return this.blogObj.blogs;
    }
   
  }
   