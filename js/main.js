import {getData} from './api.js';
import {openForm} from './open-form.js';
import {getDataError} from './util.js';
import { filtration } from './filtration.js';

getData(filtration, getDataError);
openForm();


