'use strict';

(function () {
  var template = document.querySelector('#pin').content;
  var elMap = document.querySelector('.map');
  var elMapPins = document.querySelector('.map__pins');
  var elMainPin = document.querySelector('.map__pin--main');
  var elFiltersContainer = document.querySelector('.map__filters-container');

  var getPinCoords = function () {
    var deltas = {
      x: window.settings.CONSTANTS.MAP_MAIN_PIN.WIDTH / 2,
      y: window.settings.CONSTANTS.MAP_MAIN_PIN.HEIGHT
    };

    if (window.form.isDisabled) {
      deltas.y = (window.settings.CONSTANTS.MAP_MAIN_PIN.HEIGHT - window.settings.CONSTANTS.MAP_MAIN_PIN.TAIL) / 2;
    }

    return {
      x: parseFloat(elMainPin.style.left) + deltas.x,
      y: parseFloat(elMainPin.style.top) + deltas.y
    };
  };

  var create = function (item) {
    var newPin = template.cloneNode(true);
    var newPinElement = newPin.querySelector('.map__pin');
    var newPinImg = newPin.querySelector('img');

    newPinElement.style = 'left: ' + (item.location.x - window.settings.CONSTANTS.MAP_PIN.WIDTH) + 'px; top: ' + (item.location.y - window.settings.CONSTANTS.MAP_PIN.HEIGHT) + 'px;';
    newPinImg.src = item.author.avatar;
    newPinImg.alt = item.offer.title;

    newPinElement.addEventListener('click', function () {
      elMap.insertBefore(window.mapcard.create(item), elFiltersContainer);
    });
    return newPin;
  };

  var remove = function () {
    if (elMapPins.querySelector('.map__pin:not(.map__pin--main)')) {
      var pins = elMapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  window.mappin = {
    create: create,
    remove: remove,
    getCoords: getPinCoords
  };
})();
