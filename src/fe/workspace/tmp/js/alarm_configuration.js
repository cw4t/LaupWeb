
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
