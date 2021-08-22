import CUSTOMER_CONST from './customer.const';

export const loginCustomer = user => ({
    type: CUSTOMER_CONST.CUSTOMER_LOGIN,
    payload: {...user}
});

export const logoutCustomer = () => ({
    type: CUSTOMER_CONST.CUSTOMER_LOGOUT
});

export const setCustomerAddresses = (addresses) => ({
    type: CUSTOMER_CONST.CUSTOMER_ADDRESSES,
    payload: addresses
});

export const setSelectedAddressId = (addressId) => ({
    type: CUSTOMER_CONST.DELIVERY_ADDRESS_SELECTED,
    payload: addressId
});

export const setDeliveryAddressId = (addressId) => ({
    type: CUSTOMER_CONST.DELIVERY_ADDRESS_CONFIRMED,
    payload: addressId
});

export const initializeCheckoutSteps = () => ({
    type: CUSTOMER_CONST.CHECKOUT_INITIALIZE,
    payload: {step: {one:false, two:false, three:false, four:false} }
});

export const setCheckoutStepStatus = (step, status) => ({
    type: CUSTOMER_CONST.CHECKOUT_STEP,
    payload: {step, status}
});