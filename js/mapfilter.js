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

  var switchDisable = function (flag) {
    var toDisable = document.querySelector('.map__filters').querySelectorAll('input, select');
    toDisable.forEach(function (el) {
      el.disabled = flag;
    });
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

  var keys = Object.keys(inputs);
  keys.forEach(function (key) {
    inputs[key].addEventListener('change', function () {
      window.utils.debounce(function () {
        exportValues();
        window.map.fill();
      }, window.settings.DEBOUNCE_DELAY);
    });
  });

  window.mapfilter = {
    switchDisable: switchDisable
  };
  exportValues();
})();
