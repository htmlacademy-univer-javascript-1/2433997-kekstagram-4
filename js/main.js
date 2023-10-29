const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomId = (a, b) => {
  const arrayId = [];
  return function () {
    let id = getRandomInteger(a, b);

    while (arrayId.includes(id)) {
      id = getRandomInteger(a, b);
    }

    arrayId.push(id);
    return id;
  };
};

const getRandomPhotoId = getRandomId(1, 25);
const getRandomCommentsId = getRandomId(1, Number.MAX_SAFE_INTEGER);

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createComments = () => ({
  id: getRandomCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE_SUGGESSTIONS),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => {
  const id = getRandomPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Описание фото номер ${id}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComments),
  };
};

const similarPhotoDescription = Array.from(
  { length: SIMILAR_PHOTO_DESCRIPTION_COUNT },
  createPhotoDescription
);
