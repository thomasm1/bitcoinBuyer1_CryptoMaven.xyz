import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roundIcon, sidebarAllCatagories } from "../util/commonStaticData";
import * as API from "../api/index";
const Sidebar = ({ onRefreshPage }) => {
  const [categories, setCategories] = useState([]);
  // ? ALL BLOG CATAGORIES
  const allBlogCategories = async () => {
    try {
      const response = await API.blog_categories();
      console.log("categories-response", response);
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    allBlogCategories();
  }, []);
  return (
    <>
      <div className="sidebar mobileDisplayNone">
        <ul>

          {sidebarAllCatagories.map((item, index) => (
            <li className="categoriesList" key={index}>
                
              <Link
                onClick={onRefreshPage}
                to={`/blog-categories/${item.name}`}
              > 
                <span>{roundIcon}</span> 
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
