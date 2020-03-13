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

  var post = function (src, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', src, false);
    xhr.send(data);
    switch (xhr.status) {
      case 200:
        successCallback();
        break;
      default:
        errorCallback();
    }
    return xhr.status;
  };

  window.backend = {
    get: get,
    post: post
  };
})();
