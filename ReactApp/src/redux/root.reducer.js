import { combineReducers, persistReducer, storage } from "../library";

import customerReducer from './customer/customer.reducer';
import productReducer from './product/product.reducer';
import directoryReducer from './directory/directory.reducer'; 
import miscReducer from './misc/misc.reducer'; 
import cartReducer from './cart/cart.reducer';
import checkoutReducer from './checkout/checkout.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Product','Customer','Cart']  //find a soln to remove Product from the whitelist
}

const rootReducer = combineReducers ({
    Customer: customerReducer,
    Directory: directoryReducer,
    Product: productReducer,
    Misc: miscReducer,
    Cart: cartReducer,
    Checkout: checkoutReducer
});


export default persistReducer(persistConfig, rootReducer);