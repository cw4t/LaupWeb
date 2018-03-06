'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ajax = (function ($) {
  var Ajax = (function () {
    function Ajax() {
      _classCallCheck(this, Ajax);
    }

    _createClass(Ajax, null, [{
      key: 'do',
      value: function _do(method, url) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var async = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
        var success = arguments.length <= 4 || arguments[4] === undefined ? function () {} : arguments[4];
        var error = arguments.length <= 5 || arguments[5] === undefined ? function (jqXHR, textStatus, errorThrown) {
          console.log('ajax error');
          var err_msg = jqXHR.responseJSON['msg'];
          alert(err_msg);
          return false;
        } : arguments[5];

        method = method.toUpperCase();
        if (method != 'GET' && method != 'POST') {
          alert('method必须为GET或POST，当前为' + method);
          return false;
        }
        console.log(method + ' - ' + url);
        $.ajax(url, {
          dataType: 'json',
          cache: false,
          data: JSON.stringify(data),
          contentType: "application/json",
          method: method,
          processdata: false,
          async: async,
          error: error,
          success: success
        });
      }
    }, {
      key: 'file',
      value: function file(url, data) {
        var async = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var success = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];
        var error = arguments.length <= 4 || arguments[4] === undefined ? function (jqXHR, textStatus, errorThrown) {
          var err_msg = jqXHR.responseJSON['msg'];
          alert(err_msg);
          return false;
        } : arguments[4];

        console.log('POST - ' + url);
        $.ajax(url, {
          enctype: 'multipart/form-data',
          data: data,
          method: "POST",
          cache: false,
          processData: false,
          contentType: false,
          async: async,
          error: error,
          success: success
        });
      }
    }, {
      key: 'get',
      value: function get(url) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var async = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
        var success = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];
        var error = arguments.length <= 4 || arguments[4] === undefined ? function (jqXHR, textStatus, errorThrown) {
          var err_msg = jqXHR.responseJSON['msg'];
          alert(err_msg);
          return false;
        } : arguments[4];

        this['do']("GET", url, data, async, success, error);
      }
    }, {
      key: 'post',
      value: function post(url) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var async = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
        var success = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];
        var error = arguments.length <= 4 || arguments[4] === undefined ? function (jqXHR, textStatus, errorThrown) {
          var err_msg = jqXHR.responseJSON['msg'];
          alert(err_msg);
          return false;
        } : arguments[4];

        this['do']("POST", url, data, async, success, error);
      }
    }]);

    return Ajax;
  })();

  return Ajax;
})(jQuery);
//# sourceMappingURL=ajax.js.map
