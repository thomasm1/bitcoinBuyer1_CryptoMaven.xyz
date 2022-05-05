import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roundIcon } from "../util/commonStaticData"; 
import * as API from "../api/index";
const Sidebar = ({ onRefreshPage }) => {
  const [categories, setCategories] = useState([]);
  // ? ALL BLOG CATAGORIES
  const allBlogCategories = async (obj) => {

    try {
      const response = await API.blog_categories(); 
      // FUNCTION to REWRITE INITIAL CATEGORIES -> updates of GET NEW INCLINATION TOPICS
                                                // -> exclude based on 1-5 user-set rules DELETE 
                                                // -> updates of PUT to refresh meta-categories [ stage 2] 
    //   console.log("categories-response", response); 
        

// SIDE BAR CATEGORIES
  const sidebarAllCategories = [
    { name: "All Categories" },
    { name: "Web Dev Affairs" },
    { name: "Sociology Now!" },
    { name: "Quantum Data" },
    { name: "Musing Blockchain" },
    { name: "A.I.Now." } 
  ];
   setCategories(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    allBlogCategories(categories);
  }, [categories]);
  return (
    <>
      <div className="sidebar mobileDisplayNone">
        <ul>

                    {/* HARD CODED INITIAL DEFAULTS   */}
          {categories.map((item, index) => (
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
