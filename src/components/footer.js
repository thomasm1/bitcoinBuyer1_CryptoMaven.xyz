import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../util/commonStaticData";
import * as API from "../api/index";
import * as c from "../api/constant";
import moment from "moment";
import "./footer.css";

const Footer = () => {
  const [mainPost, setMainPost] = useState([]);
  const allBlogPost = async () => {
    try {
      const response = await API.all_blog();
      console.log("response", response);
      setMainPost(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    allBlogPost();
  }, []);
  return (
    <>
      <div className="footer">
        <hr className="footerBorder" />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h3 className="footerHeading">About</h3>
              <div className="fLogo">
                <img className="logo" src={logo} alt=" CryptoMaven Logo" />
              </div>
              <p>
                Technology shapes much of my life, and in many respects it
                frames my future plans! Technology is integral to my
                professional, academic, and enterprising endeavors, and I hope
                to share helpful knowledge from what I've learned along the
                journey.
              </p>
            </div>
            <div className="col-lg-6">
              {/* xmaterial */}
              <h3 className="footerHeading border-0">xmaterial</h3>
              <div className="row footerLink">
                  ffooterlink
              </div>
            </div>


            {/* a */}
            <div className="col-lg-3">
              <h3 className="footerHeading border-0">Useful Links</h3>
              <ul className="userLinkFoot">
                <li>
                  {/* <Link to="/login">{roundIcon} Login</Link> */}
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
            {/* d */}
          </div>
        </div>

        <hr className="footerBorder mt-3 mb-2" />
        <div className="footerBtm">
          <div className="row">
            <div className="col-lg-12">
              <p>
                Copyright © 2022 All Rights Reserved. | thomasmaestas.net |
                CryptoMaven
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
