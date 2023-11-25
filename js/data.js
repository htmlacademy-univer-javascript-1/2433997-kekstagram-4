import {
  getRandomInteger,
  getRandomId,
  getRandomArrayElement,
} from './utils.js';

const SIMILAR_PICTURES_COUNT = 25;

const MESSAGE_SUGGESSTIONS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Сергей',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getRandomPhotoId = getRandomId(1, 25);
const getRandomCommentsId = getRandomId(1, Number.MAX_SAFE_INTEGER);

const createComments = () => ({
  id: getRandomCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE_SUGGESSTIONS),
  name: getRandomArrayElement(NAMES),
});

const generatePicture = () => {
  const id = getRandomPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Описание фото номер ${id}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComments),
  };
};

const generatePictures = () =>
  Array.from({ length: SIMILAR_PICTURES_COUNT }, generatePicture);

export { generatePictures };
