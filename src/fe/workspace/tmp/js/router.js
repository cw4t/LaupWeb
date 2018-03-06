'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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
