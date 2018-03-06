
// 组件：行为分析
const ActionAnalysis = {
  pageAction: function(){
  },
  ActionAnalysis: {
    template: `
    <div>
        <p> 这是{{ action_analysis_data }} 组件</p>
        <p>行为分析组件的测试第二数据{{ test_data_second }}</p>
    </div>`,
    data:function(){
      return {
        action_analysis_data: "行为分析~哈哈",
        test_data_second: "哈哈~~~（位于'测试第二数据'之后）"
      };
    },
    mounted: function() {

    },
    created: function() {
      console.log("行为分析组件加载成功！")
    },
    computed: {

    },
    methods:{}
  }
}

export default ActionAnalysis
