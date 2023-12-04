// Функция для генерации случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для выбора случайного элемента из массива
function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function isEnterKey(evt) {
  return evt.key === 'Enter';
}

export { getRandomElement, debounce, getRandomArrayElement, getRandomInt, isEnterKey, isEscapeKey };
