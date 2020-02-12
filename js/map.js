'use strict';

(function () {
  var fillMap = function (objectsList) {
    var objectsFragment = document.createDocumentFragment();
    for (var i = 0; i < objectsList.length; i++) {
      var newPin = window.mappin.create(objectsList[i]);
      objectsFragment.appendChild(newPin);
    }
    document.querySelector('.map__pins').appendChild(objectsFragment);
    document.querySelector('.map').insertBefore(window.mapcard.create(objectsList[0]), document.querySelector('.map__filters-container'));
  };

  document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.form.switchDisable(false);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    }
  });

  document.querySelector('.map__pin--main').addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.form.switchDisable(false);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    }
  });

  window.map = {
    fill: fillMap
  };
})();
