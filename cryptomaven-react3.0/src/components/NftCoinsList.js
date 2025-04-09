import React from "react";
import NftCoinsAdd from "./NftCoinsAdd";

const NftCoinsList = ({ nftCoinsFilteredProp }) => {
  if (!nftCoinsFilteredProp || !Array.isArray(nftCoinsFilteredProp) || nftCoinsFilteredProp?.length == 0) {
    return <div>No nftCoins available.</div>;
  }
  const nftCoinsProbe = nftCoinsFilteredProp.map((nftCoin) => (
    <div key={nftCoin.id} className="address-item-container">
      <div className="address-header">
        <h6 className="address-title">{nftCoin.name}</h6>
      </div> 
      <div className="address-body">
        <ul>
        <li className="nftCoins-item-li">NftCoin: {nftCoin.description}</li>
          {Array.isArray(nftCoin.nftCoins) &&
            nftCoin.metadata.attributes.map((item) => (
              <li key={item.id} className="nftCoins-item-li">
                <span><small>{item.id}</small></span><br />
                <span>{"title:__"}{item.title}</span><br />
                <span>{"nftCoin.nftCoins.url:___"}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address-content"
                >
                   {item.url}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="address-footer">
        Add a new research URL
        <NftCoinsAdd nftCoinSelected={nftCoin} />
      </div>
    </div>
  ))
  return (
    <>
      <div className="nftCoins-list-container">
        {nftCoinsProbe}
      </div>
    </>
  );
};

export default NftCoinsList;
