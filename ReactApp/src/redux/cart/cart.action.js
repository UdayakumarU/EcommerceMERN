import CART_CONST from './cart.const';

export const addItemToCart = product => ({
    type: CART_CONST.ADD_ITEM,
    payload: product
});

export const removeItemFromCart = productId => ({
    type: CART_CONST.REMOVE_ITEM,
    payload: productId
});

export const mergeCustomerCart = customerCartItems => ({
    type: CART_CONST.MERGE_CUSTOMER_CART,
    payload: customerCartItems
});

export const emptyCart = () => ({
    type: CART_CONST.EMPTY_CART,
    payload: []
});

export const cleanCartAndAddItems = items => ({
    type: CART_CONST.ADD_ITEMS,
    payload : items
})