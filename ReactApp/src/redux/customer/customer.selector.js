import { getValue } from '../../library';

export const getUserId = state => getValue(state, 'Customer.loginDetails.id', "");

export const getCustomerLoginStatus = state => getValue(state, 'Customer.loginDetails.loginStatus', false);

export const getCustomerName = state => getValue(state, 'Customer.loginDetails.name', "User");
