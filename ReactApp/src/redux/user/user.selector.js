import {getValue} from '../../library';

export const getUserId = state => getValue(state, 'User.loginDetails.userId', "");

export const getUserPassword = state => getValue(state, 'User.loginDetails.password', "");
