import {generatePhotos} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const miniature = generatePhotos()[0];
const comentsList = document.querySelector('.social__comments');


const getCommentElement = () => {
  const commentItem = comentsList.createElement('li');
  const commentAvatar = commentItem.createElement('img');
  commentItem.classList.add('social__comment');
  comentsList.appendChild(commentItem);
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = miniature.avatar;
  commentAvatar.alt = miniature.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentText = commentItem.createElement('p');
  commentText.textContent = miniature.message;

  commentItem.appendChild(commentAvatar, commentText);
};

const openPicture = () => {
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comment.length;
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
  getCommentElement();

  photoMiniature.onclick = () => {
    bigPicture.classList.remove('hidden');
  };
  closeBigPicture.onclick = () => {
    bigPicture.classList.add('hidden');
  };
};

export{openPicture};
