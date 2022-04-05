import {renderMiniatures} from './miniature.js';

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
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


