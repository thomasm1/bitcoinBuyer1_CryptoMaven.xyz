import {
    ADDRESSES_LIST
} from '../types';

 const AddressesReducer =  (state = {}, action) => {
    switch (action.type) {
        case ADDRESSES_LIST:
            return { ...state, addresses: action.payload }
        default:
            return state;
    }
}
export default AddressesReducer;