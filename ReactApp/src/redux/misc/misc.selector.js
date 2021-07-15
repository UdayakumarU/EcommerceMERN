import { getValue } from "../../library";

export const getLoaderStatus = (state) => getValue(state, "Misc.loader.status", false);

export const getErrorMessages = (state) => getValue(state, "Misc.error.message", []);

export const getSuccessMessages = (state) => getValue(state, "Misc.success.message", []);