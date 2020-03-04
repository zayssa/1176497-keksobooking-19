'use strict';

(function () {
  var switchDisable = function (flag) {
    var formsList = document.querySelectorAll('.map__filters');
    for (var i = 0; i < formsList.length; i++) {
      var toDisable = formsList[i].querySelectorAll('input, select');
      for (var k = 0; k < toDisable.length; k++) {
        toDisable[k].disabled = flag;
      }
    }
  };

  var type = document.querySelector('#housing-type');

  type.addEventListener('change', function () {
    window.mapfilter.type = type.value;

    window.map.fill();
  });

  window.mapfilter = {
    switchDisable: switchDisable,
    type: type.value
  };
})();
