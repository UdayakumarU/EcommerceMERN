import { getValue } from '../../library';

export const getCartItems = state => getValue(state, 'Cart.cartItems', []);
