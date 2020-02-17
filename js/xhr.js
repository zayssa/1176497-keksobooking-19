'use strict';

(function () {
  var getSimilars = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data', false);
    xhr.send();
    if (xhr.status !== 200) {
      return xhr.status + ': ' + xhr.statusText;
    } else {
      return JSON.parse(xhr.responseText);
    }
  };

  window.xhr = {
    getSimilars: getSimilars
  };
})();
