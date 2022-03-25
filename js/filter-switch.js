const form = document.getElementById('upload-select-image');
const effectValueInput = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');

const noneFilterPreview = document.getElementById('effect-none');
const chromeFilterPreview = document.getElementById('effect-chrome');
const sepiaFilterPreview = document.getElementById('effect-sepia');
const marvinFilterPreview = document.getElementById('effect-marvin');
const phobosFilterPreview = document.getElementById('effect-phobos');
const heatFilterPreview = document.getElementById('effect-heat');

const filterChrome = 'effects__preview--chrome';
const filterSepia = 'effects__preview--sepia';
const filterMarvin = 'effects__preview--marvin';
const filterPhobos = 'effects__preview--phobos';
const filterHeat = 'effects__preview--heat';

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

form.addEventListener('change', () => {
  effectValueInput.value = 0;
  noneFilterPreview.addEventListener('click', () => {
    imagePreview.removeAttribute('class');
    imagePreview.removeAttribute('style');
  });

  if (noneFilterPreview.checked) {
    effectLevel.classList.add('hidden');
  }

  if (imagePreview.classList.contains(filterChrome)) {
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
  }

  if (imagePreview.classList.contains(filterSepia)) {
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
  }

  if (imagePreview.classList.contains(filterMarvin)) {
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
  }

  if (imagePreview.classList.contains(filterPhobos)) {
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
  }

  if (imagePreview.classList.contains(filterHeat)) {
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
  }
});


const applyFilter = (filter, filterEffect) => {
  form.addEventListener('change', () => {
    filter.addEventListener('click', () => {
      imagePreview.removeAttribute('class');
      imagePreview.classList.add(filterEffect);
    });
  });
};


applyFilter(chromeFilterPreview, filterChrome);
applyFilter(sepiaFilterPreview, filterSepia);
applyFilter(marvinFilterPreview, filterMarvin);
applyFilter(phobosFilterPreview, filterPhobos);
applyFilter(heatFilterPreview, filterHeat);
