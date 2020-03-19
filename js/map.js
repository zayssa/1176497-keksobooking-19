'use strict';

(function () {
  var POINTS_MAX_AMOUNT = 5;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TEXT_FIELDS = ['type', 'rooms', 'guests'];
  var MAP_LIMITS_Y = {
    MIN: window.settings.CONSTANTS.MAP_LIMITS_Y.MIN - window.settings.CONSTANTS.MAP_MAIN_PIN.HEIGHT,
    MAX: window.settings.CONSTANTS.MAP_LIMITS_Y.MAX - window.settings.CONSTANTS.MAP_MAIN_PIN.HEIGHT
  };

  var PRICES = {
    'low': {
      MAX: 9999
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50001
    }
  };

  var elMap = document.querySelector('.map');
  var elMapPins = document.querySelector('.map__pins');
  var elMainPin = document.querySelector('.map__pin--main');
  var elForm = document.querySelector('.ad-form');

  var checkPrice = function (object) {
    if (window.mapfilter.price === 'any') {
      return true;
    }

    var min = PRICES[window.mapfilter.price].MIN || -Infinity;
    var max = PRICES[window.mapfilter.price].MAX || Infinity;

    return object.offer.price >= min && object.offer.price <= max;
  };

  var checkTextFields = function (object) {
    var validFieldsCounter = 0;
    TEXT_FIELDS.forEach(function (field) {
      if (window.mapfilter[field] === object.offer[field].toString() || window.mapfilter[field] === 'any') {
        validFieldsCounter++;
      }
    });
    return validFieldsCounter === TEXT_FIELDS.length;
  };

  var checkFeatures = function (object) {
    var validFeaturesCounter = 0;
    FEATURES.forEach(function (feature) {
      if (object.offer.features.indexOf(feature) > -1 || !window.mapfilter[feature]) {
        validFeaturesCounter++;
      }
    });
    return validFeaturesCounter === FEATURES.length;
  };

  var clearMap = function () {
    window.mapcard.remove();
    window.mappin.remove();
  };

  var fillMap = function () {
    clearMap();
    var objectsList = window.backend.get('https://js.dump.academy/keksobooking/data');

    var objectsFragment = document.createDocumentFragment();
    var objectsCount = 0;
    objectsList.some(function (object) {
      if (objectsCount === POINTS_MAX_AMOUNT) {
        return true;
      }

      if (
        object.offer && checkPrice(object) && checkTextFields(object) && checkFeatures(object)
      ) {
        var newPin = window.mappin.create(object);
        objectsFragment.appendChild(newPin);
        objectsCount++;
      }

      return false;
    });

    elMapPins.appendChild(objectsFragment);
    if (objectsCount) {
      window.mapfilter.switchDisable(false);
      elMap.classList.remove('map--faded');
    }
  };

  var unlockMap = function () {
    window.form.switchDisable(false);
    elForm.classList.remove('ad-form--disabled');
    fillMap();
  };

  var lockMap = function () {
    window.form.switchDisable(true);
    elForm.classList.add('ad-form--disabled');
    clearMap();
    elMap.classList.add('map--faded');
    elMainPin.style.top = window.settings.CONSTANTS.MAP_MAIN_PIN.INITIAL_TOP + 'px';
    elMainPin.style.left = window.settings.CONSTANTS.MAP_MAIN_PIN.INITIAL_LEFT + 'px';
  };

  elMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (window.settings.isDisabled) {
        unlockMap();
      }
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMove = function (moveEvt) {
        var xMin = -window.settings.CONSTANTS.MAP_MAIN_PIN.WIDTH / 2;
        var xMax = elMap.clientWidth - window.settings.CONSTANTS.MAP_MAIN_PIN.WIDTH / 2;

        var deltas = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        elMainPin.style.top = Math.min(MAP_LIMITS_Y.MAX, Math.max(MAP_LIMITS_Y.MIN, (elMainPin.offsetTop - deltas.y))) + 'px';
        elMainPin.style.left = Math.min(xMax, Math.max(xMin, (elMainPin.offsetLeft - deltas.x))) + 'px';
        window.form.fillAddress(window.mappin.getCoords());
      };

      var onRelease = function () {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onRelease);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onRelease);
    }
  });

  elMainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      unlockMap();
    }
  });

  window.map = {
    clear: clearMap,
    fill: fillMap,
    lock: lockMap
  };
})();
