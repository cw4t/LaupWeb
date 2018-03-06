'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var userInfoCache = {};

var Auth = (function ($) {

  var USER_INFO_URL = '/v2/ajax/auth/info';
  var LOGIN_PAGE = 'http://sso.pinganfu.net/login?referer=';
  var ACHAIN_VALIDATION = "http://achain.pinganfu.net/ssovalidation.html";

  var Auth = (function () {
    function Auth() {
      _classCallCheck(this, Auth);
    }

    // 获取当前用户信息

    _createClass(Auth, [{
      key: 'get_current_user_info',
      value: function get_current_user_info(callback) {
        var current_path = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

        var that = this;
        //console.log('get_current_user_info')
        Ajax.get(USER_INFO_URL, {}, true,
        // success
        function (data, textStatus, jqXHR) {
          callback(jqXHR.responseJSON);
        },
        // error
        function (jqXHR, textStatus, errorThrown) {
          console.log('登陆失败');
          console.log(jqXHR);
          // 登陆失败则获取跳转页面地址
          window.location.href = '' + LOGIN_PAGE + ACHAIN_VALIDATION;
        });
      }
    }, {
      key: 'get_user_id_by_um',
      value: function get_user_id_by_um(um) {
        if (userInfoCache[um] !== undefined) {
          console.log("use user info cache");
          return userInfoCache[um];
        }
        console.log("get user info from sso");
        var result = um;
        Ajax.get(USER_DETAIL_BY_UM_URL + '/' + um, {}, false,
        // success
        function (data, textStatus, jqXHR) {
          result = jqXHR.responseJSON.name + '/' + jqXHR.responseJSON.um;
          userInfoCache[um] = result;
        },
        // error
        function (jqXHR, textStatus, errorThrown) {
          result = um;
        });
        return result;
      }
    }]);

    return Auth;
  })();

  return Auth;
})(jQuery);
//# sourceMappingURL=auth.js.map
