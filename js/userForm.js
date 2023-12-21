import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { onUserFormEffects, offUserFormEffects } from './userFormEffects.js';

const formImageUpload = document.querySelector('.img-upload__form');
const inputImageUpload = formImageUpload.querySelector('.img-upload__input');
const formImageEditing = formImageUpload.querySelector('.img-upload__overlay');
const formImageCancel = formImageUpload.querySelector('#upload-cancel');
const formImageHashtag = formImageUpload.querySelector('.text__hashtags');
const formImageComment = formImageUpload.querySelector('.text__description');
const submitButton = formImageUpload.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};
const pristine = new Pristine(formImageUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditing();
  }
};

function checkForDuplicates(arr) {
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    if (seen[arr[i]]) {
      return true;
    } else {
      seen[arr[i]] = true;
    }
  }
  return false;
}

function validateRegexHashtags(value) {
  const regexHashtag = /^#[a-zа-я0-9]{1,19}$/i;
  if (!value) {
    return true;
  }
  const valueArray = value.trim().split(' ');
  return valueArray.every((element) => regexHashtag.test(element));
}

function validateUniqeHashtags(value) {
  const valueArray = value.trim().split(' ');
  if (!checkForDuplicates(valueArray)) {
    return true;
  }
}

function validateNumberHashtags(value) {
  const valueArray = value.trim().split(' ');
  if (valueArray.length <= 5) {
    return true;
  }
}

function validateComments(value) {
  if (!value) {
    return true;
  }
  if (value.length > 140) {
    return false;
  }
  return true;
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function openImageEditing() {
  formImageEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');
  onUserFormEffects();

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImageEditing() {
  formImageEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputImageUpload.value = '';
  formImageHashtag.value = '';
  formImageComment.value = '';
  offUserFormEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
}

inputImageUpload.addEventListener('change', () => {
  openImageEditing();
});

formImageCancel.addEventListener('click', () => {
  closeImageEditing();
});

formImageHashtag.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

formImageComment.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

pristine.addValidator(
  formImageHashtag,
  validateRegexHashtags,
  'введён невалидный хэш-тег'
);
pristine.addValidator(
  formImageHashtag,
  validateUniqeHashtags,
  'хэш-теги повторяются'
);
pristine.addValidator(
  formImageHashtag,
  validateNumberHashtags,
  'превышено количество хэш-тегов'
);

pristine.addValidator(
  formImageComment,
  validateComments,
  'Длина комментария больше 140 символов'
);

function setUserFormSubmit(onSuccess, onError) {
  formImageUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(closeImageEditing)
        .catch(() => {
          formImageEditing.classList.add('hidden');
          document.body.classList.remove('modal-open');
          inputImageUpload.value = '';

          document.removeEventListener('keydown', onDocumentKeydown);
          onError();
        })
        .finally(unblockSubmitButton);
    }
  });
}

export { setUserFormSubmit };
