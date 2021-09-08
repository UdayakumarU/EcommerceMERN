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
        default: 
            return currentState;
    }
}

export default loaderReducer;
