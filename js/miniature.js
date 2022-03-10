import {generatePhotos} from './data.js';

const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = generatePhotos();

const getMiniature = () => {
  const similarListFragment = document.createDocumentFragment();
  similarPhotos.forEach(({url, likes, comment}) => {
    const userPhoto = similarPhotoTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__comments').textContent = comment.length;
    similarListFragment.appendChild(userPhoto);
  });
  similarListElement.appendChild(similarListFragment);
};

export{getMiniature};
