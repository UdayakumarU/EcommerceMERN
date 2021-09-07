import { get, isEmpty } from "../library";

export const getValue = (object, key, defaultValue) => get(object, key, defaultValue);

export const isNotEmpty = (element) => !isEmpty(element);
