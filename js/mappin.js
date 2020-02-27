'use strict';

(function () {
  var PIN_SIZE = {
    width: 64,
    height: 64,
    tail: 23
  };

  var getPinCoords = function () {
    // x - половина ширины метки
    // у - высота метки
    var deltas = {
      x: PIN_SIZE.width / 2,
      y: PIN_SIZE.height + PIN_SIZE.tail
    };
    var el = document.querySelector('.map__pin--main');
    if (window.form.isDisabled) {
      deltas.y = PIN_SIZE.height / 2;
    }

    return {
      x: parseFloat(el.style.left) + deltas.x,
      y: parseFloat(el.style.top) + deltas.y
    };
  };

  var createPin = function (item) {
    var newPin = document.querySelector('#pin').content.cloneNode(true);
    newPin.querySelector('.map__pin').style = 'left: ' + (item.location.x - 25) + 'px; top: ' + (item.location.y - 70) + 'px;';
    newPin.querySelector('img').src = item.author.avatar;
    newPin.querySelector('img').alt = item.offer.title;

    newPin.querySelector('.map__pin').addEventListener('click', function () {
      document.querySelector('.map').insertBefore(window.mapcard.create(item), document.querySelector('.map__filters-container'));
    });
    return newPin;
  };

  window.mappin = {
    create: createPin,
    getCoords: getPinCoords
  };
})();
