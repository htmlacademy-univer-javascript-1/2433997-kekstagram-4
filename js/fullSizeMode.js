import { similarPictures } from './thumbnails.js';
import { isEscapeKey } from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = userModalElement.querySelector(
  '.big-picture__cancel'
);
const socialComment = userModalElement.querySelector('.social__comment');
const socialComments = userModalElement.querySelector('.social__comments');
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

const renderingComments = (comment) => {
  const newComment = socialComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
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
        socialComments.appendChild(renderingComments(comment));
      });
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
