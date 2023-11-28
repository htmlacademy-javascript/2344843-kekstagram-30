import { isEscapeKey } from './util.js';

const COMMENTS_PER_PAGE = 5;

let photosData = [];

function saveData(data) {
  photosData = data;
}

let comments = [];
let currentIndex = 0;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

function openBigPicture() {
  bigPicture.classList.remove('hidden');
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
  fillComments(picture.comments);
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
}

function loadComments() {
  for (let i = 0; i < COMMENTS_PER_PAGE; i++) {
    if (currentIndex >= comments.length) {
      break;
    }

    const comment = comments[currentIndex];
    const сommentElement = createCommentElement(comment);
    commentsContainer.append(сommentElement);

    currentIndex++;
    bigPicture.querySelector('.social__comment-shown-count').textContent = currentIndex;
  }

  if (currentIndex >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}


function fillComments(commentsData) {
  commentsContainer.innerHTML = '';
  currentIndex = 0;
  commentsLoader.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-shown-count').textContent = 0;

  comments = commentsData;
  loadComments(comments);
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
    const picture = photosData.find((element) => element.id === Number(targetId));
    openBigPicture();
    fillBigPicture(picture);
  }
}

picturesContainer.addEventListener('click', onMiniature);
bigPictureCancel.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', loadComments);

export { saveData, photosData };
