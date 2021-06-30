import {getValue} from '../../library';

export const getCategories = state => getValue(state, 'Directory.categories', []);
