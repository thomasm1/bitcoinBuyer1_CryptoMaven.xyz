import axios from "axios";
import * as c from "./constant.js";
 
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
  