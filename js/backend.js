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

  var post = function (src, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', src, false);
    xhr.send(data);
    return xhr.status;
  };

  window.backend = {
    get: get,
    post: post
  };
})();
