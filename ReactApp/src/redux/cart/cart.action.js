import CART_CONST from './cart.const';

export const addItemToCart = product => ({
    type: CART_CONST.ADD_ITEM,
    payload: product
});

