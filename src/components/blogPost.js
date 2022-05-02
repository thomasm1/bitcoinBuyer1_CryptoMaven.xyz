import React, { useEffect, useState } from "react"; 
import Header from './header.js'
import Footer from "./footer";
import { Link } from "react-router-dom";
import * as API from "../api/index.js";
import * as c from "../api/constant.js";
import moment from "moment";
import { pageLoading } from "../util/commonStaticData.js";
import "./blogPost.css"; 

let blogs
const BlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [mainPost, setMainPost] = useState([]);
  const allBlogPost = async () => {
    try {
      const response = await API.all_blog();
      setMainPost(response.data); 
      // blogs = JSON.stringify(response.data)
      
      // console.log("response pre200! ", response);
      if (response.status === 200) {
        setLoading(true);
        // console.log("response ==200! ",   blogs);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
 
  useEffect(() => {
    window.scrollTo(0, 0);
    allBlogPost();
  }, [ mainPost]);
  return (
    <>
      {loading ? (
        <>
        <Header />                                                                                  
          <div  className="container blogPostPage ">
            <div className="row">
              <div className="col-lg-3">
             SIDEBAR <br />
     INTEREST TAGS
          </div> 

              <div className="col-lg-6">
                <div className="blogPostCard">
                  <>  
                  {console.log("mainPost",mainPost[0])}
 
                  {mainPost.map((item, index) => (
                    <>
   <div className="postImages" key={index}>
                          <img
                            className="blogImg"
                            src={c.URL + "/" + item.image}
                            alt={item.title}
                          />
                        </div>
                        <div className="postDetails">
                          <div className="row">
                            <div className="col-lg-6">
                              <p className="postDate">
                                {moment(item.did).format("YY-MM-DD")}
                              </p>
                            </div>
                            <div className="col-lg-6 text-right">
                              <p className="location font-weight-bolder">
                                By{" "}
                                {item.author === null ? (
                                  ""
                                ) : (
                                  <>
                                    <span className="d-inline-block md-2">
                                      {item.author}
                                    </span>
                           -
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <p className="location mt-2 font-weight-bolder">
                                {item.title}
                              </p>
                            </div>
                          </div>
                          <div className="row md-2">
                            <div className="col-lg-12">
                              <p className="postDetails">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.post,
                                  }}
                                />
                              </p>
                              <p> <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.blogcite,
                                  }}
                                  />
                                  </p>
                              <button className="readingBtn">
                                <Link to={`/blogs/${item.id}`}>
                                  Read More...
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                    </>
                    ))}
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
         <Footer />
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
