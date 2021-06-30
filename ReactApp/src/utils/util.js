import { getValue } from "./modelutils";

export const calculatePriceAfterDiscount = (actualPrice,discount) =>{
    let price = actualPrice - (actualPrice * (discount/100));
    return price.toFixed(2);
}
export const calculateSavingPrice = (actualPrice,discount) =>{
    let price = (actualPrice * (discount/100));
    return price.toFixed(2);
}

export const getProductById = (products, productId) =>{
    return products.find( product => getValue(product, 'productId', "") === productId );
} 

export const getProductsByCategory = (products, category) =>{
    return products.filter( product => getValue(product, 'category', "") === category );
} 