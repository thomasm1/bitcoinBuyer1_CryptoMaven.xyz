import { configureStore } from '@reduxjs/toolkit'; 
import addressReducer from './addresses_reducer';
import userReducer from './users_reducer'; 

export default configureStore({  
  reducer: {
    address: addressReducer,
    user: userReducer,
  },
});
