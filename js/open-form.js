import {isEscapeKey} from './util.js';
import {getCheckString} from './util.js';
import './filter-switch.js';

const form = document.getElementById('upload-select-image');
const uploadFile = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeFormButton = document.getElementById('upload-cancel');
const body = document.querySelector('body');
const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const regExp = /^#[a-zа-яё0-9]+$/i;
// const percent = '%';
scaleValue.value = 100;


// _____________________________________________

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleFieldset = document.querySelector('.scale');
const scaleStep = 25;
const maxScale = 100;
const minScale = 25;

const scale = () => {
  scaleSmallerButton.addEventListener('click', () => {
    if (Number(scaleValue.value) === minScale) {
      scaleSmallerButton.disabled = true;
      scaleBiggerButton.disabled = false;
    } else {
      scaleValue.value = scaleValue.value - scaleStep;
      scaleSmallerButton.disabled = false;
      scaleBiggerButton.disabled = false;
    }
  });
  scaleBiggerButton.addEventListener('click', () => {
    if (Number(scaleValue.value) === maxScale) {
      scaleBiggerButton.disabled = true;
      scaleSmallerButton.disabled = false;
    } else {
      scaleValue.value = +scaleValue.value + scaleStep;
      scaleBiggerButton.disabled = false;
      scaleSmallerButton.disabled = false;
    }
  });

  scaleFieldset.addEventListener('click', () => {
    if (scaleValue.value === '25') {
      imagePreview.style = 'transform: scale(0.25)';
    }
    if (scaleValue.value === '50') {
      imagePreview.style = 'transform: scale(0.50)';
    }
    if (scaleValue.value === '75') {
      imagePreview.style = 'transform: scale(0.75)';
    }
    if (scaleValue.value === '100') {
      imagePreview.style = 'transform: scale(1)';
    }
  });
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtags.value = '';
  description.value = '';
  scaleValue.value = 100;
};

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

function validateHashtags (value) {
  const space = ' ';
  const arrayHashtags = value.toLowerCase().trim().split(space);

  if (arrayHashtags.length > 5) {
    return false;
  }

  for (let i = 0; i <= arrayHashtags.length -1; i++) {
    if (arrayHashtags[i] === '') {
      return true;
    }
    if (!regExp.test(arrayHashtags[i])) {
      return false;
    }
    if (arrayHashtags[i].length >= 20) {
      return false;
    }
    if (arrayHashtags[i].length === 1) {
      return false;
    }
    if (arrayHashtags.filter((val) => val === arrayHashtags[i]).length > 1) {
      return false;
    }
  }
  return true;
}

function validateDescription () {
  if (getCheckString(description.value, 140)) {
    return true;
  }
  return false;
}

pristine.addValidator(
  form.hashtags,
  validateHashtags,
  'не врно заполнено поле хэштегов');

pristine.addValidator(
  form.description,
  validateDescription,
  'максимум 140 символов');

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const openForm = () => {
  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  closeFormButton.addEventListener('click', () => {
    closeForm();
  });

  const close = (evt) => {
    if (isEscapeKey(evt)) {
      closeForm();
    }
  };

  body.addEventListener('keydown', close);

  hashtags.addEventListener('focus', () => {
    body.removeEventListener('keydown', close);
  });

  hashtags.addEventListener('focusout', () => {
    body.addEventListener('keydown', close);
  });

  description.addEventListener('focus', () => {
    body.removeEventListener('keydown', close);
  });

  description.addEventListener('focusout', () => {
    body.addEventListener('keydown', close);
  });
  scale();
};

export {openForm};

