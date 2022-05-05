import axios from "axios";
import * as c from "./constant.js";
 // make into service later 
import { sidebarAllCatagories } from "../util/commonStaticData";

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
  