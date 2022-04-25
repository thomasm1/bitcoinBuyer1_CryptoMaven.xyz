import React, { useEffect, useState } from "react"; 
import Header from './header.js'
import { Link } from "react-router-dom";
import * as API from "../api/index.js";
import * as c from "../api/constant.js";
 
let blogs
const BlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [mainPost, setMainPost] = useState([]);
  const all_blog_post = async () => {
    try {
      const response = await API.all_blog();
      setMainPost(response.data); 
      blogs = JSON.stringify(response.data)
      
      console.log("response pre200! ", response);
      if (response.status === 200) {
        setLoading(true);
        console.log("response ==200! ",   blogs);
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
        <Header />                                                                                  
          <div className="container homePage">
            <div className="row">
              <div className="col-lg-3">
             SIDEBAR <br />
     INTEREST TAGS
          </div> 

              <div className="col-lg-6">
                <div className="blogPostCard">
                  <>  
                  {console.log("mainPost",mainPost[0])}
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
         <hr />
             <button className="readingBtn">
                                {/* <Link to={`/blog/${blogPosts.title}`}> */}
                                  Read More...
                                {/* </Link> */}
                              </button>
                <hr />
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
