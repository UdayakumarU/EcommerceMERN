import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import customerReducer from './customer/customer.reducer';
import productReducer from './product/product.reducer';
import directoryReducer from './directory/directory.reducer'; 
import miscReducer from './misc/misc.reducer'; 
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['Product','Customer','Cart']  //find a soln to remove Product from the whitelist
}

const rootReducer = combineReducers ({
    Customer:customerReducer,
    Directory:directoryReducer,
    Product:productReducer,
    Misc:miscReducer,
    Cart:cartReducer
});


export default persistReducer(persistConfig, rootReducer);