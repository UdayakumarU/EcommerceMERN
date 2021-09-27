const PROD_URL = "https://ukart-express-api.herokuapp.com";
const LOCAL_URL = "http://localhost:5000";
const HOST = process.env.NODE_ENV === 'production'? PROD_URL: LOCAL_URL;

export const URL = {
    PRODUCTS: `${HOST}/products/`,
    CUSTOMER_ACCOUNT_CREATE: `${HOST}/account/create-customer/`,
    CUSTOMER_LOGIN: `${HOST}/account/login-customer/`,
    CART_ITEMS_SAVE: `${HOST}/account/save-cart-products/`,
    CUSTOMER_ADDRESSES: `${HOST}/account/get-customer-addresses/`,
    CUSTOMER_ADDRESS_ADD: `${HOST}/account/add-address/`,
    CUSTOMER_ADDRESS_UPDATE: `${HOST}/account/update-address/`,
    PLACE_ORDER: `${HOST}/order/place-order/`,
    CUSTOMER_ORDERS: `${HOST}/order/get-order/`
};