import axios from 'axios';
import {URL} from './api.const';

export const getProducts = () => {
    return axios.get(URL.GET_PRODUCT).then( ({ data })=>{
        return data;
    }).catch( ({response,message}) =>{
        throw response? response.data.errorMessage : message;
    });
}

export const getProductById = (productId) => {
    return axios.get(URL.GET_PRODUCT_BY_ID+productId).then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const createCustomerAccount = accountDetails => {
    const {customerName,customerEmail,customerMobile,customerPassword} = accountDetails;
    return axios.post(URL.CREATE_CUSTOMER_ACCOUNT,{customerName,customerEmail,customerMobile,customerPassword})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}


export const loginCustomer = loginDetails => {
    const {customerEmail,customerPassword} = loginDetails;
    return axios.post(URL.LOGIN_CUSTOMER,{customerEmail,customerPassword})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}