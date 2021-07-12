import MISC_CONST from './misc.const';

export const setLoader = (status) => ({
    type: MISC_CONST.lOADER_STATE,
    payload: {status}
});

export const setErrorMessage = (errorMsgs) => ({
    type: MISC_CONST.ERROR_MSG,
    payload: {message:errorMsgs}
});