'use strict';


(function () {
  window.settings = {
    isDisabled: true,
    maxPoints: 5,
    delay: 500,
    mapPin: {
      width: 50,
      height: 70,
      main: {
        width: 64,
        height: 87,
        tail: 23
      }
    }
  };

  window.settings.mapLimitY = {
    min: 130 - window.settings.mapPin.main.height,
    max: 630 - window.settings.mapPin.main.height
  };
})();

