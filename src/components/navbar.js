import React from "react";
import { Link, NavLink } from "react-router-dom"; 
import { logo } from "../util/commonStaticData.js";
const Navbar = ({ setIsOpen, isOpen,  }) => {
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };
 
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark customNav">
        <div className="container">
 
          <div className="col-lg-3 col-5">
            <Link className="navbar-brand text-center" to="/">
              <img className="logo" src={logo} alt="CryptoMaven's Our Daily Tech" />
            </Link>
          </div>
          <div className="col-7 col-lg-6 text-right">
            <button className="mobileToggle" onClick={ToggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
           
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blog">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/news">
                    News
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/maven">
                  CryptoMaven
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/coins">
                    Coins
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <ul className="nav navbar-nav navbar-right mobile">
              {localStorage.getItem("isLogin") === null ? (
              // NOT LOGGED
                <li>
                  <NavLink className="loginBtn" to="/login">
                    Login
                  </NavLink>
                </li>
                
              ) : (
                // LOGGED IN
                <>
                  {/* <li>
                    <NavLink to="/login"></NavLink>
                  </li> */}
                  <li className="dropdownLi">
                    <i class="fas fa-user-circle"></i>
                    <ul className="submenu">
                      {/* <li>
                        <NavLink to="/change-password">Change password</NavLink>
                      </li> */}
                      <li>
                        <NavLink to="/login">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
 
                </>
              )}
            </ul>
          </div>
        </div>
     
      </nav>
    </>
  );
};

export default Navbar;
