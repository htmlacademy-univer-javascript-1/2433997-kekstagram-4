import { similarPictures } from './thumbnails.js';
import { isEscapeKey } from './util.js';
import './thumbnails.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = userModalElement.querySelector(
  '.big-picture__cancel'
);
const socialCommentCount = userModalElement.querySelector(
  '.social__comment-count'
);
const commentsLoader = userModalElement.querySelector('.comments-loader');

const pictureArray = document.querySelectorAll('.picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const createCommentList = (comment) => {
  const socialComment = document.querySelector('.social__comment');
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;
};

function openUserModal(evt) {
  userModalElement.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  for (let i = 0; i < pictureArray.length; i++) {
    if (evt.target === pictureArray[i]) {
      userModalElement.querySelector('.big-picture__img').children[0].src =
        similarPictures[i].url;
      userModalElement.querySelector('.likes-count').textContent =
        similarPictures[i].likes;
      userModalElement.querySelector('.comments-count').textContent =
        similarPictures[i].comments.length;
      userModalElement.querySelector('.social__caption').textContent =
        similarPictures[i].description;
      similarPictures[i].comments.forEach((comment) => {
        createCommentList(comment);
      });
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalOpenElement.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openUserModal(evt);
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});
