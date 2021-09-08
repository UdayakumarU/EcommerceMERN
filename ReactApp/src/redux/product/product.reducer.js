import PRODUCT_CONST from './product.const.js';
const INITIAL_STATE = {};

const productReducer = ( currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case PRODUCT_CONST.HOME_PRODUCTS:{
            return { ...currentState, homeProducts: action.payload }
        }
        case PRODUCT_CONST.PRODUCT_SELECTED:{
            return { ...currentState, selectedProduct: action.payload }
        }
        default: 
            return currentState;
    }
}

export default productReducer;
