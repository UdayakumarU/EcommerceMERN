import {getValue} from '../../library';

export const getHomeProducts = state => getValue(state, 'Product.homeProducts', []);

export const getSelectedProduct = state => getValue(state, 'Product.selectedProduct', {});
