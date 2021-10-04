import MISC_CONST from './misc.const';
const INITIAL_STATE = {};

const loaderReducer = ( currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case MISC_CONST.lOADER_STATE:{
            return { ...currentState, loader: action.payload }
        }
        case MISC_CONST.ERROR_MSG:{
            return { ...currentState, error: action.payload }
        }
        case MISC_CONST.SUCCESS_MSG:{
            return { ...currentState, success: action.payload }
        }
        case MISC_CONST.LOGIN_FROM_CHECKOUT:{
            return { ...currentState, loginFromCheckout: action.payload }
        }
        case MISC_CONST.FOOTER_DISPLAY_STATUS:{
            return { ...currentState, footerDisplay: action.payload }
        }
        default: 
            return currentState;
    }
}

export default loaderReducer;
