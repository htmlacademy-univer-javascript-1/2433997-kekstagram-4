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

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomId, getRandomArrayElement, isEscapeKey };
