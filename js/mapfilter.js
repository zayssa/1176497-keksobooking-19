'use strict';

(function () {
  var inputs = {
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
    wifi: document.querySelector('#filter-wifi'),
    dishwasher: document.querySelector('#filter-dishwasher'),
    parking: document.querySelector('#filter-parking'),
    washer: document.querySelector('#filter-washer'),
    elevator: document.querySelector('#filter-elevator'),
    conditioner: document.querySelector('#filter-conditioner')
  };

  var keys = Object.keys(inputs);

  var switchDisable = function (flag) {
    var formsList = document.querySelectorAll('.map__filters');
    for (var i = 0; i < formsList.length; i++) {
      var toDisable = formsList[i].querySelectorAll('input, select');
      for (var k = 0; k < toDisable.length; k++) {
        toDisable[k].disabled = flag;
      }
    }
  };

  var exportValues = function () {
    window.mapfilter.type = inputs.type.value;
    window.mapfilter.price = inputs.price.value;
    window.mapfilter.rooms = inputs.rooms.value;
    window.mapfilter.guests = inputs.guests.value;

    window.mapfilter.wifi = inputs.wifi.checked;
    window.mapfilter.dishwasher = inputs.dishwasher.checked;
    window.mapfilter.parking = inputs.parking.checked;
    window.mapfilter.washer = inputs.washer.checked;
    window.mapfilter.elevator = inputs.elevator.checked;
    window.mapfilter.conditioner = inputs.conditioner.checked;
  };

  var debounceTO;
  var debounce = function () {
    clearTimeout(debounceTO);
    debounceTO = setTimeout(function () {
      exportValues();

      window.map.fill();
    }, 500);
  };

  for (var i = 0; i < keys.length; i++) {
    inputs[keys[i]].addEventListener('change', function () {
      debounce();
    });
  }

  window.mapfilter = {
    switchDisable: switchDisable
  };
  exportValues();
})();
