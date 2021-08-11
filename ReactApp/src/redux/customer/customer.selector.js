import { getValue } from '../../library';

export const getUserId = state => getValue(state, 'Customer.loginDetails.id', "");

export const getCustomerLoginStatus = state => getValue(state, 'Customer.loginDetails.loginStatus', false);

export const getCustomerName = state => getValue(state, 'Customer.loginDetails.name', "User");

export const getCustomerLoginToken = state => getValue(state, 'Customer.loginDetails.loginToken', "");

export const getCustomerAddresses = state => getValue(state, 'Customer.addresses', []);
