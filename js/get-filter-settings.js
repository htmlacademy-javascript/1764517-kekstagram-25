const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const FILTER_CHROME = 'effects__preview--chrome';
const FILTER_SEPIA = 'effects__preview--sepia';
const FILTER_MARVIN = 'effects__preview--marvin';
const FILTER_PHOBOS = 'effects__preview--phobos';
const FILTER_HEAT = 'effects__preview--heat';

const form = document.getElementById('upload-select-image');
const effectValueInput = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const scaleValue = document.querySelector('.scale__control--value');

const noneFilterPreview = document.getElementById('effect-none');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

const changeZoom = () => {
  scaleSmallerButton.addEventListener('click', () => {
    if (parseInt(scaleValue.value, 10) === MIN_SCALE) {
      scaleSmallerButton.disabled = true;
      scaleBiggerButton.disabled = false;
    } else {
      scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_STEP}%`;
      scaleSmallerButton.disabled = false;
      scaleBiggerButton.disabled = false;
      imagePreview.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
    }
  });
  scaleBiggerButton.addEventListener('click', () => {
    if (parseInt(scaleValue.value, 10) === MAX_SCALE) {
      scaleBiggerButton.disabled = true;
      scaleSmallerButton.disabled = false;
    } else {
      scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_STEP}%`;
      scaleBiggerButton.disabled = false;
      scaleSmallerButton.disabled = false;
      imagePreview.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
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
    imagePreview.style.filter = `grayscale(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(FILTER_CHROME);
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
    imagePreview.style.filter = `sepia(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(FILTER_SEPIA);
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
    imagePreview.style.filter = `invert(${sliderEffect.noUiSlider.get()}%)`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(FILTER_MARVIN);
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
    imagePreview.style.filter = `blur(${sliderEffect.noUiSlider.get()}px)`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(FILTER_PHOBOS);
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
    imagePreview.style.filter = `brightness(${sliderEffect.noUiSlider.get()})`;
  });
  imagePreview.removeAttribute('class');
  imagePreview.classList.add(FILTER_HEAT);
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
        case FILTER_CHROME:
          getChromeSettings();
          break;
        case FILTER_SEPIA:
          getSepiaSettings();
          break;

        case FILTER_MARVIN:
          getMarvinSettings();
          break;

        case FILTER_PHOBOS:
          getPhobosSettings();
          break;

        case FILTER_HEAT:
          getHeatSettings();
          break;

        default:
          effectValueInput.value = 0;
          imagePreview.removeAttribute('class');
          imagePreview.style.filter = 'none';
          effectLevel.classList.add('hidden');
          break;
      }
    }
  });
};

export{filterSettings, changeZoom};


