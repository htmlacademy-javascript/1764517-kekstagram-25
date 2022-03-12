import {generatePhotos} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');

const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const miniature = generatePhotos()[0];
const commentsList = document.querySelector('.social__comments');

const getCommentElement = () => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentsList.appendChild(commentItem);

  const comment = miniature.comment;
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment[0].avatar;
  commentAvatar.alt = comment[0].name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentItem.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.textContent = comment[0].message;
  commentItem.appendChild(commentText);
};

const openPicture = () => {
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comment.length;
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
  getCommentElement();

  photoMiniature.onclick = () => {
    bigPicture.classList.remove('hidden');
    commentCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  };

  closeBigPicture.onclick = () => {
    bigPicture.classList.add('hidden');
    commentCounter.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    body.classList.remove('modal-open');
  };

  body.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      bigPicture.classList.add('hidden');
      commentCounter.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      body.classList.remove('modal-open');
    }
  });
};

export{openPicture};
