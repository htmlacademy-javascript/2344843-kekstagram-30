const scaleEditor = document.querySelector('.img-upload__scale');
const scaleControlSmaller = scaleEditor.querySelector('.scale__control--smaller');
const scaleControlBigger = scaleEditor.querySelector('.scale__control--bigger');
const scaleControlValue = scaleEditor.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');


function changeScale(direction) {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = currentValue + (direction * 25);

  if (newValue >= 25 && newValue <= 100) {
    scaleControlValue.value = `${newValue}%`;
    imgUploadPreview.style.transform = `scale(${newValue / 100})`;
  }
}

scaleControlSmaller.addEventListener('click', () => changeScale(-1));
scaleControlBigger.addEventListener('click', () => changeScale(1));

noUiSlider.create(slider, {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  const effect = document.querySelector('.effects__radio:checked').value;
  let value = slider.noUiSlider.get();

  switch (effect) {
    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgUploadPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgUploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgUploadPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgUploadPreview.style.filter = `brightness(${value})`;
      break;
    default:
      value = '';
      break;
  }

  effectLevelValue.value = value;
});

effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  effectLevel.classList.remove('hidden');

  switch (effect) {
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'none':
      imgUploadPreview.style.removeProperty('filter');
      effectLevel.classList.add('hidden');
      break;
    default:
      break;
  }
});
