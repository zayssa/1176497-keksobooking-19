'use strict';

(function () {
  var clearMap = function () {
    document.querySelector('.map__pins').innerHTML = '';
    window.mapcard.remove();
  };

  var fillMap = function () {
    clearMap();
    var objectsList = window.backend.get('https://js.dump.academy/keksobooking/data');

    var objectsFragment = document.createDocumentFragment();
    for (var i = 0, total = 0; i < objectsList.length && total < window.settings.maxPoints; i++) {
      if (window.mapfilter.type === objectsList[i].offer.type || window.mapfilter.type === 'any') {
        var newPin = window.mappin.create(objectsList[i]);
        objectsFragment.appendChild(newPin);
        total++;
      }
    }

    document.querySelector('.map__pins').appendChild(objectsFragment);
  };

  var unlockMap = function () {
    window.form.switchDisable(false);
    fillMap();
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
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
