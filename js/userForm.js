import { isEscapeKey } from './util.js';

const formImageUpload = document.querySelector('.img-upload__form');
const inputImageUpload = formImageUpload.querySelector('.img-upload__input');
const formImageEditing = formImageUpload.querySelector('.img-upload__overlay');
const formImageCancel = formImageUpload.querySelector('#upload-cancel');
const formImageHashtag = formImageUpload.querySelector('.text__hashtags');
const formImageComment = formImageUpload.querySelector('.text__description');
const pristine = new Pristine(formImageUpload);

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

function validateHashtags(value) {
  const regexHashtag = /^#[a-zа-я0-9]{1,19}$/i;
  if (!value) {
    return true;
  }
  const valueArray = value.trim().split(' ');
  if (valueArray.length > 5 || checkForDuplicates(valueArray)) {
    return false;
  }
  return valueArray.every((element) => regexHashtag.test(element));
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

function openImageEditing() {
  formImageEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImageEditing() {
  formImageEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputImageUpload.value = '';
  formImageHashtag.value = '';
  formImageComment.value = '';

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

pristine.addValidator(formImageHashtag, validateHashtags);

pristine.addValidator(formImageComment, validateComments);

formImageUpload.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { formImageUpload };
