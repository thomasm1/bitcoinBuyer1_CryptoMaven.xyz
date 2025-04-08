import axios from "axios";
import  { API_BASE_URL } from "../config";
 

export const listUsers = () => axios.get(API_BASE_URL + '/users');

export const createUser = (user) => axios.post(API_BASE_URL + '/users', user);

export const getUser = (userId) => axios.get(API_BASE_URL + '/users/' + userId);

export const updateUser = (userId, user) => axios.put(API_BASE_URL + '/users/'  + userId, user);

export const deleteUser = (userId) => axios.delete(API_BASE_URL + '/users/'  + userId);