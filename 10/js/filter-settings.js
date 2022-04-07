const form = document.getElementById('upload-select-image');
const effectValueInput = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const scaleValue = document.querySelector('.scale__control--value');

scaleValue.value = '100%';

const noneFilterPreview = document.getElementById('effect-none');
const filterChrome = 'effects__preview--chrome';
const filterSepia = 'effects__preview--sepia';
const filterMarvin = 'effects__preview--marvin';
const filterPhobos = 'effects__preview--phobos';
const filterHeat = 'effects__preview--heat';

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleStep = 25;
const maxScale = 100;
const minScale = 25;

const scale = () => {
  scaleSmallerButton.addEventListener('click', () => {
    if (parseInt(scaleValue.value, 10) === minScale) {
      scaleSmallerButton.disabled = true;
      scaleBiggerButton.disabled = false;
    } else {
      scaleValue.value = `${parseInt(scaleValue.value, 10) - scaleStep}%`;
      scaleSmallerButton.disabled = false;
      scaleBiggerButton.disabled = false;
      imagePreview.style = `transform: scale(${parseInt(scaleValue.value, 10) / 100})`;
    }
  });
  scaleBiggerButton.addEventListener('click', () => {
    if (parseInt(scaleValue.value, 10) === maxScale) {
      scaleBiggerButton.disabled = true;
      scaleSmallerButton.disabled = false;
    } else {
      scaleValue.value = `${parseInt(scaleValue.value, 10) + scaleStep}%`;
      scaleBiggerButton.disabled = false;
      scaleSmallerButton.disabled = false;
      imagePreview.style = `transform: scale(${parseInt(scaleValue.value, 10) / 100})`;
    }
  });
};

noUiSlider.create(sliderEffect, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderEffect.noUiSlider.on('update', () => {
  effectValueInput.value = sliderEffect.noUiSlider.get();
});

const getChromeSettings = () => {
  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

  sliderEffect.noUiSlider.on('update', () => {
    imagePreview.style = `filter: grayscale(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(filterChrome);
  scaleValue.value = '100%';
};

const getSepiaSettings = () => {
  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

  sliderEffect.noUiSlider.on('update', () => {
    imagePreview.style = `filter: sepia(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(filterSepia);
  scaleValue.value = '100%';
};

const getMarvinSettings = () => {
  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });

  sliderEffect.noUiSlider.on('update', () => {
    imagePreview.style = `filter: invert(${sliderEffect.noUiSlider.get()}%)`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(filterMarvin);
  scaleValue.value = '100%';
};

const getPhobosSettings = () => {
  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });

  sliderEffect.noUiSlider.on('update', () => {
    imagePreview.style = `filter: blur(${sliderEffect.noUiSlider.get()}px)`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(filterPhobos);
  scaleValue.value = '100%';
};

const getHeatSettings = () => {
  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });

  sliderEffect.noUiSlider.on('update', () => {
    imagePreview.style = `filter: brightness(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(filterHeat);
  scaleValue.value = '100%';
};

const filterSettings = () => {
  form.addEventListener('change', () => {
    if (noneFilterPreview.checked) {
      effectLevel.classList.add('hidden');
    }
  });

  effectList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('effects__preview')) {
      const filter = evt.target.classList[1];
      imagePreview.classList.add(filter);

      switch (filter) {
        case filterChrome:
          getChromeSettings();
          break;
        case filterSepia:
          getSepiaSettings();
          break;

        case filterMarvin:
          getMarvinSettings();
          break;

        case filterPhobos:
          getPhobosSettings();
          break;

        case filterHeat:
          getHeatSettings();
          break;

        default:
          effectValueInput.value = 0;
          imagePreview.removeAttribute('class');
          imagePreview.removeAttribute('style');
          effectLevel.classList.add('hidden');
          scaleValue.value = '100%';
          break;
      }
    }
  });
};

export{filterSettings, scale};


