import {getValue} from '../../library';

export const getSections = state => getValue(state, 'Directory.sections', []);
