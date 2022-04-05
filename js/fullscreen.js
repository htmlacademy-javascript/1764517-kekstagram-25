import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');

const getCommentElement = (miniature, visibleComments) => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  const comments = miniature.comments;

  comments.slice().slice(0, visibleComments).forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentsList.appendChild(commentItem);
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    commentItem.appendChild(commentAvatar);
    const commentText = document.createElement('p');
    commentText.textContent = comment.message;
    commentItem.appendChild(commentText);
  });
};


const openPicture = (miniature) => {
  const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPictureCommentsCount.textContent = miniature.comments.length;
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
  let commentShown = 5;
  getCommentElement(miniature, 5);

  if (miniature.comments.length < 5) {
    commentCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  } else {
    commentCounter.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }

  const cm = () => {
    commentShown +=5;
    getCommentElement(miniature, commentShown);
    if (commentShown >= +bigPictureCommentsCount.textContent) {
      commentsLoader.classList.add('hidden');
    }
  };

  commentsLoader.addEventListener('click', cm);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const closePhoto = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', cm);
  };
  closeBigPicture.addEventListener ('click', () => {
    closePhoto();
  });

  body.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closePhoto();
    }
  });
};

export{openPicture};
