function getRandomNumber (min, max) {
  if (min >= 0 && max > min) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  return 'Что-то пошло не так';
}

function getCheckString (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
}

getCheckString('Привет, кекс', 140);

const SIMILAR_PHOTO_COUNT = 25;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артем',
  'Вика',
  'Егор',
  'Катя',
  'Виталик',
  'Олег',
  'Марина',
];

const PHOTO_DESCRIPTIONS = [
  'Я наконец на море',
  'Доброе утро',
  'Мне лень придумывать описание к фото',
  'Утро начинается не с кофе',
  'Отдыхаю',
  'Парам пам пам',
  'Наконец выходные',
  'Собака покакала',
  'Фантазия кончилась',
];

const PHOTO = [];

const CREATE_COMMENT = (commentId) => ({
  id: commentId,
  avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
  message: COMMENTS[getRandomNumber(0, COMMENTS.length -1)],
  name: NAMES[getRandomNumber(0, NAMES.length -1)],
});

const CC = () => {
  const comment = [];
  for (let i = 1; i <= getRandomNumber(1, 3); i++) {
    comment.push(CREATE_COMMENT(i));
  }
  return comment;
};

const CREATE_PHOTO = (photoId) => ({
  id: photoId,
  url: `photos/${  photoId  }.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomNumber(0, PHOTO_DESCRIPTIONS.length -1)],
  likes: getRandomNumber(15, 200),
  comment: CC(),
});

for (let i = 1; i <= SIMILAR_PHOTO_COUNT; i++) {
  PHOTO.push(CREATE_PHOTO(i));
}
