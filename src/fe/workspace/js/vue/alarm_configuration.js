
// 组件：告警配置
const AlarmConfiguration = {
  pageAction: function(){
  },
  AlarmConfiguration: {
    template: `
    <div>
      <p>这是{{ alarm_configuration_data }} 组件</p>
      <div><a href="/over_view">回到全局概览界面</a></div>
    </div>`,
    data:function(){
      return {
        alarm_configuration_data: "告警配置测试哈哈~~"
      }
    },
    created: function() {
      this.testD();
    },
    methods: {
      testD: function() {
        alert("函数加载成功")
      }
    },
    beforeRouteEnter: function(to, from, next) {
      console.log('enter submit_chain in component')
      next()
    },
    beforeRouteLeave: function(to, from, next) {
      console.log('leave submit_chain')
      next()
    }
  }
}

export default AlarmConfiguration
