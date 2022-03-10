import {generatePhotos} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const miniature = generatePhotos()[0];

const openPicture = () => {
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comment.length;
  bigPicture.querySelector('.social__caption').textContent = miniature.description;

  photoMiniature.onclick = () => {
    bigPicture.classList.remove('hidden');
  };
  closeBigPicture.onclick = () => {
    bigPicture.classList.add('hidden');
  };
};

export{openPicture};
