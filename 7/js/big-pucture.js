import { photos } from './data.js';
import { isEscapeKey } from './util.js';

const data = photos;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCountContainer = bigPicture.querySelector('.social__comment-count');
const body = document.querySelector('body');

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  commentsCountContainer.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEsc);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEsc);
}

function onDocumentEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function fillBigPicture(picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = bigPicture.querySelectorAll('.social__comment:not(.hidden)').length;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
}

function renderComments(comments) {
  commentsContainer.innerHTML = '';
  const commentsContainerFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const сommentElement = createCommentElement(comment);
    commentsContainerFragment.append(сommentElement);
  });

  commentsContainer.append(commentsContainerFragment);
}

function createCommentElement(comment) {
  const сommentElement = commentTemplate.cloneNode(true);
  сommentElement.querySelector('.social__picture').src = comment.avatar;
  сommentElement.querySelector('.social__picture').alt = comment.name;
  сommentElement.querySelector('.social__text').textContent = comment.message;


  return сommentElement;
}

function onMiniature(evt) {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const targetId = evt.target.closest('.picture').id;
    const picture = data.find((element) => element.id === Number(targetId));
    openBigPicture();
    renderComments(picture.comments);
    fillBigPicture(picture);
  }
}

picturesContainer.addEventListener('click', onMiniature);
bigPictureCancel.addEventListener('click', closeBigPicture);
