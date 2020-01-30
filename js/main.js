'use strict';

// MOCK -- START

var randomize = function (num) {
  return Math.floor(Math.random() * num);
};

var randomizeArray = function (arr, percentage) {
  var res = [];
  for (var j = 0; j < arr.length; j++) {
    if (Math.random() < percentage) {
      res.push(arr[j]);
    }
  }
  return res;
};

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var checkin = ['12:00', '13:00', '14:00'];

var checkout = ['12:00', '13:00', '14:00'];

var types = ['palace', 'flat', 'house', 'bungalo'];

var titles = [
  'Заголовок 1',
  'Второй заголовок',
  'Заголовок №3',
  'Четвертый заголовок',
  'Заголовок 5',
  'Шестой заголовок',
  '7 заголовок',
  '№8 Заголовок'
];

var descriptions = [
  'Описание, несколько слов или даже строк',
  'Несколько слов описания',
  'Новый отзыв',
  'Старый отзыв',
  'Не стоит брать',
  'Заезжай!',
  'Описание',
  'Отзыв'
];

var generateSimilar = function (i) {
  var location = {
    x: randomize(document.querySelector('.map').clientWidth), // где взять максимальное число?
    y: randomize(501) + 130
  };

  var similar = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titles[i - 1],
      address: location.x + ', ' + location.y,
      price: randomize(4500) + 500,
      type: types[randomize(4)],
      rooms: randomize(3) + 1,
      guests: randomize(3) + 1,
      checkin: checkin[randomize(3)],
      checkout: checkout[randomize(3)],
      features: randomizeArray(features, 0.4),
      description: descriptions[i - 1],
      photos: randomizeArray(photos, 0.7)
    },
    location: location
  };

  return similar;
};

// MOCK -- SUBJECT

var collectSimilars = function () {
  var result = [];
  for (var i = 1; i <= 8; i++) {
    result.push(generateSimilar(i));
  }
  return result;
};

// MOCK -- END

var createPin = function (item) {
  var newPin = document.querySelector('#pin').content.cloneNode(true);
  newPin.querySelector('.map__pin').style = 'left: ' + (item.location.x - 25) + 'px; top: ' + (item.location.y - 70) + 'px;';
  newPin.querySelector('img').src = item.author.avatar;
  newPin.querySelector('img').alt = item.offer.title;
  return newPin;
};

var fillMap = function () {
  var objects = collectSimilars();

  var objectsFragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    var newPin = createPin(objects[i]);

    objectsFragment.appendChild(newPin);
  }

  document.querySelector('.map__pins').appendChild(objectsFragment);
};

document.querySelector('.map').classList.remove('map--faded');

fillMap();
