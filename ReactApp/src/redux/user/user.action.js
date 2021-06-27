import USER_CONST from './user.const';

export const loginUser = user => ({
    type: USER_CONST.LOGIN_USER,
    payload: user
});

export const logoutUser = () => ({
    type: USER_CONST.LOGOUT_USER
});
