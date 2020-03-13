'use strict';

(function () {
  var getPinCoords = function () {
    var deltas = {
      x: window.settings.mapPin.main.width / 2,
      y: window.settings.mapPin.main.height
    };

    var el = document.querySelector('.map__pin--main');
    if (window.form.isDisabled) {
      deltas.y = (window.settings.mapPin.main.height - window.settings.mapPin.main.tail) / 2;
    }

    return {
      x: parseFloat(el.style.left) + deltas.x,
      y: parseFloat(el.style.top) + deltas.y
    };
  };

  var createPin = function (item) {
    var newPin = document.querySelector('#pin').content.cloneNode(true);
    newPin.querySelector('.map__pin').style = 'left: ' + (item.location.x - window.settings.mapPin.width) + 'px; top: ' + (item.location.y - window.settings.mapPin.height) + 'px;';
    newPin.querySelector('img').src = item.author.avatar;
    newPin.querySelector('img').alt = item.offer.title;

    newPin.querySelector('.map__pin').addEventListener('click', function () {
      document.querySelector('.map').insertBefore(window.mapcard.create(item), document.querySelector('.map__filters-container'));
    });
    return newPin;
  };

  var removePins = function () {
    if (document.querySelector('.map__pins .map__pin:not(.map__pin--main)')) {
      var pins = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };

  window.mappin = {
    create: createPin,
    remove: removePins,
    getCoords: getPinCoords
  };
})();
