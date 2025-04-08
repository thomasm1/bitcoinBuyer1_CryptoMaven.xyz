
import axios from 'axios';
import { ADDRESSES_BASE_URL, JWT_TOKEN } from '../../config';  

import {CLEAR_ADDRESS_DATA, GET_ADDRESS_DETAIL, HANDLE_ADDRESS_LIKES} from '../types';


import {
    ADDRESSES_LIST, 
} from '../types';


export async function  addAddress(addressesId, nftCoins) {
    const bearerToken = localStorage.getItem('accessToken') || JWT_TOKEN

    const request  = await axios.get(`${ADDRESSES_BASE_URL}/addresses/${addressesId}`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    }).then(response => response.data);
    
    const addresses = request;
    if (!addresses.nftCoins) {
        addresses.nftCoins = [];
    }
    addresses.nftCoins.push(nftCoins);   
    console.log("addressesService :", addresses);

    await axios.put(`${ADDRESSES_BASE_URL}/addresses/${addressesId} `, addresses, {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    }); 
    const newRequest = await axios.get(`${ADDRESSES_BASE_URL}/addresses`)
    .then(response => response.data);
    return {
        type: ADDRESSES_LIST,
        payload: newRequest
    }
}

 
export async function getAddresses() {
    const request =  await axios.get(`${ADDRESSES_BASE_URL}/addresses`)
    .then(response => response.data);
    return {
        type: ADDRESSES_LIST,
        payload: request
    } 
}


export function handleAddressLikes(newLikes,id){

    const request = axios(`${ADDRESSES_BASE_URL}/addresses}/${id}`,{
        method: 'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        data:JSON.stringify({counts:newLikes})
    }).then( response => response.data )

    return {
        type: HANDLE_ADDRESS_LIKES,
        payload: request
    }

}


export async function getAddressDetail(id){

    const request =await  axios.get(`${ADDRESSES_BASE_URL}/addresses/${id}`);

    return {
        type: GET_ADDRESS_DETAIL,
        payload: request
    }

}


export function clearAddressData(){
    return {
        type: CLEAR_ADDRESS_DATA,
        payload: null
    }
}
