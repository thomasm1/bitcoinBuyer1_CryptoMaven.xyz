import  { combineReducers } from 'redux'; 
import userReducer from  './users_reducer';
import addressReducer from  './addresses_reducer';

const rootReducer =  combineReducers({ 
  user: userReducer,
    address: addressReducer
});

export default rootReducer;
 

