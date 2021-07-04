import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from './user/user.reducer';
import productReducer from './product/product.reducer';
import directoryReducer from './directory/directory.reducer'; 

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['Product']
}

const rootReducer = combineReducers ({
    User:userReducer,
    Directory:directoryReducer,
    Product:productReducer
});


export default persistReducer(persistConfig, rootReducer);