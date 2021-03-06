import CUSTOMER_CONST from './customer.const';
const INITIAL_STATE = null;

const userReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case CUSTOMER_CONST.CUSTOMER_LOGIN:{
            return { ...currentState, loginDetails: action.payload }
        }
        case CUSTOMER_CONST.CUSTOMER_LOGOUT:{
            return { ...currentState, loginDetails: null }
        }
        default : return currentState;
    }
}

export default userReducer;

