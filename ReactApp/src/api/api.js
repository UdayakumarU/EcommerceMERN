import axios from 'axios';
import {URL} from './../constant/URL';

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