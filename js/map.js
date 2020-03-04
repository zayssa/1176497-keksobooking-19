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
      if (objectsList[i].offer && (window.mapfilter.type === objectsList[i].offer.type || window.mapfilter.type === 'any')) {
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
