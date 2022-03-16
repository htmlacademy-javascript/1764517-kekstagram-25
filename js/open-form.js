import {isEscapeKey} from './util.js';


const uploadFile = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeFormButton = document.getElementById('upload-cancel');
const body = document.querySelector('body');
const textContent = document.querySelector('.img-upload__text');
const scaleValue = document.querySelector('.scale__control');

const openForm = () => {
  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  const closeForm = () => {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
    textContent.querySelector('.text__hashtags').value = '';
    textContent.querySelector('.text__description').value = '';
    scaleValue.value = '55%';
  };

  closeFormButton.addEventListener('click', () => {
    closeForm();
  });

  body.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeForm();
      evt.stopPropagation();
    }
  });
};

export {openForm};

