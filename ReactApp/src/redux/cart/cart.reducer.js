import CART_CONST from './cart.const';
const INITIAL_STATE = {cartItems:[]};

const cartReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case CART_CONST.ADD_ITEM:{
            return { ...currentState, cartItems: [...currentState.cartItems, action.payload] }
        }
        case CART_CONST.REMOVE_ITEM:{
            const { cartItems } = currentState;
            return { ...currentState, cartItems: cartItems.filter(product => action.payload !== product.productId ) }
        }
        case CART_CONST.MERGE_CUSTOMER_CART:{
            const { cartItems } = currentState;
            return { ...currentState, cartItems: [...cartItems, ...action.payload] }
        }
        case CART_CONST.EMPTY_CART:{
            return { ...currentState, cartItems: [] }
        }
        case CART_CONST.ADD_ITEMS:{
            return { ...currentState, cartItems: action.payload }
        }
        default:
            return currentState;
    }
}

export default cartReducer;
