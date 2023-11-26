import {getRandomElement, getId, getRandomInt} from './util.js';

const commentId = getId(1, 1000);

// Функция для генерации комментария
function generateComment() {
  const id = commentId();
  const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const message = getRandomElement(messages);
  const names = ['Роман', 'Максим', 'Володя', 'Наташа', 'Борис', 'Ева'];
  const name = getRandomElement(names);

  return {
    id,
    avatar,
    message,
    name,
  };
}

// Функция для генерации фотографии
function generatePhoto(id) {
  const url = `photos/${id}.jpg`;
  const descriptions = [
    'Замечательный вид!',
    'Красота в каждой детали',
    'Момент запечатлён!',
    'Настроение мгновенно лучше',
    'Прекрасный день',
    'Так приятно было увидеть это',
    'Фотогеничное место',
    'Очаровательная атмосфера',
    'Без слов',
    'Приятные воспоминания'
  ];
  const description = getRandomElement(descriptions);
  const likes = getRandomInt(15, 200);
  const comments = Array.from({ length: getRandomInt(0, 30) }, generateComment);

  return {
    id,
    url,
    description,
    likes,
    comments,
  };
}

const photos = Array.from({ length: 25 }, (_,i) => generatePhoto(i + 1));
export {photos};
