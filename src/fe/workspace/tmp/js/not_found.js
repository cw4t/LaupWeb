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
