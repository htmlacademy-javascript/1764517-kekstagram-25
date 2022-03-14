const bigPicture = document.querySelector('.big-picture');
const photoMiniature = document.querySelector('.pictures');
const closeBigPicture = document.querySelector('.big-picture__cancel');

const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const commentsList = document.querySelector('.social__comments');

const getCommentElement = (miniature) => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  const comments = miniature.comments;

  comments.forEach((comment) => {
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
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comments.length;
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
  getCommentElement(miniature);

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
