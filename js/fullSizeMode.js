import { similarPictures } from './thumbnails.js';
import { isEscapeKey } from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = userModalElement.querySelector(
  '.big-picture__cancel'
);
const socialComments = userModalElement.querySelector('.social__comments');
const socialComment = userModalElement.querySelector('.social__comment');
const socialCommentCount = userModalElement.querySelector(
  '.social__comment-count'
);
const socialCommentsLoader = userModalElement.querySelector(
  '.social__comments-loader'
);
const pictureArray = document.querySelectorAll('.picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const renderingFullSizePicture = (similarPicturesInfo) => {
  userModalElement.querySelector('.big-picture__img').children[0].src =
    similarPicturesInfo.url;
  userModalElement.querySelector('.likes-count').textContent =
    similarPicturesInfo.likes;
  userModalElement.querySelector('.comments-count').textContent =
    similarPicturesInfo.comments.length;
  userModalElement.querySelector('.social__caption').textContent =
    similarPicturesInfo.description;
};

const updateCountComment = () => {
  const currentCountComments =
    socialComments.children.length -
    document.querySelectorAll('.social__comment.hidden').length;
  const totalCountComments = socialComments.children.length;

  socialCommentCount.innerHTML = `${currentCountComments} из <span class="comments-count">${totalCountComments}</span> комментариев`;

  if (currentCountComments < totalCountComments) {
    socialCommentsLoader.classList.remove('hidden');
  } else {
    socialCommentsLoader.classList.add('hidden');
  }
};

const renderingComments = (comments) => {
  socialComments.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const newComment = socialComment.cloneNode(true);
    if (i >= 5) {
      newComment.classList.add('hidden');
    }
    newComment.querySelector('.social__picture').src = comments[i].avatar;
    newComment.querySelector('.social__picture').alt = comments[i].name;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    socialComments.appendChild(newComment);
  }

  updateCountComment();
};

const loadMoreComments = () => {
  const commentList = Array.from(
    document.querySelectorAll('.social__comment.hidden')
  );

  commentList.forEach((comment, index) => {
    if (index < 5) {
      comment.classList.remove('hidden');
    }
  });

  updateCountComment();
};

function openUserModal(evt) {
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  for (let i = 0; i < pictureArray.length; i++) {
    if (evt.target === pictureArray[i]) {
      renderingFullSizePicture(similarPictures[i]);
      renderingComments(similarPictures[i].comments);
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

socialCommentsLoader.addEventListener('click', () => {
  loadMoreComments();
});
