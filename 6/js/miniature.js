import {generatePhotos} from './data.js';
import {openPicture} from './fullscreen.js';

const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = generatePhotos();

const addMiniatures = () => {
  const similarListFragment = document.createDocumentFragment();
  similarPhotos.forEach((photo) => {
    const userPhoto = similarPhotoTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__img').src = photo.url;
    userPhoto.querySelector('.picture__likes').textContent = photo.likes;
    userPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    similarListFragment.appendChild(userPhoto);

    userPhoto.addEventListener('click', () => {
      openPicture(photo);
    });
  });
  similarListElement.appendChild(similarListFragment);
};

export{addMiniatures};
