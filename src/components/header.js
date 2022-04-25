import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./navbar.js";  

const Header = ({ onRefreshPage }) => {
  const [isOpen, setIsOpen] = useState(false); 
 
  return (
    <>
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
      />
      <div className={isOpen === true ? "mobileNavActive" : "mobileNav"}>
        <ul>
          <li>
            <Link   to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <NavLink to="/blog" className="active">
              Blog  
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className="active">
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/maven" className="active">
              CryptoMaven
            </NavLink>
          </li>
          <li>
            <NavLink to="/coins" className="active">
              Coins
            </NavLink>
          </li>

          {localStorage.getItem("isLogin") === null ? (
              // LOGGED INE
            <> 
              <li className="headerNavManuItem LoginBtn">
                <Link to="/login">Login</Link>
              </li> 
            </>

            // ELSE
          ) : (
            <li>
              <NavLink to="/login" className="active">
                logout
              </NavLink>
            </li>
          )}

        </ul>
      </div> 
    </>
  );
};

export default Header;
