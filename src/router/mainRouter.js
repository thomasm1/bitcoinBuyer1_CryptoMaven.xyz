import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "../components/home.js"; 
// import Admin from '../components/admin/admin';

const MainRouter = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} /> 
            {/* <Route path="/admin" element={<Admin />} /> 
            <Route path="/admin/login" element={<AdminLogin />} />   */}
            
          </Routes>
        </BrowserRouter>
      </>
    );
  };
  
  export default MainRouter;
  