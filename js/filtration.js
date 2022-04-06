import {renderMiniatures} from './miniature.js';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const filtrationForm = document.querySelector('.img-filters__form');

const getRandomFiltration = (array) => {
  const copy = array.slice();
  copy.sort(() => Math.random() - 0.5);
  return copy.slice(0, 10);
};

const getDiscussedFiltration = (array) => array.slice().sort((a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  } else { return -1;}
});

const getDefaultFiltration = (array) => array.slice();


const filtration = (photos) => {
  renderMiniatures(photos);
  const debouncedRender = debounce(renderMiniatures, 500);
  filtrationForm.addEventListener('click', (evt) => {
    for (let i = 0; i < filtrationForm.length; i++) {
      filtrationForm[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    let result;
    switch(evt.target.id) {
      case 'filter-random':
        result = getRandomFiltration(photos);
        break;
      case 'filter-discussed':
        result = getDiscussedFiltration(photos);
        break;
      default:
        result = getDefaultFiltration(photos);
        break;
    }
    debouncedRender(result);
  });
};

export{filtration};


