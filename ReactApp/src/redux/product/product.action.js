import PRODUCT_CONST from './product.const';

export const addHomeProducts = products => ({
    type: PRODUCT_CONST.HOME_PRODUCTS,
    payload: products
});

export const setCurrentProduct = selectedProduct => ({
    type: PRODUCT_CONST.PRODUCT_SELECTED,
    payload: selectedProduct
});