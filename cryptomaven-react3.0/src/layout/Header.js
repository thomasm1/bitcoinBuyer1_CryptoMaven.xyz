import {   NavLink } from "react-router-dom";
import React from 'react';
// import {   useLocation } from 'react-router-dom';
import { styles } from '../config';


const Header = (  ) => {
    // const location = useLocation(); 
    return (
        <div>  
            <header className="app-header">
                <div className="header-content">
                    
                <NavLink
                        to="/"
                        className="nav-link"
                        style={({ isActive }) => ({ color: isActive ? 'blue' : 'darkgray' })}
                    >
                       Home
                    </NavLink>
                    <NavLink
                        to="/address"
                        className="nav-link"
                        style={({ isActive }) => ({ color: isActive ? 'blue' : 'darkgray' })}
                    >
                        Record Address
                    </NavLink>
                    <NavLink
                        to="/addresses"
                        className="nav-link"
                        style={({ isActive }) => ({ color: isActive ? 'darkblue' : 'darkgray' })}
                    >
                        Addresses
                    </NavLink>

                    <NavLink
                        to="/users"
                        className="nav-link"
                        style={({ isActive }) => ({ color: isActive ? 'darkblue' : 'darkgray' })}
                    >
                        Users
                    </NavLink>

                    <NavLink
                        to="/nftCoins"
                        className="nav-link"
                        style={({ isActive }) => ({ color: isActive ? 'blue' : 'darkgray' })}
                    >
                        NftCoins by NftCoin
                    </NavLink>
                </div>
                <div className="header-content row">
                    <hr />
                    <h6 style={{ color: styles.h6.color }}>CRYPTOMAVEN WALLET TRACKER</h6> </div>
                    <hr />
            </header>
        </div>
    );
}

export default Header; 
