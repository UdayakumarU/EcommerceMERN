import CUSTOMER_CONST from './customer.const';

export const loginCustomer = user => ({
    type: CUSTOMER_CONST.CUSTOMER_LOGIN,
    payload: {...user}
});

export const logoutCustomer = () => ({
    type: CUSTOMER_CONST.CUSTOMER_LOGOUT
});
