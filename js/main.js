import {
  createPhotoDescription,
  SIMILAR_PHOTO_DESCRIPTION_COUNT,
} from './data.js';

const similarPhotoDescription = Array.from(
  { length: SIMILAR_PHOTO_DESCRIPTION_COUNT },
  createPhotoDescription
);
