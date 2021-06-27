import {combineReducers} from "redux";

import userReducer from './user/user.reducer';
import productReducer from './product/product.reducer';
import directoryReducer from './directory/directory.reducer'; 

const rootReducer = combineReducers ({
    User:userReducer,
    Directory:directoryReducer,
    Product:productReducer
});

export default rootReducer;