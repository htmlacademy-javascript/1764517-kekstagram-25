import {generatePhotos} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const miniature = generatePhotos()[0];
const comentsList = document.querySelector('.social__comments');


const getCommentElement = () => {
  const commentItem = comentsList.createElement('li');
  const commentAvatar = commentItem.createElement('img');
  const commentText = commentItem.createElement('p');
  const comment = miniature.comment;
  commentItem.classList.add('social__comment');
  comentsList.appendChild(commentItem);
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment[0].avatar;
  commentAvatar.alt = comment[0].name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentText.textContent = comment[0].message;


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
