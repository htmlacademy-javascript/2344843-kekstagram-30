import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showAlert, isAlertOpen } from './alert.js';

const HASHTAG_REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const effectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function showModal() {
  imgUploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEsc);

  effectLevel.classList.add('hidden');
}

function hideModal() {
  imgUploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEsc);

  imgUploadPreview.style.removeProperty('transform');
  imgUploadPreview.style.removeProperty('filter');
  imgUploadInput.value = '';
  imgUploadForm.reset();
}

function onDocumentEsc(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isAlertOpen) {
    evt.preventDefault();
    hideModal();
  }
}

function validateCommentField(value) {
  return value.length <= 140;
}

function validateHashtagField(value) {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value.split(' ');
  let isValid = true;

  hashtags.forEach((element) => {
    if (!HASHTAG_REGULAR_EXPRESSION.test(element)) {
      isValid = false;
    }
  });

  return isValid;
}

function checksHashtagsForRepetition(value) {
  const hashtags = value.split(' ');
  const newHashtags = [];
  let isValid = true;

  hashtags.forEach((element) => {
    if (newHashtags.indexOf(element.toLowerCase()) !== -1) {
      isValid = false;
    } else {
      newHashtags.push(element.toLowerCase());
    }
  });

  return isValid;
}

function checksHashtagsCount(value) {
  const arrayHashtags = value.split(' ');
  return arrayHashtags.length <= 5;
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

function setUserFormSubmit(onSuccess) {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showAlert('success');
        })
        .catch((error) => {
          showAlert('error');
          window.console.log(error);
        })
        .finally(unblockSubmitButton);
    }
  });
}
pristine.addValidator(commentField, validateCommentField, 'Длина комментария больше 140 символов', 1, false);
pristine.addValidator(hashtagField, validateHashtagField, 'Хэш-тег должен начинаться с #, и иметь от 1 до 19 символов после #, хэш-теги должны быть разделены пробелом', 3, false);
pristine.addValidator(hashtagField, checksHashtagsForRepetition, 'Хэш-теги не должны повторяться', 2, false);
pristine.addValidator(hashtagField, checksHashtagsCount, 'Превышено количество хэш-тегов, максимум 5', 1, false);

imgUploadInput.addEventListener('change', showModal);
imgUploadCancel.addEventListener('click', hideModal);

export { setUserFormSubmit, hideModal };
