import USER_CONST from './user.const';
const INITIAL_STATE = null;

const userReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case USER_CONST.LOGIN_USER:{
            return { ...currentState, loginDetails: action.payload }
        }
        case USER_CONST.LOGOUT_USER:{
            return { ...currentState, user: null }
        }
        default : return currentState;
    }
}

export default userReducer;

