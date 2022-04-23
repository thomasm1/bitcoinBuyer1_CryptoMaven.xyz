import React, { useEffect, useState } from "react"; 

const loading  = true // TEMP

const BlogPost = () => {
    const all_blog_post = () => {
      console.log("response -BlogPost");
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
