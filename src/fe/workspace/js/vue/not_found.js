// 使用说明
const NotFound = {
  pageAction: function(){
  },

  NotFound: {
    template: `
    <div>
      您请求的页面不存在，请确认访问地址。
    </div>
    `,
    data: function(){
      return {
        inLoading: true,
      }
    },
    methods: {

    },
    beforeRouteEnter: function(to, from, next) {
      console.log('enter notFound in component')
      next()
    },
    beforeRouteLeave: function(to, from, next) {
      console.log('leave notFound')
      next()
    }
  }
}

export default NotFound
