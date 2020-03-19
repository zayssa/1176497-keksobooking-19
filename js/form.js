'use strict';

(function () {
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;

  var PRICES_BY_TYPE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var elForm = document.querySelector('.ad-form');
  var elAddress = document.querySelector('#address');
  var elRooms = document.querySelector('#room_number');
  var elCapacity = document.querySelector('#capacity');
  var elType = document.querySelector('#type');
  var elPrice = document.querySelector('#price');
  var elTimeIn = document.querySelector('#timein');
  var elTimeOut = document.querySelector('#timeout');
  var elPhoto = document.querySelector('#images');
  var elPhotoContainer = document.querySelector('.ad-form__photo');
  var elAvatar = document.querySelector('#avatar');
  var elAvatarImage = document.querySelector('.ad-form-header__preview img');
  var toDisable = elForm.querySelectorAll('input, select');

  var fillAddress = function (coords) {
    elAddress.value = coords.x + ', ' + coords.y;
  };

  var switchDisable = function (flag) {
    toDisable.forEach(function (el) {
      el.disabled = flag;
    });

    window.settings.isDisabled = flag;
    fillAddress(window.mappin.getCoords());
  };

  var resetForm = function () {
    elForm.reset();
    elPhotoContainer.innerHTML = '';
    elAvatarImage.src = AVATAR_DEFAULT;
    fillAddress(window.mappin.getCoords());
  };

  var onSubmit = function () {
    resetForm();
    window.mapfilter.reset();
    window.map.lock();
  };

  var readURL = function (input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        target.src = evt.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  var onPhotoSelect = function () {
    var newPhoto = document.createElement('img');
    newPhoto.width = PHOTO_WIDTH;
    newPhoto.height = PHOTO_HEIGHT;
    readURL(elPhoto, newPhoto);
    elPhotoContainer.innerHTML = '';
    elPhotoContainer.appendChild(newPhoto);
  };

  elPhoto.onchange = onPhotoSelect;

  var onAvatarSelect = function () {
    readURL(elAvatar, elAvatarImage);
  };

  elAvatar.onchange = onAvatarSelect;

  //  validation

  var validateRoomsAndCapacity = function () {
    var valRooms = elRooms.value;
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

    elCapacity.reportValidity();
  };

  var validatePriceAndType = function () {
    var valType = elType.value;

    elPrice.min = PRICES_BY_TYPE[valType];
    elPrice.placeholder = PRICES_BY_TYPE[valType];

    elPrice.reportValidity();
  };

  var setEqualTime = function (evt) {
    elTimeIn.value = evt.target.value;
    elTimeOut.value = evt.target.value;
  };

  elRooms.onchange = validateRoomsAndCapacity;
  elCapacity.onchange = validateRoomsAndCapacity;

  elTimeIn.onchange = setEqualTime;
  elTimeOut.onchange = setEqualTime;

  elType.onchange = validatePriceAndType;
  elPrice.onchange = validatePriceAndType;

  elForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateRoomsAndCapacity();
    if (!elForm.querySelector(':invalid')) {
      var data = new FormData(elForm);
      window.backend.post('https://js.dump.academy/keksobooking', data, function () {
        onSubmit();
        window.modals.show('success');
      }, function () {
        window.modals.show('error');
      });
    }
  });

  window.form = {
    fillAddress: fillAddress,
    switchDisable: switchDisable
  };
})();
