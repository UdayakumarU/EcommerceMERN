import CUSTOMER_CONST from './customer.const';
const INITIAL_STATE = null;

const userReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case CUSTOMER_CONST.CUSTOMER_LOGIN:{
            return { ...currentState, loginDetails: action.payload }
        }
        case CUSTOMER_CONST.CUSTOMER_LOGOUT:{
            return INITIAL_STATE 
        }
        case CUSTOMER_CONST.CUSTOMER_ADDRESSES:{
            return { ...currentState, addresses: action.payload }
        }
        case CUSTOMER_CONST.DELIVERY_ADDRESS_SELECTED:{
            return { ...currentState, selectedAddressId: action.payload }
        }
        case CUSTOMER_CONST.DELIVERY_ADDRESS_CONFIRMED:{
            return { ...currentState, deliveryAddressId: action.payload }
        }
        case CUSTOMER_CONST.CHECKOUT_INITIALIZE:{
            return { ...currentState, checkout: action.payload }
        }
        case CUSTOMER_CONST.CHECKOUT_STEP:{
            const { step } = currentState.checkout;
            step[action.payload.step] = action.payload.status;
            return { ...currentState, checkout:{step} }
        }
        default : return currentState;
    }
}

export default userReducer;

