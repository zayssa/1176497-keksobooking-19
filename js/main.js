'use strict';

// var langMaps = {
//   type: {
//     'palace': 'Дворец',
//     'flat': 'Квартира',
//     'house': 'Дом',
//     'bungalo': 'Бунгало'
//   },
//   features: {
//     'wifi': 'Вай-фай',
//     'dishwasher': 'Посудомоечная машина',
//     'parking': 'Парковочное место',
//     'washer': 'Душ',
//     'elevator': 'Лифт',
//     'conditioner': 'Кондиционер'
//   }
// };

// MOCK -- START
// var randomize = function (num) {
//   return Math.floor(Math.random() * num);
// };

// var randomizeArray = function (arr, percentage) {
//   var res = [];
//   for (var j = 0; j < arr.length; j++) {
//     if (Math.random() < percentage) {
//       res.push(arr[j]);
//     }
//   }
//   return res;
// };

// var features = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner'
// ];

// var photos = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];

// var checkin = ['12:00', '13:00', '14:00'];

// var checkout = ['12:00', '13:00', '14:00'];

// var types = ['palace', 'flat', 'house', 'bungalo'];

// var titles = [
//   'Заголовок 1',
//   'Второй заголовок',
//   'Заголовок №3',
//   'Четвертый заголовок',
//   'Заголовок 5',
//   'Шестой заголовок',
//   '7 заголовок',
//   '№8 Заголовок'
// ];

// var descriptions = [
//   'Описание, несколько слов или даже строк',
//   'Несколько слов описания',
//   'Новый отзыв',
//   'Старый отзыв',
//   'Не стоит брать',
//   'Заезжай!',
//   'Описание',
//   'Отзыв'
// ];

// var generateSimilar = function (i) {
//   var location = {
//     x: randomize(document.querySelector('.map').clientWidth), // где взять максимальное число?
//     y: randomize(501) + 130
//   };

//   var similar = {
//     author: {
//       avatar: 'img/avatars/user0' + i + '.png'
//     },
//     offer: {
//       title: titles[i - 1],
//       address: location.x + ', ' + location.y,
//       price: randomize(4500) + 500,
//       type: types[randomize(4)],
//       rooms: randomize(3) + 1,
//       guests: randomize(3) + 1,
//       checkin: checkin[randomize(3)],
//       checkout: checkout[randomize(3)],
//       features: randomizeArray(features, 0.4),
//       description: descriptions[i - 1],
//       photos: randomizeArray(photos, 0.7)
//     },
//     location: location
//   };

//   return similar;
// };

// MOCK -- SUBJECT

// var collectSimilars = function () {
//   var result = [];
//   for (var i = 1; i <= 8; i++) {
//     result.push(generateSimilar(i));
//   }
//   return result;
// };

// MOCK -- END

// var objects = collectSimilars();

// var createPin = function (item) {
//   var newPin = document.querySelector('#pin').content.cloneNode(true);
//   newPin.querySelector('.map__pin').style = 'left: ' + (item.location.x - 25) + 'px; top: ' + (item.location.y - 70) + 'px;';
//   newPin.querySelector('img').src = item.author.avatar;
//   newPin.querySelector('img').alt = item.offer.title;
//   return newPin;
// };

