const effectValueInput = document.querySelector('.effect-level__value');
const sliderEffect = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');

// const createSlider = (min, max, start, step) => {
//   noUiSlider.create(sliderEffect, {
//     range: {
//       min: min,
//       max: max,
//     },
//     start: start,
//     step: step,
//     connect: 'lower',
//   });

//   sliderEffect.noUiSlider.on('update', () => {
//     effectValueInput.value = sliderEffect.noUiSlider.get();
//   });
// };

const noneFilter = document.getElementById('effect-none');
const chromeFilter = document.getElementById('effect-chrome');
const sepiaFilter = document.getElementById('effect-sepia');
const marvinFilter = document.getElementById('effect-marvin');
const phobosFilter = document.getElementById('effect-phobos');
const heatFilter = document.getElementById('effect-heat');

// if (noneFilter.hasAttribute('checked')) {
//   createSlider.destruction();
// }

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

const applyingFilter = () => {
  noneFilter.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      sliderEffect.noUiSlider.updateOption({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else {
      sliderEffect.noUiSlider.destroy();
    }
  });
};

// const applyingFilter = () => {
//   effectsList.addEventListener ('change', () => {
//     if (chromeFilter.hasAttribute('checked')) {
//       createSlider(0, 1, 1, 0.1);
//       imagePreview.classList.add('.effects__preview--chrome');
//     } else {
//       imagePreview.classList.remove('.effects__preview--chrome');
//     }
//   });
// };

export {applyingFilter};
