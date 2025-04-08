import React, {  Component, useState, useEffect } from "react";
import AddressCreate from "../components/AddressCreate";
// import AddressList from "../components/AddressList";
class RecordAddress extends  Component {
  constructor() {
    super();
    this.state = {
      nftCoins: [], 
      dashboardText:
        "RecordAddress Here, RecordAddress Now",
      filtered: [],
      loading: true,
    };
  }
 

  render() {
    return ( 
        <div className="container">
 
          <div className="row">
            <div className="col-md-8">
              <h6>Record  Address</h6>
              <AddressCreate />
              <hr />
            
            </div>
          </div>
        </div> 
    );
  }
}

export default RecordAddress;
