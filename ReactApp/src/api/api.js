import { axios } from "../library";
import { URL } from "./api.const";

import { getCustomerLoginToken } from "../redux/customer/customer.selector";

export const getProducts = () => {
    return axios.get(URL.PRODUCTS).then( ({ data })=>{
        return data;
    }).catch( ({response,message}) =>{
        throw response? response.data.errorMessage : message;
    });
}

export const getProductById = (productId) => {
    return axios.get(URL.PRODUCTS+productId).then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const createCustomerAccount = accountDetails => {
    const {username, email, password} = accountDetails;
    return axios.post(URL.CUSTOMER_ACCOUNT_CREATE, {customerName:username,customerEmail:email,customerPassword:password})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const loginCustomer = loginDetails => {
    const {userId, password} = loginDetails;
    return axios.post(URL.CUSTOMER_LOGIN, {customerEmail:userId, customerMobile:userId, customerPassword:password})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const saveCartItems = (cartProductIds, customerLoginToken ) => {
    const headers = { 'Authorization' : customerLoginToken };
    return axios.put(URL.CART_ITEMS_SAVE, {cartProducts: cartProductIds}, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const getCustomerAddresses = (customerLoginToken ) => {
    const headers = { 'Authorization' : customerLoginToken };
    return axios.get(URL.CUSTOMER_ADDRESSES, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const addCustomerAddress = (addressDetails, customerLoginToken) => {
    const headers = { 'Authorization' : customerLoginToken };
    return axios.put(URL.CUSTOMER_ADDRESS_ADD, {...addressDetails}, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const updateCustomerAddress = (addressDetails, customerLoginToken) => {
    const headers = { 'Authorization' : customerLoginToken };
    return axios.put(URL.CUSTOMER_ADDRESS_UPDATE+addressDetails._id, {...addressDetails}, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const placeOrder = (orderDetails, customerLoginToken) => {
    const headers = { 'Authorization' : customerLoginToken };
    return axios.post(URL.PLACE_ORDER, {...orderDetails}, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const getOrders = () => {
    const headers = { 'Authorization' : getCustomerLoginToken() };
    return axios.get(URL.CUSTOMER_ORDERS, {headers})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}