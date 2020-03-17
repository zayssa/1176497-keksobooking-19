'use strict';

(function () {
  var elBody = document.querySelector('body');
  var elMain = document.querySelector('main');

  var modals = {
    success: document.querySelector('#success'),
    error: document.querySelector('#error')
  };

  var hideModal = function () {
    document.querySelector('.success, .error').remove();

    elBody.removeEventListener('click', onClick);
    elBody.removeEventListener('keydown', onKeydown);
  };

  var onClick = function () {
    hideModal();
  };

  var onKeydown = function (evt) {
    if (evt.key === 'Escape') {
      hideModal();
    }
  };

  var showModal = function (type) {
    var modal = modals[type].content.cloneNode(true);
    elMain.appendChild(modal);

    elBody.addEventListener('click', onClick);
    elBody.addEventListener('keydown', onKeydown);
  };

  window.modals = {
    show: showModal
  };
})();
