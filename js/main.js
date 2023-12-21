import { getData } from './api.js';
import { showAlert, isEscapeKey } from './util.js';
import { createThumbnails } from './thumbnails.js';
import { setUserFormSubmit } from './userForm.js';

const succesMessageTemplate = document.querySelector('#success').content;
const succesMessage = succesMessageTemplate.querySelector('.success');
const succesMessageButton =
  succesMessageTemplate.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const errorMessageButton = errorMessageTemplate.querySelector('.error__button');

const onDocumentKeydownSucces = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onClickOutsideSucces = (evt) => {
  if (!succesMessage.querySelector('.success__inner').contains(evt.target)) {
    closeSuccessMessage();
  }
};

const onClickOutsideError = (evt) => {
  if (!errorMessage.querySelector('.error__inner').contains(evt.target)) {
    closeErrorMessage();
  }
};

function closeSuccessMessage() {
  succesMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownSucces);
  document.removeEventListener('keydown', onClickOutsideSucces);
  succesMessageButton.removeEventListener('click', closeSuccessMessage);
}

function closeErrorMessage() {
  errorMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('keydown', onClickOutsideError);
  errorMessageButton.removeEventListener('click', closeErrorMessage);
}

const onSuccessMessage = () => {
  document.body.append(succesMessage);
  document.addEventListener('keydown', onDocumentKeydownSucces);
  document.addEventListener('click', onClickOutsideSucces);
  succesMessageButton.addEventListener('click', closeSuccessMessage);
};

const onErrorMessage = () => {
  document.body.append(errorMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onClickOutsideError);
  errorMessageButton.addEventListener('click', closeErrorMessage);
};

getData()
  .then((thumbnails) => createThumbnails(thumbnails))
  .catch(() => {
    showAlert('Произошла ошибка запроса на сервер');
  });

setUserFormSubmit(onSuccessMessage, onErrorMessage);
