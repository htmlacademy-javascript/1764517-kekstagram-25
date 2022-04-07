function getRandomNumber (min, max) {
  if (min >= 0 && max > min) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  return 'Что-то пошло не так';
}

function getCheckString (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTamplate = document.querySelector('#error').content.querySelector('.error');
const successTamplate = document.querySelector('#success').content.querySelector('.success');

const showMessage = (template) => {
  const fragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  fragment.append(message);
  document.body.append(fragment);

  const button = message.querySelector('[type="button"]');
  const closeMessage = () => message.remove();
  button.addEventListener('click', () => {
    closeMessage();
  });
  const closeEsc = (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  };
  message.addEventListener('click', (evt) => {
    if (!evt.target.children[1]) {
      closeMessage();
    }
  });

  document.body.addEventListener('keydown', closeEsc);
};

const getDataError = () => {
  errorTamplate.querySelector('h2').style.fontSize = '24px';
  errorTamplate.querySelector('h2').textContent = 'Ошибка загрузки данных. Перезагрузите сртраницу';
  errorTamplate.querySelector('button').textContent = 'ок';
  showMessage(errorTamplate);
};

const showError = () => {
  showMessage(errorTamplate);
};

const showSuccess = () => {
  showMessage(successTamplate);
};

export {getRandomNumber, getCheckString, isEscapeKey, showError, showSuccess, getDataError};
