import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { icon } from "../util/commonStaticData";
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

          {categories.map((item, index) => (
            <li className="categoriesList" key={index}>
                LINK
                <br />
                LINK2
                <br />
                LINK3
                <br />
              <Link
                onClick={onRefreshPage}
                to={`/blog-categories/${item.cat3}`}
              >
                  LINK
                <span>{icon}</span> 
                {item.item.cat3}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
