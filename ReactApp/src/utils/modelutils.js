import { get, isEmpty } from 'lodash';

export const getValue = (object, key, defaultValue) =>{
    return get(object, key, defaultValue);
}

export const isNotEmpty = (element) => {
  return !isEmpty(element);
}