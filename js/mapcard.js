'use strict';

(function () {
  var createCard = function (item) {
    removeCard();
    var newCard = document.querySelector('#card').content.cloneNode(true);
    newCard.querySelector('.popup__title').innerHTML = item.offer.title;
    newCard.querySelector('.popup__text--address').innerHTML = item.offer.address;
    newCard.querySelector('.popup__text--price').innerHTML = item.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').innerHTML = window.langs.type[item.offer.type];
    newCard.querySelector('.popup__text--capacity').innerHTML = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    if (item.offer.features.length) {
      newCard.querySelector('.popup__features').innerHTML = item.offer.features.reduce(function (accumulator, feature) {
        accumulator += accumulator ? ', ' + window.langs.features[feature] : window.langs.features[feature];
        return accumulator;
      }, '');
    } else {
      newCard.querySelector('.popup').removeChild(newCard.querySelector('.popup__features'));
    }
    newCard.querySelector('.popup__description').innerHTML = item.offer.description;
    if (item.offer.photos.length) {
      var itemPhotos = document.createDocumentFragment();
      for (var i = 0; i < item.offer.photos.length; i++) {
        var photo = newCard.querySelector('.popup__photo').cloneNode();
        photo.src = item.offer.photos[i];
        photo.alt = item.offer.title;
        itemPhotos.appendChild(photo);
      }
      newCard.querySelector('.popup__photos').innerHTML = '';
      newCard.querySelector('.popup__photos').appendChild(itemPhotos);
    } else {
      newCard.querySelector('.popup').removeChild(newCard.querySelector('.popup__photos'));
    }
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
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };

  window.mapcard = {
    create: createCard,
    remove: removeCard
  };
})();
