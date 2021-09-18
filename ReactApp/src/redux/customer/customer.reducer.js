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
        case CUSTOMER_CONST.CUSTOMER_ORDERS:{
            return { ...currentState, orders: action.payload }
        }
        default : return currentState;
    }
}

export default userReducer;

