import CHECKOUT_CONST from './checkout.const';
const INITIAL_STATE = {};

const checkoutReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case CHECKOUT_CONST.CHECKOUT_INITIALIZE:{
            return { ...action.payload }
        }
        case CHECKOUT_CONST.STEP_STATUS:{
            const step = currentState[`step${action.payload.step}`];
            currentState[`step${action.payload.step}`] = {...step, status:action.payload.status,};
            return { ...currentState};
        }
        case CHECKOUT_CONST.DELIVERY_ADDRESS_SELECTED:{
            const { stepTwo } = currentState;
            return { ...currentState, stepTwo:{...stepTwo, selectedAddressId:action.payload} }
        }
        case CHECKOUT_CONST.DELIVERY_ADDRESS_CONFIRMED:{
            const { stepTwo } = currentState;
            return { ...currentState, stepTwo:{...stepTwo, confirmedAddressId: action.payload} }
        }
        case CHECKOUT_CONST.ITEMS_TO_CHECKOUT:{
            const { stepThree } = currentState;
            return { ...currentState, stepThree:{...stepThree, checkoutItems: [...action.payload]} }
        }
        case CHECKOUT_CONST.REMOVE_ITEM:{
            const { stepThree } = currentState;
            const { checkoutItems }= stepThree;
            return { ...currentState,  stepThree:{...stepThree, checkoutItems: checkoutItems.filter(product => action.payload !== product.productId )} }
        }
        case CHECKOUT_CONST.CHECKOUT_TERMINATE:{
            return action.payload;
        }
        default:
            return currentState;
    }
}

export default checkoutReducer;
