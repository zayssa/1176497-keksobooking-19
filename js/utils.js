'use strict';

(function () {
  var debounceTO;
  var debounce = function (callback, delay) {
    clearTimeout(debounceTO);
    debounceTO = setTimeout(function () {
      callback();
    }, delay);
  };

  window.utils = {
    debounce: debounce
  };
})();

