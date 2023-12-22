const filtersImage = document.querySelector('.img-filters');
filtersImage.classList.remove('img-filters--inactive');
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const NUMBER_RANDOM_PICTURES = 10;

function compareImage(imageA, imageB) {
  return imageB.comments.length - imageA.comments.length;
}

function getRandomUniqueElements(arr, count) {
  const copyArr = arr.slice();
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    const randomElement = copyArr[randomIndex];
    result.push(randomElement);
    copyArr.splice(randomIndex, 1);
  }

  return result;
}

const setDefaultFilter = (thumbnails, cb) => {
  buttonFilterDefault.addEventListener('click', () => {
    buttonFilterDefault.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    cb(thumbnails);
  });
};
const setRandomFilter = (thumbnails, cb) => {
  buttonFilterRandom.addEventListener('click', () => {
    buttonFilterRandom.classList.add('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    const newArray = getRandomUniqueElements(
      thumbnails,
      NUMBER_RANDOM_PICTURES
    );
    cb(newArray);
  });
};
const setDiscussedFilter = (thumbnails, cb) => {
  buttonFilterDiscussed.addEventListener('click', () => {
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    const newArray = thumbnails.slice().sort(compareImage);
    cb(newArray);
  });
};

export { setDefaultFilter, setRandomFilter, setDiscussedFilter };
