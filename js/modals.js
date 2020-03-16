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

    elBody.removeEventListener('click', clickHandler);
    elBody.removeEventListener('keydown', keydownHandler);
  };

  var clickHandler = function () {
    hideModal();
  };

  var keydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      hideModal();
    }
  };

  var showModal = function (type) {
    var modal = modals[type].content.cloneNode(true);
    elMain.appendChild(modal);

    elBody.addEventListener('click', clickHandler);
    elBody.addEventListener('keydown', keydownHandler);
  };

  window.modals = {
    show: showModal
  };
})();
