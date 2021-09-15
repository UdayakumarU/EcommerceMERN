import { getValue } from "../library"
import { calculateSavingPrice } from "./util";

export const isCartHasThisItem = (cartitem, newItem) => {
    return cartitem.some(item => getValue(item, 'productId', "") === getValue(newItem, 'productId', false));
};

export const calculateCartActualPrice = (cartItems) =>{
    let price = 0; 
    cartItems.forEach( item=> { price += item.productActualPrice });
    return price;
};

export const calculateCartDiscountPrice = (cartItems) =>{
    let discountPrice = 0; 
    cartItems.forEach( item=> { discountPrice += calculateSavingPrice(item.productActualPrice, item.discount) });
    return discountPrice;
};

export const calculateCartTotalPrice = (cartItems) =>{
    let discountPrice = 0; 
    cartItems.forEach( item => { discountPrice += calculateSavingPrice(item.productActualPrice, item.discount) });
    return discountPrice;
};

export const mapCartProductsToIds = (cartItems) =>{
   return cartItems.map( item => ({productId:item.productId, quantity:1}) );
};

export const removeSelectedProducts = (selectedProducts, products) => {
    return products.filter(product => {
        return !selectedProducts.find(selectedProduct => selectedProduct.productId === product.productId)
    });
};