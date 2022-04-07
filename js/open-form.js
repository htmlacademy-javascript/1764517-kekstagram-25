import {isEscapeKey} from './util.js';
import {getCheckString, showError, showSuccess} from './util.js';
import {filterSettings, changeZoom} from './get-filter-settings.js';
import {sendData} from './api.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const MAX_HASHTAG_LENGTH = 20;
const INVALID_HASHTAG_LENGTH = 1;

const form = document.getElementById('upload-select-image');
const uploadFile = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeFormButton = document.getElementById('upload-cancel');
const body = document.querySelector('body');
const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const regExp = /^#[a-zа-яё0-9]+$/i;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onFormClose = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imagePreview.removeAttribute('class');
  imagePreview.removeAttribute('style');
  form.reset();
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

  if (arrayHashtags.length > MAX_HASHTAGS_LENGTH) {
    return false;
  }

  for (let i = 0; i <= arrayHashtags.length -1; i++) {
    if (arrayHashtags[i] === '') {
      return true;
    }
    if (!regExp.test(arrayHashtags[i])) {
      return false;
    }
    if (arrayHashtags[i].length >= MAX_HASHTAG_LENGTH) {
      return false;
    }
    if (arrayHashtags[i].length === INVALID_HASHTAG_LENGTH) {
      return false;
    }
    if (arrayHashtags.filter((val) => val === arrayHashtags[i]).length > INVALID_HASHTAG_LENGTH) {
      return false;
    }
  }
  return true;
}

function validateDescription () {
  if (getCheckString(description.value, MAX_DESCRIPTION_LENGTH)) {
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccess();
          unblockSubmitButton();
        },
        () => {
          showError();
          unblockSubmitButton();
          onFormClose();
        },
        new FormData(evt.target),
      );
    }
  });
};

const openForm = () => {
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imagePreview.src = URL.createObjectURL(file);
    } else {
      setTimeout(onFormClose, 1);
      showError();
    }

    scaleValue.value = '100%';
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  closeFormButton.addEventListener('click', onFormClose);

  const onEscapeClose = (evt) => {
    if (isEscapeKey(evt)) {
      onFormClose();
    }
  };

  setUserFormSubmit(onFormClose);

  body.addEventListener('keydown', onEscapeClose);

  hashtags.addEventListener('focus', () => {
    body.removeEventListener('keydown', onEscapeClose);
  });

  hashtags.addEventListener('focusout', () => {
    body.addEventListener('keydown', onEscapeClose);
  });

  description.addEventListener('focus', () => {
    body.removeEventListener('keydown', onEscapeClose);
  });

  description.addEventListener('focusout', () => {
    body.addEventListener('keydown', onEscapeClose);
  });

  changeZoom();
  filterSettings();
};

export {openForm};

