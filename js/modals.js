'use strict';

(function () {
  var modals = {
    success: document.querySelector('#success'),
    error: document.querySelector('#error')
  };

  var hideModal = function () {
    document.querySelector('.success, .error').remove();

    document.querySelector('body').removeEventListener('click', hideModalByClick);
    document.querySelector('body').removeEventListener('keydown', hideModalByEscape);
  };

  var hideModalByClick = function () {
    hideModal();
  };

  var hideModalByEscape = function (evt) {
    if (evt.key === 'Escape') {
      hideModal();
    }
  };

  var showModal = function (type) {
    var modal = modals[type].content.cloneNode(true);
    document.querySelector('main').appendChild(modal);

    document.querySelector('body').addEventListener('click', hideModalByClick);
    document.querySelector('body').addEventListener('keydown', hideModalByEscape);
  };

  window.modals = {
    show: showModal
  };
})();
