import {isEscapeKey} from './util.js';
import {getCheckString} from './util.js';

const form = document.getElementById('upload-select-image');
const uploadFile = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeFormButton = document.getElementById('upload-cancel');
const body = document.querySelector('body');
const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control');

const regExp = /^#[a-zа-яё0-9]+$/i;

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtags.value = '';
  description.value = '';
  scaleValue.value = '55%';
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
};

export {openForm};

