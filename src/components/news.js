import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from "../api/index";
import * as c from "../api/constant";
import moment from "moment";

import Footer from "../components/footer";
import Header from "../components/header";
import { pageLoading } from "../util/commonStaticData";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [mainPost, setMainPost] = useState([]);

  const all_blog_post = async () => {
    try {
      const response = await API.all_news();
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
                

{/* //NewSidebar  HERE  */}


              </div>
              <div className="col-lg-6">
                <div className="blogPostCard">
                  <>
                    {mainPost.map((item, index) => (
                      <>
                        <div className="postImages" key={index}>
                          <img
                            className="blogImg"
                            src={c.URL + "/" + item.image}
                            alt=""
                          />
                        </div>
                        <div className="postDetails">
                          <div className="row">
                            <div className="col-lg-3">
                              <p className="postDate">
                                {moment(item.createdAt).format("MMM DD,YYYY")}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-5">
                              <p className="loaction mt-2 font-weight-bolder">
                                By{" "}
                                {item.user === null ? (
                                  ""
                                ) : (
                                  <>
                                    <span className="d-inline-block mr-2">
                                      {item.user.fname}
                                    </span>
                                    <span>{item.user.lname}</span>
                                  </>
                                )}
                              </p>
                            </div>
                            <div className="col-lg-7">
                              <p className="loaction mt-2 font-weight-bolder">
                                {item.title}
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-12">
                              <p className="postDetais">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.details,
                                  }}
                                />
                              </p>
                              <button className="readingBtn">
                                <Link to={`/news/${item.slugName}`}>
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
              <div className="col-lg-3">
                

              {/* NewsRightBar */}

              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="loadingDiv">
            <img className="loadingImg" src={pageLoading} alt="" />
            <h2>Loading .....</h2>
          </div>
        </>
      )}
    </>
  );
};

export default News;
