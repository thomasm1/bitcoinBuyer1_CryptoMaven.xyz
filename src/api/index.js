
import axios from "axios";
import * as c from "./constant.js";
 // make into service later 
import { sidebarAllCategories } from "../util/commonStaticData";

/**
 * DATA USER FROM LAMBDA AWS ->DYNAMODB
 *#1 c.REGISTRATION_USER_BASE + "/login";
*#2 c.REGISTRATION_USER_BASE + "/forgot-password-request";

*#3 c.REGISTRATION_USER_BASE + "/otp-verification/" +data.emailId +"/" +data.otp;
*#4 c.REGISTRATION_USER_BASE + "/modify-password";

 * [  description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
 var someFunction = function (arg1, arg2) {
	// 
};

 


// ? ALL_BLOG
export const all_blog = async (data) => {
  try {
    const url = c.BLOG_POST; 
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}; 

// ? BLOG_CATEGORIES
export const blog_categories = async (data) => {
  try {
    const url = c.BLOG_CATEGORIES;
    const res = await axios.get(url, data);


    return res;
  } catch (e) {
    return e.response;
  }
};
 
// ? ALL_COINS
export const all_coins = async (data) => {
    try {
      const url = c.BLOG_COINS; 
      const res = await axios.get(url, data);
      return res;
    } catch (e) {
      return e.response;
    }
  };
  

  // LOGIN  -- REGISTRATION
  


// ? USER LOGIN API
export const user_login = async (data) => {
  try {
    const url = c.REGISTRATION_USER_BASE + "/login";
    console.log("url", url);
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER FORGOT PASSWORD
export const user_forgot_password = async (data) => {
  try { 
    const url = c.REGISTRATION_USER_BASE + "/forgot-password-request";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

c.REGISTRATION_USER +
"/otp-verification/" +
data.emailId +
"/" +
data.otp;

// ? USER FORGOT PASSWORD OTP
export const user_forgot_password_otp = async (data) => {
  try { 
      const url = c.REGISTRATION_USER_BASE  +
      "/otp-verification/" +
      data.emailId +
      "/" +
      data.otp;
    console.log("url", url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};


// ? USER MODIFIY PASSWORD
export const user_modify_password = async (data) => {
  try { 
    const url = c.REGISTRATION_USER_BASE + "/modify-password";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

