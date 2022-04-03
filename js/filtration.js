import {renderMiniatures} from './miniature.js';

const filtrationForm = document.querySelector('.img-filters__form');

const getDefaultFiltration = (array) => array.slice();

const getRandomFiltration = (array) => {

};

const getDiscussedFiltration = (array) => array.slice().sort((a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  } else { return -1;}
});


const filtration = (photos) => {
  renderMiniatures(photos);
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
    renderMiniatures(result);
  });
};


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

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export{filtration};


