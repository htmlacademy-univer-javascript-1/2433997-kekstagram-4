import { generatePictures } from './data.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer
  .querySelector('.pictures__title')
  .classList.remove('visually-hidden');

const similarPicturesTemplate = document.querySelector('#picture').content;

const similarPictures = generatePictures();
const similarListFragment = document.createDocumentFragment();

similarPictures.forEach((picture) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent =
    picture.comments.length;
  similarListFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(similarListFragment);
