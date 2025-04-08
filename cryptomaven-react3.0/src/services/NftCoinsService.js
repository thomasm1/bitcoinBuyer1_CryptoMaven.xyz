import axios from 'axios';
import { NFT_COIN_BASE_URL } from '../config';
import { JWT_TOKEN } from '../config'; 

class NftCoinsService {


    async createNftCoin(values) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        try {
            const cat = await axios.post(`${NFT_COIN_BASE_URL}/nftCoins`, {
                ...values,
                
                    "id": 10,
                    "name": "A.I.Now.",
                    "description": "AI Technology nftCoins",
                    "nftCoins": [
                        {
                            "id": 42,
                            "title": "Tech Giant Merges",
                            "url": "https://nftCoins3.com"
                        }
                    ],
                    "addresses": [
                        {
                            "id": 23,
                            "did": "D1004",
                            "date": "2025-05-04",
                            "author": "Alice",
                            "monthOrder": "June",
                            "cat3": "Tech",
                            "title": "AI Breakthrough",
                            "addresses": "New AI breakthrough discovered...",
                            "blogcite": "https://blogsite4.com",
                            "email": "alice.user@example.com",
                            "state": "Published",
                            "wordCount": 1600,
                            "durationGoal": 8,
                            "coins": [
                                {
                                    "id": 33,
                                    "name": "TechLover",
                                    "email": "techie@example.com",
                                    "body": "Excited about AI updates!"
                                }
                            ]
                        }
                    ] 

                // did: Date.now(),
                // date: Date.now(),
                // author: "anonymous",
                // email: "anonymous@gmail.com",
                // nftCoinId: 12,
                // blogcite: values.blogcite.join(', '), // Join the selected citations into a comma-separated string
            });
            alert("nftCoins created successfully!");
        } catch (error) {
            console.error("Error creating addresses:", error);
            alert("Error creating addresses. Please check the console for details.");
        }
    }
    async addNftCoins(nftCoinId, nftCoins) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        const nftCoin = await axios.get(`${NFT_COIN_BASE_URL}/nftCoins/${nftCoinId}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        if (!nftCoin.nftCoins) {
            nftCoin.nftCoins = [];
        }
        nftCoin.nftCoins.push(nftCoins);   
        console.log("NftCoinsService addNftCoins:", nftCoin);
        await axios.put(`${NFT_COIN_BASE_URL}/nftCoins/${nftCoinId}`, nftCoin
        , {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    }

    async getNftCoin(id) {
        const response = await axios.get(`${NFT_COIN_BASE_URL}/nftCoins/${id}`);
        console.log("NftCoinsService getNftCoin:", response.data);
        return response.data;
    }

    async getNftCoins() {
      const response = await axios.get(`${NFT_COIN_BASE_URL}/nftCoins`);
        console.log("NftCoinsService getNftCoins:", response.data);
        return response.data;
    }
    
}

 const nftCoinsService = new NftCoinsService();
export default nftCoinsService; 
 