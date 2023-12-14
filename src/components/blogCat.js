import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../components/footer";
import Headar from "../components/header";
import Sidebar from "../components/sidebar";
import SmallBlog from "../components/smallBlog";
import * as API from "../api/index";
import * as c from "../api/constant";
import moment from "moment";
import { pageLoading } from "../util/commonStaticData";
import { Link } from "react-router-dom";
 
const BlogCategory = () => {
  const params = useParams();
  const [mainPost, setMainPost] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("mainPost", mainPost);

  // ? single_blog_Catgoris
  const single_blog_categories = async () => {
    try {
      const reqOBj = {
        slug: params.slugName,
      };
      const response = await API.single_blog(reqOBj);
      console.log("response", response);
      setMainPost(response.data.data);
      setLoading(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onRefreshPage = () => {
    single_blog_categories();
  };
  useEffect(() => {
    single_blog_categories();
    window.scrollTo(0, 0);
  }, [params.slugName]);
  return (
    <>
      {loading === false ? (
        <>
          <div className="loadingDiv">
            <img className="loadingImg" src={pageLoading} alt="" />
            <h2>Loading .....</h2>
          </div>
        </>
      ) : (
        <>
          <Headar />
          <div className="container homePage">
            <div className="row">
              <div className="col-lg-3">
                <Sidebar onRefreshPage={onRefreshPage} />
              </div>
              <div className="col-lg-6 blogPostCard">
                {mainPost.length === 0 ? (
                  <>
                    <div className="postDetails mt-2">
                      <h4>Data Not Found..</h4>
                    </div>
                  </>
                ) : (
                  <>
                    {mainPost.map((item, index) => (
                      <>
                        <div className="single_post_mobile">
                          <div className="postImages">
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
                                  {moment(item.category.createdAt).format(
                                    "MMM DD,YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-5">
                                <p className="loaction mt-2 font-weight-bolder">
                                  By {""}
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
                                  {item.category.name}
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
                                  <Link to={`/blogs/${item.slugName}`}>
                                    Read More...
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
              <div className="col-lg-3 blogRSidebar">
                <SmallBlog />
              </div>
            </div>
            <div className="row">
              <MostViewPost />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default BlogCategory;
