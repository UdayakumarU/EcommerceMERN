import { getValue } from "./modelutils"
import { calculateSavingPrice } from "./util";

export const isCartHasThisItem = (cartitem, newItem) => {
    return cartitem.some(item => getValue(item, 'productId', "") === getValue(newItem, 'productId', false));
}

export const calculateCartActualPrice = (cartItems) =>{
    let price = 0; 
    cartItems.forEach( item=> { price += item.productActualPrice });
    return price;
}

export const calculateCartDiscountPrice = (cartItems) =>{
    let discountPrice = 0; 
    cartItems.forEach( item=> { discountPrice += calculateSavingPrice(item.productActualPrice, item.discount) });
    return discountPrice;
}

export const calculateCartTotalPrice = (cartItems) =>{
    let discountPrice = 0; 
    cartItems.forEach( item=> { discountPrice += calculateSavingPrice(item.productActualPrice, item.discount) });
    return discountPrice;
}

export const mapCartProductsToIds = (cartItems) =>{
   return cartItems.map( item => ({productId:item.productId, quantity:1}) );
}

export const removeCurrentFromSavedCart = (currentCartItems, savedCartItems) => {
    return savedCartItems.filter(savedCartItem => {
        return !currentCartItems.find(cartItem => cartItem.productId === savedCartItem.productId)
    });
}