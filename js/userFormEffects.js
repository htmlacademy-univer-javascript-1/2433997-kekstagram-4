import { formImageUpload } from './userForm.js';

const buttonScaleBig = formImageUpload.querySelector('.scale__control--bigger');
const buttonScaleSmall = formImageUpload.querySelector(
  '.scale__control--smaller'
);
const scaleControl = formImageUpload.querySelector('.scale__control--value');
const DEFAULT_VALUE_SCALE = 100;
scaleControl.value = `${DEFAULT_VALUE_SCALE}%`;
const imgPreview = formImageUpload.querySelector('.img-upload__preview');

function changeImage() {
  const currentValue = parseInt(scaleControl.value, 10) / 100;
  imgPreview.style.transform = `scale(${currentValue})`;
}

buttonScaleBig.addEventListener('click', () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue < 100) {
    currentValue += 25;
    scaleControl.value = `${currentValue}%`;
    changeImage();
  }
});

buttonScaleSmall.addEventListener('click', () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue > 25) {
    currentValue -= 25;
    scaleControl.value = `${currentValue}%`;
    changeImage();
  }
});

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const EFFECTS = [
  { name: 'none', style: 'none', min: 0, max: 100, step: 1, unit: '' },
  { name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
];
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect;

function openSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
}

function updateOptions() {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
    connect: 'lower',
  });
}

function createSlider() {
  chosenEffect = DEFAULT_EFFECT;
  noUiSlider.create(sliderElement, {
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
    connect: 'lower',
  });
  hideSlider();
}

createSlider();

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  if (chosenEffect === DEFAULT_EFFECT) {
    imgPreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imgPreview.style.filter = `${chosenEffect.style}(${valueElement.value}${chosenEffect.unit})`;
  }
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateOptions();
    hideSlider();
  } else {
    openSlider();
    chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateOptions();
  }
});
