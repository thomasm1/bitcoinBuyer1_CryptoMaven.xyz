 



import axios from 'axios';
import { ADDRESSES_BASE_URL } from '../config';
import { JWT_TOKEN } from '../config';  

class CoinsService { 
    async addCoin(values, addressId) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN;
        const coins = await axios.get(`${ADDRESSES_BASE_URL}/addresses/${addressId}/coins`, values,{
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        if (!coins) {
            coins = [];
        }
        coins.push(values);   
        console.log("coinsService :", coins);
        await axios.post(`${ADDRESSES_BASE_URL}/addresses/${addressId}/coins`, coins
        , {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    }

    
    async getCoin(addressId, coinId) {
        return await axios.get(`${ADDRESSES_BASE_URL}/addresses/${addressId}/coins/${coinId}`);
    }

    async getCoins(addressId) {
        const response =  await axios.get(`${ADDRESSES_BASE_URL}/addresses/${addressId}/coins`);
        console.log("coinsService getCoins:", response.data);
        return response.data;

    }
    
}




const coinService = new CoinsService();
export default coinService;  // Single export
 