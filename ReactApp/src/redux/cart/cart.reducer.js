import CART_CONST from './cart.const';
const INITIAL_STATE = {cartItems:[]};

const cartReducer = (currentState = INITIAL_STATE, action) =>{
    switch(action.type){
        case CART_CONST.ADD_ITEM:{
            return { ...currentState, cartItems: [...currentState.cartItems, action.payload] }
        }
        case CART_CONST.REMOVE_ITEM:{
            const { cartItems } = currentState;
            return { ...currentState, cartItems: cartItems.filter(product => action.payload !== product.productId ) }
        }
        default:
            return currentState;
    }
}

export default cartReducer;
