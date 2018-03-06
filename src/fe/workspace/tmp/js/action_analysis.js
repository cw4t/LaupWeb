
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
