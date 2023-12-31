import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showAlert, isAlertOpen } from './alert.js';

const HASHTAG_REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

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
const effectsPreview = document.querySelectorAll('.effects__preview');
const effectLevelValue = document.querySelector('.effect-level__value');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

function isTextFieldFocused() {
  return document.activeElement === hashtagField ||
    document.activeElement === commentField;
}

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
  effectLevelValue.setAttribute('value', '');
  imgUploadForm.reset();
  pristine.reset();
}

function onDocumentEsc(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isAlertOpen) {
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButton() {
  hideModal();
}

function validateCommentField(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

function validateHashtagField(value) {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value.split(' ').filter(Boolean);
  let isValid = true;

  hashtags.forEach((element) => {
    if (!HASHTAG_REGULAR_EXPRESSION.test(element)) {
      isValid = false;
    }
  });

  return isValid;
}

function checksHashtagsForRepetition(value) {
  const hashtags = value.split(' ').filter(Boolean);
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
  const arrayHashtags = value.split(' ').filter(Boolean);
  return arrayHashtags.length <= MAX_HASHTAGS_COUNT;
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
        .catch(() => {
          showAlert('error');
        })
        .finally(unblockSubmitButton);
    }
  });
}

function onChooseFile() {
  if (this.files && this.files[0]) {
    const file = this.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imgUploadPreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((element) => {
        element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
      showModal();
    }
  }
}
pristine.addValidator(commentField, validateCommentField, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`, 1, false);
pristine.addValidator(hashtagField, validateHashtagField, 'Хэш-тег должен начинаться с #, и иметь от 1 до 19 символов после #, хэш-теги должны быть разделены пробелом', 3, false);
pristine.addValidator(hashtagField, checksHashtagsForRepetition, 'Хэш-теги не должны повторяться', 2, false);
pristine.addValidator(hashtagField, checksHashtagsCount, `Превышено количество хэш-тегов, максимум ${MAX_HASHTAGS_COUNT}`, 1, false);

imgUploadInput.addEventListener('change', onChooseFile);
imgUploadCancel.addEventListener('click', onCancelButton);

export { setUserFormSubmit, hideModal };
