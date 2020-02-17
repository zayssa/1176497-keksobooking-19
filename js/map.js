'use strict';

(function () {
  var fillMap = function () {
    var objectsList = window.xhr.getSimilars();

    var objectsFragment = document.createDocumentFragment();
    for (var i = 0; i < objectsList.length; i++) {
      var newPin = window.mappin.create(objectsList[i]);
      objectsFragment.appendChild(newPin);
    }
    document.querySelector('.map__pins').appendChild(objectsFragment);
    document.querySelector('.map').insertBefore(window.mapcard.create(objectsList[0]), document.querySelector('.map__filters-container'));
  };

  var unlockMap = function () {
    window.form.switchDisable(false);
    document.querySelector('.map').classList.remove('map--faded');
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
    fill: fillMap
  };
})();
