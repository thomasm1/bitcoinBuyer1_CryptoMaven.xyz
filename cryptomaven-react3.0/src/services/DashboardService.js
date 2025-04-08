import axios from 'axios'
import  { API_BASE_URL } from "../config";
 

export const getAllDashboards = () => axios.get(API_BASE_URL);

export const createDashboard = (dashboard) => axios.post(API_BASE_URL, dashboard);

export const getDashboardById = (dashboardId) => axios.get(API_BASE_URL + '/' + dashboardId);

export const updateDashboard = (dashboardId, dashboard) => axios.put(API_BASE_URL + '/' + dashboardId, dashboard);

export const deleteDashboard = (dashboardId) => axios.delete(API_BASE_URL + '/' + dashboardId);