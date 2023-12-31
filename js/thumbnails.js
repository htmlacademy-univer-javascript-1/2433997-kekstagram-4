import { createFullSizeThumbnails } from './fullSizeThumbnails.js';

const picturesContainer = document.querySelector('.pictures');

const similarPicturesTemplate = document.querySelector('#picture').content;

function createThumbnails(similarPictures) {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());

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

  createFullSizeThumbnails(similarPictures);
}

export { createThumbnails };
