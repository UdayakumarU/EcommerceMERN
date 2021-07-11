import { getValue } from "../../library";

export const getLoaderStatus = (state) => getValue(state, "Loader.status", false);