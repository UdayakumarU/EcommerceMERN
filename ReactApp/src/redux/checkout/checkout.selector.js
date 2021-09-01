import { getValue } from '../../library';

export const getCheckoutStepStatus = (state, step) => getValue(state, `Checkout.step${step}.status`, false);

export const getSelectedAddressId = state => getValue(state, 'Checkout.stepTwo.selectedAddressId', "");

export const getConfirmedAddressId = state => getValue(state, 'Checkout.stepTwo.confirmedAddressId', "");

export const getCheckoutItems = state => getValue(state, 'Checkout.stepThree.checkoutItems', []);