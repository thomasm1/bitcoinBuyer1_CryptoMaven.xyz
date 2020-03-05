import React from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
const Landing = () => {
  return (
    <div style={{ height: '75vh' }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>FindersCalculators</b>
          </h4>
          <br />
          <div className="col s6">
            <BrowserRouter
              to="/login"
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Login
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;