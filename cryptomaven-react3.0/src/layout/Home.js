import React, { Component, useState, useEffect } from "react"; 
import RecordAddress from "./layout/RecordAddress";
const importText = "../as"
class Home extends  Component {
  constructor() {
    super();
    this.state = {
      nftCoins: [], 
      homeText:
        "HOME",
      filtered: [],
      loading: true,
    };
  } 

  render() {
    return (
      <div>
       {this.state.homeText}  
        
        <RecordAddress />
      </div>
    );
  }
}

export default Home;
