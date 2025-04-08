import React, { useEffect, useState } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import addressesService from '../services/addressesService.js';

const AddressItem = () => {
    const { id } = useParams();
    const [address, setAddress] = useState(null);
    const location = useLocation();
    const pobj = useOutletContext();

    useEffect(() => {
        const fetchAddress = async () => {
            const response = await addressesService.getAddress(id);
            console.log("addressesService address:", response);
            setAddress(response);
        };

        fetchAddress();
    }, [id]);

    if (!address) {
        return <div>Loading address...</div>;
    }

    return (
        <div className="address-item-container" >
            <div className="address-header">
                <p className="address-title">{address.title}</p>
                <div className="address-meta">
                    <span className="address-author">By: {address.author}</span>
                    <span className="address-date">Date: {new Date(address.date).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="address-body">
                <p className="address-content">{address.address}</p>
            </div>
            <div className="address-details">
                <img src="{address.iconUrl}"
                    alt={address.description} className="address-icon detail-label" width="30" height="30" />
                <div className="detail-item">
                    <span className="detail-label">ID:</span> {address.id}
                </div>
                <div className="detail-item">
                    <span className="detail-label">description:</span> {address.description}
                </div>
           
                <div className="detail-item">
                    <span className="detail-label">Email:</span> {address.email}
                </div>
                <div className="detail-item">
                    <span className="detail-label">blockExplorerUrl</span> {address.blockExplorerUrl}
                </div>
                <div className="detail-item">
                    <span className="detail-label"><small>chains</small></span> {address.chains.map((chain) => (
                        <div key={chain.id} className="chain-item">
                            <img src={chain.iconUrl} alt={chain.name} className="chain-icon" width="20" height="20" />
                            <span className="chain-name">{chain.name}</span>
                            <span className="chain-symbol">{chain.symbol}</span>
                            <span className="chain-description">{chain.description}</span>
                            <span className="chain-rpcUrl">{chain.rpcUrl}</span>
                            <span className="chain-blockExplorerUrl">{chain.blockExplorerUrl}</span>
                            <span className="chain-nftCoin">{chain.nftCoin}</span>
                        </div> 
                    ))}
                </div>
                
                <div className="detail-item">
                    <span className="detail-label"><small>coins</small></span> {address.coins.map((coin) => (
                        <div key={coin.id} className="coin-item">
                            <span className="coin-nativeToken">{coin.nativeToken}</span>
                            <span className="coin-nfts">{coin.nfts.map((nft) => (
                                <div key={nft.id} className="nft-item">
                                    <span className="nft-name">{nft.name}</span>
                                    <span className="nft-amount">{nft.amount}</span>
                                </div>
                            ))}</span>
                            <span className="coin-tokens">{coin.tokens.map((token) => (
                                <div key={token.id} className="token-item">
                                    <span className="token-rawToken">{token.rawToken}</span>
                                    <span className="token-mapToken">{JSON.stringify(token.mapToken)}</span>
                                </div>
                            ))}</span>
                        </div>
                    ))}
                </div>



                <div className="detail-item">
                    <span className="detail-label"><small>address</small></span> {address.address}
                </div>
            </div>
            <hr />
            <div  >
                <p><small>{console.log("__________pobj______________")}</small></p>
                <p><small>{console.log(JSON.stringify(pobj))}</small></p>
                <p><small>{console.log("__________location______________")}</small></p>
                <p><small>{console.log(JSON.stringify(location))}</small></p>
            </div>
        </div>
    );
};

export default AddressItem;

// {
//     "id": 20,
//     "description": "ETH: Ethereum",
//     "email": "thomas1@gmail.com",
//     "owner": "Thomas1@gmail.com",
//     "address": "0xAAA111...",
//     "iconUrl": "https://s3.amazonaws.com/tmm.net/images/crypto/eth.png",
//     "blockExplorerUrl": "https://etherscan.io",
//     "nftAddress": "0xAAA111...",
//     "chains": [
//         {
//             "id": 30,
//             "name": "Ethereum",
//             "symbol": "ETH",
//             "description": "Layer1",
//             "longDescription": "Mainnet",
//             "iconUrl": "https://s3.amazonaws.com/tmm.net/images/crypto/eth.png",
//             "nftCoin": "DeFi",
//             "chainListIcon": null,
//             "rpcUrl": "https://mainnet.ethereum.org",
//             "chainId": 1,
//             "blockExplorerUrl": "https://etherscan.io"
//         }
//     ],
//     "coins": [
//         {
//             "version": null,
//             "dateCreated": null,
//             "timeCreated": null,
//             "lastUpdated": null,
//             "timeUpdated": null,
//             "id": 40,
//             "nativeToken": 2.5,
//             "tokens": [
//                 {
//                     "id": 80,
//                     "rawToken": "RawAlpha",
//                     "mapToken": {}
//                 }
//             ],
//             "nfts": [
//                 {
//                     "id": 70,
//                     "name": "NFTOne",
//                     "amount": 1.0
//                 }
//             ]
//         }
//     ],
//     "user": {
//         "userId": 10,
//         "username": "thomas1@gmail.com",
//         "lastName": "Maestas",
//         "firstName": "Thomas1",
//         "organizationCode": "ORG1",
//         "dashboardCode": "DASH1",
//         "cusUrl": "https://s3.amazonaws.com/tmm.net/images/people/random_pf1",
//         "userType": 0,
//         "email": "thomas1@gmail.com",
//         "contactType": 101,
//         "isActive": 1,
//         "roles": [
//             {
//                 "id": 1,
//                 "name": "ROLE_ADMIN",
//                 "user": null
//             }
//         ],
//         "id": null,
//         "password": "thomas1@gmail.com"
//     }
// },