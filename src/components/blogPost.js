import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import * as API from "../api/index.js";
import * as c from "../api/constant.js";

const loading  = true // TEMP

const BlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [mainPost, setMainPost] = useState([]);
  const all_blog_post = async () => {
    try {
      const response = await API.all_blog();
      console.log("response", response);
      setMainPost(response.data.data);
      if (response.status === 200) {
        setLoading(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    all_blog_post();
  }, []);
  return (
    <>
      {loading ? (
        <>
HEADER
          <div className="container homePage">
            <div className="row">
              <div className="col-lg-3">
             SIDEBAR
             
             <button className="readingBtn">
                                <Link to={`/blog/${this.blogPosts.title}`}>
                                  Read More...
                                </Link>
                              </button>
              </div>
              <div className="col-lg-6">
                <div className="blogPostCard">
                  <>
                    BODY BLOGPOSTCARD
                  </>
                </div>
              </div>
              <div className="col-lg-3 blogRSidebar">
          SMALL BLOG
              </div>
            </div>
            <div className="row mobileNo">
         MOST VIEWED
            </div>
          </div>
         FOOTER
        </>
      ) : (
        <>
          <div className="loadingDiv">
 
            <h2>Loading .....</h2>
          </div>
        </>
      )}
    </>
  );
};

export default BlogPost;
