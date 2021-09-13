import {getValue} from '../../library';
import { store } from '../../redux/store';

export const getCategories = () => getValue(store.getState(), 'Directory.categories', []);
