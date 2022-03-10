import {getMiniature} from './miniature.js';

const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');

photoMiniature.onclick = () => {
  bigPicture.classList.remove('hidden');
};

closeBigPicture.onclick = () => {
  bigPicture.classList.add('hidden');
};

const miniature = getMiniature();

const bigPictureImage = document.querySelector('.big-picture__img');

bigPictureImage.querySelector('img').src = miniature.src;
