// Router will perform practically all DOM manipulation, with automatic state change >10-20 frames per second, 
// so that D3 control feeds data changes, and React/Redux acts as a continuously
// changing data river, stuttering though it be. 
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from '../components/admin/admin';
import Home from "../components/home";


const MainRouter = () => {
    return (
      <>
        <BrowserRouter>
        <h3>blogpost Temp</h3>
          <Routes>
            <Route path="/" element={<Home />} />
             
            {/* admin  for starters, using Least Privilege, open page access with 2 draw bridges */}
            <Route path="/admin" element={<Admin />} /> 
            <Route path="/admin/login" element={<AdminLogin />} />  
          </Routes>
        </BrowserRouter>
      </>
    );
  };
  
  export default MainRouter;
  