// 组件：全局概览
const OverView = {
  pageAction: function pageAction() {},
  OverView: {
    template: ` 
      <div class="tabbable">
        <p>测试数据--{{ over_view_data }}</p>
      </div>
    `,
    data: function(){
      return {over_view_data: "全局概览"}
    }
  }
}

export default OverView
