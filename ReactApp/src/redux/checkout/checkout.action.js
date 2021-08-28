import CHECKOUT_CONST from './checkout.const';

export const initializeCheckoutSteps = () => ({
    type: CHECKOUT_CONST.CHECKOUT_INITIALIZE,
    payload: {  stepOne:{status:false}, 
                stepTwo:{status:false}, 
                stepThree:{status:false}, 
                stepFour:{status:false}
            }
});

export const setCheckoutStepStatus = (step, status) => ({
    type: CHECKOUT_CONST.STEP_STATUS,
    payload: {step, status}
});

export const setSelectedAddressId = (addressId) => ({
    type: CHECKOUT_CONST.DELIVERY_ADDRESS_SELECTED,
    payload: addressId
});

export const setConfirmedAddressId = (addressId) => ({
    type: CHECKOUT_CONST.DELIVERY_ADDRESS_CONFIRMED,
    payload: addressId
});