import LOADER_CONST from './loader.const';

export const setLoader = (status) => ({
    type: LOADER_CONST.lOADER_STATE,
    payload: status
});
