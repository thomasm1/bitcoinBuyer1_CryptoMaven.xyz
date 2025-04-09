import axios from 'axios';
import { NFT_COIN_BASE_URL } from '../config';
import { JWT_TOKEN } from '../config';

class NftCoinsService {


    async createNftCoin(values) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        try {
            const cat = await axios.post(`${NFT_COIN_BASE_URL}/nftCoins`, {
                ...values,

                // "id": 70,
                "name": "NFT One",
                "amount": 10.3333, 
                "nftAddress": "0xnft1",  
                "metadata": {
                    "metadataId": 505,
                    "name": "MetaOne",
                    "description": "ancient science",
                    "image": "https://s3.amazonaws.com/tmm.net/images/ancientscience.jpg",
                    "external_url": "https://example.com/meta1",
                    "attributes": [
                        {
                            "attrid": 605,
                            "attribute_value": "Gold",
                            "trait_type": "Color"
                        }
                    ],
                    "nftCoin": null
                },
                "coin": null


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
    async updateNftCoins(nftCoinId, nftCoinVar) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        const nftCoin = await axios.get(`${NFT_COIN_BASE_URL}/nftCoins/${nftCoinId}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
       const tempResponse = {
        "id": 81,
        "name": "NFTFsive",
        "amount": 50.0,
        "metadata": {
            "metadataId": 11,
            "name": "MetaFive",
            "description": "  huracan",
            "image": "https://s3.amazonaws.com/tmm.net/images/crypto/huracan.jpg",
            "external_url": "https://example.com/meta5",
            "attributes": [
                {
                    "attrid": 111,
                    "attribute_value": "Holographic",
                    "trait_type": "Texture"
                }
            ],
            "nftCoin": null
        },
        "coin": null
    }
     nftCoin = tempResponse; 
        console.log("NftCoinsService addNftCoins:", nftCoin);
        await axios.put(`${NFT_COIN_BASE_URL}/nftCoins/${nftCoin.id}`, nftCoin
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
