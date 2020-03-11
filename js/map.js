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

  document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      unlockMap();
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