// var createCard = function (item) {
//   var newCard = document.querySelector('#card').content.cloneNode(true);
//   newCard.querySelector('.popup__title').innerHTML = item.offer.title;
//   newCard.querySelector('.popup__text--address').innerHTML = item.offer.address;
//   newCard.querySelector('.popup__text--price').innerHTML = item.offer.price + '₽/ночь';
//   newCard.querySelector('.popup__type').innerHTML = langMaps.type[item.offer.type];
//   newCard.querySelector('.popup__text--capacity').innerHTML = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
//   newCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
//   if (item.offer.features.length) {
//     newCard.querySelector('.popup__features').innerHTML = item.offer.features.reduce(function (accumulator, feature) {
//       accumulator += accumulator ? ', ' + langMaps.features[feature] : langMaps.features[feature];
//       return accumulator;
//     }, '');
//   } else {
//     newCard.querySelector('.popup').removeChild(newCard.querySelector('.popup__features'));
//   }
//   newCard.querySelector('.popup__description').innerHTML = item.offer.description;
//   if (item.offer.photos.length) {
//     var itemPhotos = document.createDocumentFragment();
//     for (var i = 0; i < item.offer.photos.length; i++) {
//       var photo = newCard.querySelector('.popup__photo').cloneNode();
//       photo.src = item.offer.photos[i];
//       photo.alt = item.offer.title;
//       itemPhotos.appendChild(photo);
//     }
//     newCard.querySelector('.popup__photos').innerHTML = '';
//     newCard.querySelector('.popup__photos').appendChild(itemPhotos);
//   } else {
//     newCard.querySelector('.popup').removeChild(newCard.querySelector('.popup__photos'));
//   }
//   newCard.querySelector('.popup__avatar').src = item.author.avatar;
//   return newCard;
// };

// var fillMap = function () {
//   var objectsFragment = document.createDocumentFragment();
//   for (var i = 0; i < objects.length; i++) {
//     var newPin = createPin(objects[i]);
//     objectsFragment.appendChild(newPin);
//   }
//   document.querySelector('.map__pins').appendChild(objectsFragment);
//   document.querySelector('.map').insertBefore(createCard(objects[0]), document.querySelector('.map__filters-container'));
// };

var isPageDisabled;

var toggleFormsDisable = function (flag) {
  var formsList = document.querySelectorAll('.map__filters, .ad-form');
  for (var i = 0; i < formsList.length; i++) {
    var toDisable = formsList[i].querySelectorAll('input, select');
    for (var k = 0; k < toDisable.length; k++) {
      toDisable[k].disabled = flag;
    }
  }
  isPageDisabled = flag;
  fillAddressField(getCurrentPosition());
};

var getCurrentPosition = function () {
  // x - половина ширины метки
  // у - высота метки
  var deltas = {
    x: 32,
    y: 87
  };
  var el = document.querySelector('.map__pin--main');
  if (isPageDisabled) {
    deltas.y = 32;
  }

  return {
    x: parseFloat(el.style.left) + deltas.x,
    y: parseFloat(el.style.top) + deltas.y
  };
};

var fillAddressField = function (coords) {
  document.querySelector('#address').value = coords.x + ', ' + coords.y;
};

toggleFormsDisable(true);
fillAddressField(getCurrentPosition());

document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    toggleFormsDisable(false);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  }
});

document.querySelector('.map__pin--main').addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    toggleFormsDisable(false);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  }
});

//  validation

var validateRoomsAndCapacity = function () {
  var valRooms = document.querySelector('#room_number').value;
  var elCapacity = document.querySelector('#capacity');
  var valCapacity = elCapacity.value;

  elCapacity.setCustomValidity('');

  switch (valRooms) {
    case '1':
      if (valCapacity !== '1') {
        elCapacity.setCustomValidity('Только для 1 гостя');
      }
      break;
    case '2':
      if (valCapacity !== '1' && valCapacity !== '2') {
        elCapacity.setCustomValidity('Только для 1 или 2 гостей');
      }
      break;
    case '3':
      if (valCapacity !== '1' && valCapacity !== '2' && valCapacity !== '3') {
        elCapacity.setCustomValidity('Только для 1, 2 или 3 гостей');
      }
      break;
    case '100':
      if (valCapacity !== '0') {
        elCapacity.setCustomValidity('Не для гостей');
      }
      break;
  }

  document.querySelector('.ad-form').reportValidity();
};

document.querySelector('#room_number').onchange = validateRoomsAndCapacity;
document.querySelector('#capacity').onchange = validateRoomsAndCapacity;
