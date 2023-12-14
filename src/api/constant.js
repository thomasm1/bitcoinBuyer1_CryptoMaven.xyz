// ?BASE URL   LOCALLY RUN "npm run api" for /api/
export const URL = "http://localhost:3001"; 
 
//  SERVERLESS FOR BLOG DB 
export const AWS_USER_URL = "https://z3noflrq9b.execute-api.us-east-1.amazonaws.com/dev/posts";


// ? PARTICULAR URL  
export const BLOG_POST = `${AWS_USER_URL}`; // /api/blog
export const BLOG_CATEGORIES =  [
  { name: "All Categories" },
  { name: "Web Dev Affairs" },
  { name: "Sociology Now!" },
  { name: "Quantum Data" },
  { name: "Musing Blockchain" },
  { name: "A.I.Now." } 
];

export const BLOG_COINS = `${URL}`; // markets-api

// ? NEWS  ==> all_news()
export const NEWS = `${URL}/api/news`;


//LOGIN?REG
export const REGISTRATION_USER = `${AWS_USER_URL}`;
export const REGISTRATION_USER_BASE = `${LOCAL_NEW}`;

// *#1 c.REGISTRATION_USER_BASE + "/login";
// *#2 c.REGISTRATION_USER_BASE + "/forgot-password-request";

// *#3 c.REGISTRATION_USER_BASE + "/otp-verification/" +data.emailId +"/" +data.otp;
// *#4 c.REGISTRATION_USER_BASE + "/modify-password"; 