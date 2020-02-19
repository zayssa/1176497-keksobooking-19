'use strict';

(function () {
  var get = function (src) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, false);
    xhr.send();
    if (xhr.status !== 200) {
      return xhr.status + ': ' + xhr.statusText;
    } else {
      return JSON.parse(xhr.responseText);
    }
  };

  window.backend = {
    get: get
  };
})();
