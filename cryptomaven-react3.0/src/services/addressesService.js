
import axios from 'axios';
import { ADDRESSES_BASE_URL } from '../config';
import { JWT_TOKEN } from '../config';
import { redirect } from 'react-router-dom';

class AddressesService {
    async createAddress(values) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        try {
            const address = await axios.post(`${ADDRESSES_BASE_URL}/addresses`, {
                ...values,
                address: "0x1234567890abcdef",
                description: "description",
                date: Date.now(),
                email: "anonymous@gmail.com"
            });
            alert("Address created successfully!");
        } catch (error) {
            console.error("Error creating address:", error);
            alert("Error creating address. Please check the console for details.");
        }
    }

    async getAddress(id) {
        const response = await axios.get(`${ADDRESSES_BASE_URL}/addresses/${id}`);
        console.log("addressesService getAddresses:", response.data);
        return response.data;

    }

    async listAddresses() {
        const response = await axios.get(`${ADDRESSES_BASE_URL}/addresses`);
        console.log("addressesService getAddresses:", response.data);
        return response.data;
    }


    async updateAddress(id, addressVals) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        const address = await axios.get(`${ADDRESSES_BASE_URL}/addresses/${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });

        console.log("address from DB :", address);
        console.log("addressVals from input :", addressVals);
        await axios.put(`${ADDRESSES_BASE_URL}/addresses/${id}`, addressVals
            , {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            });
    }
    async deleteAddress(id) {
        const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN
        await axios.delete(`${ADDRESSES_BASE_URL}/addresses/${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    } 
}

// export default addressesService
const addressesService = new AddressesService();
export default addressesService;  // Single export
