import { getValue } from '../../library';
import { store } from '../../redux/store';

export const getCheckoutStepStatus = (step) => getValue(store.getState(), `Checkout.step${step}.status`, false);

export const getSelectedAddressId = () => getValue(store.getState(), 'Checkout.stepTwo.selectedAddressId', "");

export const getConfirmedAddressId = () => getValue(store.getState(), 'Checkout.stepTwo.confirmedAddressId', "");

export const getCheckoutItems = () => getValue(store.getState(), 'Checkout.stepThree.checkoutItems', []);