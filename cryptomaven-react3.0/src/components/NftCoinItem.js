import React, { useEffect, useState } from 'react';
import { nftCoinsService } from '../services/nftCoinsService';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
// import { css } from 'glamor'

let nftCoins_item = css({
    padding: '20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid grey',
    ':hover':{
        color:'red'
    }
})

let item_back = css({
    background:'grey'
})



const NftCoinsItem = ({item}) =>{
    
    const { id } = useParams();
    const [nftCoin, setNftCoin] = useState(null);
        const location = useLocation();
        const pobj = useOutletContext();
    
    useEffect(() => {
        const fetchNftCoin = async () => {
            try {
           const response = nftCoinsService.getNftCoin(id);
                setNftCoin(response );
                console.log("NftCoin NftCoinsItem fetched:", response );
                console.log("NftCoin NftCoinsItem fetched:", response?.data);
                console.log("NftCoin NftCoinsItem fetched:", response?.data?.content);
            } catch (error) {
                console.error("Error fetching nftCoin:", error);
            }
        };
    
        fetchNftCoin();
    }, [id]);
    
    if (!nftCoin) {
        return <div>Loading nftCoin...</div>;
    }
    return(
        <div style={nftCoins_item} className="nftCoins_item">
<div className="address-item-container" style={{ height: "400px" }}>   
    
<div className="address-body">
                <p className="address-content">{nftCoin.address}</p>
            </div>
            <div className="address-details"> 
                <div className="detail-item">
                    <span className="detail-label">NftCoins:</span> {nftCoin?.name}
                </div>
                <div className="detail-item">
                    <span className="detail-label">NftCoins:</span> {nftCoin?.description}
                </div>
                <div className="detail-item">
                    <span className="detail-label">NftCoins:</span> {nftCoin?.nftCoins}
                </div>
                <div className="detail-item">
                    <span className="detail-label">URL:</span> {nftCoin?.metadata?.title}
                </div>
                <div className="detail-item">
                    <span className="detail-label">url:</span> {nftCoin?.metadata?.url}
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
            
            <span>News NftCoin</span>
            <h6>{ nftCoin.name }</h6>
            <h6>{ nftCoin.description }</h6>
            <h6>{ nftCoin.nftCoins }</h6>
            <h6>{ nftCoin.nftCoins.id }</h6>
            <h6>{ nftCoin.nftCoins.title }</h6>
            <h6>{ nftCoin.nftCoins.url }</h6>
            <hr /> 
            <span>URL</span>
            <h6>{ item.id }</h6>
            <h6>{ item.title }</h6>  
            <div> 
               <a href    = {item.url}
                    target = "_blank"
                    rel    = "noopener noreferrer"
                    className = "address-content"
                >
                    {item.url}
                </a>  
            </div>
            <div  >
                <p><small>{console.log("__________pobj______________")}</small></p>
                <p><small>{console.log(JSON.stringify(pobj))}</small></p>
                <p><small>{console.log("__________location______________")}</small></p>
                <p><small>{console.log(JSON.stringify(location))}</small></p>
            </div>
        </div>
    )
    
}


export default NftCoinsItem