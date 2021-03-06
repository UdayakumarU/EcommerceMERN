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
    const {username, email, password} = accountDetails;
    return axios.post(URL.CREATE_CUSTOMER_ACCOUNT, {customerName:username,customerEmail:email,customerPassword:password})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}

export const loginCustomer = loginDetails => {
    const {userId, password} = loginDetails;
    return axios.post(URL.LOGIN_CUSTOMER, {customerEmail:userId, customerMobile:userId, customerPassword:password})
    .then( ({ data }) =>{
        return data;
    }).catch( ( {response,message} ) => {
        throw response? response.data.errorMessage : message;
    });
}