import { getValue } from '../../library';
import { store } from '../../redux/store';

export const getCartItems = () => getValue(store.getState(), 'Cart.cartItems', []);
