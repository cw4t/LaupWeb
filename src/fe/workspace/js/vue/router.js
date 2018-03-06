import Vue from 'vue'
import VueRouter from 'vue-router'

import OverView from './over_view'
import AlarmConfiguration from './alarm_configuration'
import ActionAnalysis from './action_analysis'
import NotFound from './not_found'
import Auth from '../auth'


// 全局变量vm
var vm;
// 全局变量router
var router;

const Router = (($) => {
  $(document).ready(function(){

    // 认证相关的工具类
    const auth = new Auth()

    // 基础数据
    const basicData = {
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
      'not_found':{
        path: '*',
        component:NotFound.NotFound,
        navLink: 'not_found',
        currentModule: '页面不存在',
        currentSubModule: '页面不存在',
        startupFunc: NotFound.pageAction
      }
    }

    // 路由
    var routes = [];
    for (var [key, value] of Object.entries(basicData)) {
      var record = {
        path: value['path'],
        component: value['component'],
        name: key,
      }
      routes.push(record)
    }

    router = new VueRouter({
      mode: 'history',
      routes: routes
    })

    router.afterEach(router => {
      vm.navLink = basicData[router.name]['navLink']
      vm.currentModule = basicData[router.name]['currentModule']
      vm.currentSubModule = basicData[router.name]['currentSubModule']
      basicData[router.name].startupFunc()
    })

    router.beforeEach((to, from, next) => {
      console.log('global beforeEach')
      console.log(to.fullPath)
      //认证
      auth.get_current_user_info(
        (userinfo) => {
          vm.currentUM = userinfo['um']
          next()
        },
        to.fullPath
      )
    })

    vm = new Vue({
        data: {
          navLink: 'status',
          currentUM: 'UNKNOWN',
          currentModule: '加载中',
          currentSubModule: '加载中',
          globalNoticeMsg: '',
        },
        router: router
      }).$mount('#app')


      // 加载页面
      $('#laup_loadding_page').css('display', 'none')
      $('#app').css('display', 'block')
    })

})(jQuery)

export default Router
