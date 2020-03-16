'use strict';

(function () {
  var OFFER_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var OFFER_FEATURES = {
    'wifi': 'Вай-фай',
    'dishwasher': 'Посудомоечная машина',
    'parking': 'Парковочное место',
    'washer': 'Душ',
    'elevator': 'Лифт',
    'conditioner': 'Кондиционер'
  };

  var template = document.querySelector('#card').content;

  var renderFeatures = function (el, offer) {
    if (offer.features.length) {
      el.querySelector('.popup__features').textContent = offer.features.reduce(function (accumulator, feature) {
        accumulator += accumulator ? ', ' + OFFER_FEATURES[feature] : OFFER_FEATURES[feature];
        return accumulator;
      }, '');
    } else {
      el.querySelector('.popup').removeChild(el.querySelector('.popup__features'));
    }
  };

  var renderPhotos = function (el, offer) {
    if (offer.photos.length) {
      var itemPhotos = document.createDocumentFragment();
      var itemPhotosTemplate = el.querySelector('.popup__photo');
      offer.photos.forEach(function (photo) {
        var photoTemplate = itemPhotosTemplate.cloneNode();
        photoTemplate.src = photo;
        photoTemplate.alt = offer.title;
        itemPhotos.appendChild(photoTemplate);
      });
      el.querySelector('.popup__photos').innerHTML = '';
      el.querySelector('.popup__photos').appendChild(itemPhotos);
    } else {
      el.querySelector('.popup').removeChild(el.querySelector('.popup__photos'));
    }
  };

  var createCard = function (item) {
    removeCard();

    var newCard = template.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = item.offer.title;
    newCard.querySelector('.popup__text--address').textContent = item.offer.address;
    newCard.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = OFFER_TYPES[item.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;

    renderFeatures(newCard, item.offer);

    newCard.querySelector('.popup__description').textContent = item.offer.description;

    renderPhotos(newCard, item.offer);

    newCard.querySelector('.popup__avatar').src = item.author.avatar;

    newCard.querySelector('.popup__close').addEventListener('click', removeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removeCard();
      }
    });

    return newCard;
  };

  var removeCard = function () {
    var elMap = document.querySelector('.map__card');
    if (elMap) {
      elMap.remove();
    }
  };

  window.mapcard = {
    create: createCard,
    remove: removeCard
  };
})();
