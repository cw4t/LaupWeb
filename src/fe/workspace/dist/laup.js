if (typeof jQuery === 'undefined') {
  throw new Error('laup\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('laup\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function ($) {


// 组件：行为分析
"use strict";

var ActionAnalysis = {
  pageAction: function pageAction() {},
  ActionAnalysis: {
    template: "\n    <div>\n        <p> 这是{{ action_analysis_data }} 组件</p>\n        <p>行为分析组件的测试第二数据{{ test_data_second }}</p>\n    </div>",
    data: function data() {
      return {
        action_analysis_data: "行为分析~哈哈",
        test_data_second: "哈哈~~~（位于'测试第二数据'之后）"
      };
    },
    mounted: function mounted() {},
    created: function created() {
      console.log("行为分析组件加载成功！");
    },
    computed: {},
    methods: {}
  }
};
//# sourceMappingURL=action_analysis.js.map

'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

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

// 组件：告警配置
"use strict";

var AlarmConfiguration = {
  pageAction: function pageAction() {},
  AlarmConfiguration: {
    template: "\n    <div>\n      <p>这是{{ alarm_configuration_data }} 组件</p>\n      <div><a href=\"/over_view\">回到全局概览界面</a></div>\n    </div>",
    data: function data() {
      return {
        alarm_configuration_data: "告警配置测试哈哈~~"
      };
    },
    created: function created() {
      this.testD();
    },
    methods: {
      testD: function testD() {
        alert("函数加载成功");
      }
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      console.log('enter submit_chain in component');
      next();
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
      console.log('leave submit_chain');
      next();
    }
  }
};
//# sourceMappingURL=alarm_configuration.js.map

'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

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

// 使用说明
'use strict';

var NotFound = {
  pageAction: function pageAction() {},

  NotFound: {
    template: '\n    <div>\n      您请求的页面不存在，请确认访问地址。\n    </div>\n    ',
    data: function data() {
      return {
        inLoading: true
      };
    },
    methods: {},
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      console.log('enter notFound in component');
      next();
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
      console.log('leave notFound');
      next();
    }
  }
};
//# sourceMappingURL=not_found.js.map

// 组件：全局概览
"use strict";

var OverView = {
  pageAction: function pageAction() {},
  OverView: {
    template: " \n      <div class=\"tabbable\">\n        <p>测试数据--{{ over_view_data }}</p>\n      </div>\n    ",
    data: function data() {
      return { over_view_data: "全局概览" };
    }
  }
};
//# sourceMappingURL=over_view.js.map

'use strict';

var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
  };
})();

// 全局变量vm
var vm;
// 全局变量router
var router;

var Router = (function ($) {
  $(document).ready(function () {

    // 认证相关的工具类
    var auth = new Auth();

    // 基础数据
    var basicData = {
      'root': {
        path: '/',
        component: OverView.OverView,
        navLink: 'over_view',
        currentModule: '全局概览',
        currentSubModule: '全局概览',
        startupFunc: OverView.pageAction
      },
      'over_view': {
        path: '/over_view',
        component: OverView.OverView,
        navLink: 'over_view',
        currentModule: '全局概览',
        currentSubModule: '全局概览',
        startupFunc: OverView.pageAction
      },
      'action_analysis': {
        path: '/action_analysis',
        component: ActionAnalysis.ActionAnalysis,
        navLink: 'action_analysis',
        currentModule: '行为分析',
        currentSubModule: '行为分析',
        startupFunc: ActionAnalysis.pageAction
      },
      'alarm_configuration': {
        path: '/alarm_configuration',
        component: AlarmConfiguration.AlarmConfiguration,
        navLink: 'alarm_configuration',
        currentModule: '告警配置',
        currentSubModule: '告警配置',
        startupFunc: AlarmConfiguration.pageAction
      },
      'not_found': {
        path: '*',
        component: NotFound.NotFound,
        navLink: 'not_found',
        currentModule: '页面不存在',
        currentSubModule: '页面不存在',
        startupFunc: NotFound.pageAction
      }
    };

    // 路由
    var routes = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.entries(basicData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var key = _step$value[0];
        var value = _step$value[1];

        var record = {
          path: value['path'],
          component: value['component'],
          name: key
        };
        routes.push(record);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    router = new VueRouter({
      mode: 'history',
      routes: routes
    });

    router.afterEach(function (router) {
      vm.navLink = basicData[router.name]['navLink'];
      vm.currentModule = basicData[router.name]['currentModule'];
      vm.currentSubModule = basicData[router.name]['currentSubModule'];
      basicData[router.name].startupFunc();
    });

    router.beforeEach(function (to, from, next) {
      console.log('global beforeEach');
      console.log(to.fullPath);
      //认证
      auth.get_current_user_info(function (userinfo) {
        vm.currentUM = userinfo['um'];
        next();
      }, to.fullPath);
    });

    vm = new Vue({
      data: {
        navLink: 'status',
        currentUM: 'UNKNOWN',
        currentModule: '加载中',
        currentSubModule: '加载中',
        globalNoticeMsg: ''
      },
      router: router
    }).$mount('#app');

    // 加载页面
    $('#laup_loadding_page').css('display', 'none');
    $('#app').css('display', 'block');
  });
})(jQuery);
//# sourceMappingURL=router.js.map

}(jQuery);
