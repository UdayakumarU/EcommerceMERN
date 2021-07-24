import CART_CONST from './cart.const';
const INITIAL_STATE = {cartItems:[]};

const cartReducer = (currentState = INITIAL_STATE, action) =>{
    switch(action.type){
        case CART_CONST.ADD_ITEM:{
            return { ...currentState, cartItems: [...currentState.cartItems, action.payload] }
        }
        default:
            return currentState;
    }
}

export default cartReducer;
