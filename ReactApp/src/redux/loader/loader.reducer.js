import LOADER_CONST from './loader.const';
const INITIAL_STATE = {};

const loaderReducer = ( currentState = INITIAL_STATE, action) =>{
    switch(action.type){
        case LOADER_CONST.lOADER_STATE:{
            return { ...currentState, status: action.payload }
        }
        default: 
            return currentState;
    }
}

export default loaderReducer;
