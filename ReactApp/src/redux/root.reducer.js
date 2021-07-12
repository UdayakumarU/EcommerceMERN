import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import customerReducer from './customer/customer.reducer';
import productReducer from './product/product.reducer';
import directoryReducer from './directory/directory.reducer'; 
import miscReducer from './misc/misc.reducer'; 

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['Product','Customer']
}

const rootReducer = combineReducers ({
    Customer:customerReducer,
    Directory:directoryReducer,
    Product:productReducer,
    Misc:miscReducer
});


export default persistReducer(persistConfig, rootReducer);