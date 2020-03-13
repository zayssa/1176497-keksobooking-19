'use strict';

(function () {
  var clearMap = function () {
    window.mapcard.remove();
    window.mappin.remove();
  };

  var fillMap = function () {
    clearMap();
    var objectsList = window.backend.get('https://js.dump.academy/keksobooking/data');

    var objectsFragment = document.createDocumentFragment();
    var total = 0;
    for (var i = 0; i < objectsList.length && total < window.settings.maxPoints; i++) {
      if (
        objectsList[i].offer
        && (window.mapfilter.type === objectsList[i].offer.type || window.mapfilter.type === 'any')
        && (
          window.mapfilter.price === 'low' && objectsList[i].offer.price < 10000
          || window.mapfilter.price === 'middle' && objectsList[i].offer.price >= 10000 && objectsList[i].offer.price <= 50000
          || window.mapfilter.price === 'high' && objectsList[i].offer.price > 50000
          || window.mapfilter.price === 'any'
        )
        && (window.mapfilter.rooms === objectsList[i].offer.rooms.toString() || window.mapfilter.rooms === 'any')
        && (window.mapfilter.guests === objectsList[i].offer.guests.toString() || window.mapfilter.guests === 'any')
        && (objectsList[i].offer.features.indexOf('wifi') > -1 || !window.mapfilter.wifi)
        && (objectsList[i].offer.features.indexOf('dishwasher') > -1 || !window.mapfilter.dishwasher)
        && (objectsList[i].offer.features.indexOf('parking') > -1 || !window.mapfilter.parking)
        && (objectsList[i].offer.features.indexOf('washer') > -1 || !window.mapfilter.washer)
        && (objectsList[i].offer.features.indexOf('elevator') > -1 || !window.mapfilter.elevator)
        && (objectsList[i].offer.features.indexOf('conditioner') > -1 || !window.mapfilter.conditioner)
      ) {
        var newPin = window.mappin.create(objectsList[i]);
        objectsFragment.appendChild(newPin);
        total++;
      }
    }

    document.querySelector('.map__pins').appendChild(objectsFragment);
    if (total) {
      window.mapfilter.switchDisable(false);
      document.querySelector('.map').classList.remove('map--faded');
    }
  };

  var unlockMap = function () {
    window.form.switchDisable(false);
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    fillMap();
  };

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (window.settings.isDisabled) {
        unlockMap();
      } else {
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMove = function (moveEvt) {
          var elMap = document.querySelector('.map');
          var xMin = -window.settings.mapPin.main.width / 2;
          var xMax = elMap.clientWidth - window.settings.mapPin.main.width / 2;

          var deltas = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          mainPin.style.top = Math.min(window.settings.mapLimitY.max, Math.max(window.settings.mapLimitY.min, (mainPin.offsetTop - deltas.y))) + 'px';
          mainPin.style.left = Math.min(xMax, Math.max(xMin, (mainPin.offsetLeft - deltas.x))) + 'px';
          window.form.fillAddress(window.mappin.getCoords());
        };

        var onRelease = function () {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onRelease);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onRelease);
      }
    }
  });

  document.querySelector('.map__pin--main').addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      unlockMap();
    }
  });

  window.map = {
    clear: clearMap,
    fill: fillMap
  };
})();
