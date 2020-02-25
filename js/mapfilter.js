'use strict';

(function () {
  var type = document.querySelector('#housing-type');

  type.addEventListener('change', function () {
    window.mapfilter.type = type.value;

    window.map.fill();
  });

  window.mapfilter = {
    type: type.value
  };
})();
