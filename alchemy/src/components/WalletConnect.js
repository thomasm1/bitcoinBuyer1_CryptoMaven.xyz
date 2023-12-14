import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../util/commonStaticData"; 

const WalletConnect = () => {
  const [mainPost, setMainPost] = useState([]);
  const handleWalletConne = async () => {
    const { ethereum }  = window;
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address)
    } else {
        alert('No Wallet Detected')
    }
};
  useEffect(() => {
    handleWalletConnect();
  }, []);
  return (
    <>
      <div className="wallet">
        <hr className="walletBorder" />
        <div className="container">
          <div className="row">   
          </div>
        </div>

        <hr className="walletBorder mt-3 mb-2" />
        <div className="walletBtm">
          <div className="row">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletConnect;
