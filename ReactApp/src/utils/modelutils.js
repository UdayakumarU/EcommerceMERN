import { get, set, isEmpty } from "../library";

export const getValue = (object, key, defaultValue) => get(object, key, defaultValue);

export const setValue = (object, key, value) => set(object, key, value);

export const isNotEmpty = (element) => !isEmpty(element);
