import { getValue } from '../../library';
import { store } from '../../redux/store';

export const getUserId = () => getValue(store.getState(), 'Customer.loginDetails.id', "");

export const getCustomerLoginStatus = () => getValue(store.getState(), 'Customer.loginDetails.loginStatus', false);

export const getCustomerName = () => getValue(store.getState(), 'Customer.loginDetails.name', "User");

export const getCustomerLoginToken = () => getValue(store.getState(), 'Customer.loginDetails.loginToken', "");

export const getCustomerAddresses = () => getValue(store.getState(), 'Customer.addresses', []);

export const getCustomerOrders = () => getValue(store.getState(), 'Customer.orders', []);
