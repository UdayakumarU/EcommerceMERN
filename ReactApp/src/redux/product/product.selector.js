import {getValue} from '../../library';
import { store } from '../../redux/store'; 

export const getHomeProducts = () => getValue(store.getState(), 'Product.homeProducts', []);

export const getSelectedProduct = () => getValue(store.getState(), 'Product.selectedProduct', {});
