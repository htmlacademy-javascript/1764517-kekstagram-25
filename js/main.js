import {getData} from './api.js';
import {openForm} from './open-form.js';
import {getDataError} from './util.js';
import {filterOut} from './get-filtered-data.js';

getData(filterOut, getDataError);
openForm();


