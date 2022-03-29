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
const showError = () => {
  const errorFragment = document.createDocumentFragment();
  const error = errorTamplate.cloneNode(true);
  errorFragment.append(error);
  document.body.append(errorFragment);

  const errorButton = document.querySelector('.error__button');
  const closeError = () => document.querySelector('.error').remove();
  errorButton.addEventListener('click', () => {
    closeError();
  });
};

const successTamplate = document.querySelector('#success').content.querySelector('.success');
const showSuccess = () => {
  const successFragment = document.createDocumentFragment();
  const success = successTamplate.cloneNode(true);
  successFragment.append(success);
  document.body.append(successFragment);

  const successButton = document.querySelector('.success__button');
  const closeSuccess = () => document.querySelector('.success').remove();
  successButton.addEventListener('click', () => {
    closeSuccess();
  });
};

export {getRandomNumber, getCheckString, isEscapeKey, showError, showSuccess};
