import { isEnterKey, getRandomArrayElement, debounce } from './util.js';
import { renderPictures } from './miniature.js';
import { photosData } from './big-pucture.js';

const RANDOM_ARRAY_ELEMENT_COUNT = 10;
const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterDefaultButton = filters.querySelector('#filter-default');
const filterRandomButton = filters.querySelector('#filter-random');
const filterDiscussedButton = filters.querySelector('#filter-discussed');

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

function getRandomArray(arr) {
  const randomPictures = [];
  let count = RANDOM_ARRAY_ELEMENT_COUNT;
  if (count > arr.length) {
    count = arr.length;
  }
  const tempElements = [...arr];
  for (let i = 0; i < count; i++) {
    const randomElement = getRandomArrayElement(tempElements);
    randomPictures.push(randomElement);
    tempElements.splice(tempElements.indexOf(randomElement), 1);
  }
  return randomPictures;
}

function discussedPhotos(photoA, photoB) {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;

  return rankB - rankA;
}

function getDiscussedArray(arr) {
  return arr.slice().sort(discussedPhotos);
}

function onFiltersButtonMouseup(evt) {
  if (evt.target.closest('.img-filters__button') || isEnterKey(evt)) {
    const activeButton = filters.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.preventDefault();
    evt.target.classList.add('img-filters__button--active');
  }
}

function onFiltersButtonClick() {
  return debounce(
    (evt) => {
      if (evt.target.closest('.img-filters__button') || isEnterKey(evt)) {
        switch (evt.target) {
          case filterDefaultButton:
            renderPictures(photosData);
            break;
          case filterRandomButton:
            renderPictures(getRandomArray(photosData));
            break;
          case filterDiscussedButton:
            renderPictures(getDiscussedArray(photosData));
            break;
        }
      }
    },
    RERENDER_DELAY,
  );
}


filters.addEventListener('click', onFiltersButtonClick());

filters.addEventListener('mouseup', onFiltersButtonMouseup);

export { showFilters };
