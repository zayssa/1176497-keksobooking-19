'use strict';

var randomize = function (num) {
  return Math.floor(Math.random() * num);
};

var generateSimilars = function () {
  var result = [];
  for (var i = 1; i <= 8; i++) {
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
    var location = {
      x: randomize(1000), // где взять максимальное число?
      y: randomize(501) + 130
    };

    var temp = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'какое-то объявление',
        address: location.x + ', ' + location.y,
        price: randomize(4500) + 500,
        type: ['palace', 'flat', 'house', 'bungalo'][randomize(4)],
        rooms: randomize(3) + 1,
        guests: randomize(3) + 1,
        checkin: ['12:00', '13:00', '14:00'][randomize(3)],
        checkout: ['12:00', '13:00', '14:00'][randomize(3)],
        features: (function () {
          var res = [];
          for (var j = 0; j < features.length; j++) {
            if (Math.random() > 0.6) {
              res.push(features[j]);
            }
          }
          return res;
        })(),
        description: 'описание, несколько слов или даже строк',
        photos: (function () {
          var res = [];
          for (var j = 0; j < photos.length; j++) {
            if (Math.random() > 0.3) {
              res.push(photos[j]);
            }
          }
          return res;
        })()
      },
      location: location
    };

    result.push(temp);
  }
  return result;
};

var createPin = function (item) {
  var newPin = document.querySelector('#pin').content.cloneNode(true);
  newPin.querySelector('.map__pin').style = 'left: ' + (item.location.x - 20) + 'px; top: ' + (item.location.y - 40) + 'px;';
  newPin.querySelector('img').src = item.author.avatar;
  newPin.querySelector('img').alt = item.offer.title;
  return newPin;
};

var fillMap = function () {
  var objects = generateSimilars();

  var objectsFragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    var newPin = createPin(objects[i]);

    objectsFragment.appendChild(newPin);
  }

  document.querySelector('.map__pins').appendChild(objectsFragment);
};

document.querySelector('.map').classList.remove('map--faded');

fillMap();
