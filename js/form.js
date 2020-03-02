'use strict';

(function () {
  var fillAddress = function (coords) {
    document.querySelector('#address').value = coords.x + ', ' + coords.y;
  };

  var switchDisable = function (flag) {
    var formsList = document.querySelectorAll('.map__filters, .ad-form');
    for (var i = 0; i < formsList.length; i++) {
      var toDisable = formsList[i].querySelectorAll('input, select');
      for (var k = 0; k < toDisable.length; k++) {
        toDisable[k].disabled = flag;
      }
    }
    window.settings.isDisabled = flag;
    fillAddress(window.mappin.getCoords());
  };

  //  validation

  var validateRoomsAndCapacity = function () {
    var valRooms = document.querySelector('#room_number').value;
    var elCapacity = document.querySelector('#capacity');
    var valCapacity = elCapacity.value;

    elCapacity.setCustomValidity('');

    switch (valRooms) {
      case '1':
        if (valCapacity !== '1') {
          elCapacity.setCustomValidity('Только для 1 гостя');
        }
        break;
      case '2':
        if (valCapacity !== '1' && valCapacity !== '2') {
          elCapacity.setCustomValidity('Только для 1 или 2 гостей');
        }
        break;
      case '3':
        if (valCapacity !== '1' && valCapacity !== '2' && valCapacity !== '3') {
          elCapacity.setCustomValidity('Только для 1, 2 или 3 гостей');
        }
        break;
      case '100':
        if (valCapacity !== '0') {
          elCapacity.setCustomValidity('Не для гостей');
        }
        break;
    }

    document.querySelector('.ad-form').reportValidity();
  };

  // var validatePriceAndType = function () {
  //   var valType = document.querySelector('#type');
  //   var elPrice = document.querySelector('#price');

  //   switch (valType) {
  //     case 'palace':
  //       elPrice.min = 10000;
  //       elPrice.placeholder = '10000';
  //       break;
  //     case 'house':
  //       elPrice.min = 5000;
  //       elPrice.placeholder = '5000';
  //       break;
  //     case 'flat':
  //       elPrice.min = 1000;
  //       elPrice.placeholder = '1000';
  //       break;
  //     default:
  //       elPrice.min = 0;
  //       elPrice.placeholder = '0';
  //   }

  //   document.querySelector('.ad-form').reportValidity();
  // };

  // var validateTime = function (evt) {
  //   document.querySelector('#timein').value = evt.target.value;
  //   document.querySelector('#timeout').value = evt.target.value;
  // };

  document.querySelector('#room_number').onchange = validateRoomsAndCapacity;
  document.querySelector('#capacity').onchange = validateRoomsAndCapacity;

  window.form = {
    fillAddress: fillAddress,
    switchDisable: switchDisable
  };
})();
