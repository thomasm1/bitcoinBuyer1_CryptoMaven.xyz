// ?BASE URL   LOCALLY RUN "npm run api" for /api/
export const URL = "http://localhost:3001"; 

// WILL BE SERVERLESS FOR USER DB
// export const AWS_POST_URL = "https://emfm9dpoeh.execute-api.us-east-1.amazonaws.com/dev/post"
export const AWS_USER_URL = "https://ccgcdpvo25.execute-api.us-east-1.amazonaws.com/Armchair_Production/armchair-users/0";

// ? PARTICULAR URL  
export const BLOG_POST = `${URL}/api/blog`; 
export const BLOG_COINS = `${URL}/api/coins`; 
export const BLOG_CATEGORIES =  `${URL}/api/blog-categories`;  

//LOGIN?REG
export const REGISTRATION_USER = `${AWS_USER_URL}/api/user`;
 