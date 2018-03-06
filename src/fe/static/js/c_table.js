/*

1. 提供单选SELECT、多选SELECT、TEXT类型
2. SELECT支持依赖取值(a=>b, c b=>c，需要用户先输入c，然后输入b，然后输入a。如果依赖中c改变则b、a需要重置。如果b改变则a需要重置)
3. 提供校验action
4. 提供行的增、删、改、查操作
5. 提供是否直接显示的功能
6. 提供loads功能
7. 提供dumps功能
8. 提供查看时编辑功能，并且支持权限控制
9. 提供隐藏功能（用于版本维护）
10. 提供必填项控制
11. 提供加密项隐藏功能
12. 提供导出到excel功能

说明：
INPUT不依赖任何其他类型，也不能被其他类型依赖
MULTI-SELECT可以依赖SELECT，但不能被其他类型依赖
SELECT可以依赖SELECT，也可以被其他类型依赖
即依赖树中不会出现INPUT，MULTI-SELECT不能有子节点

SELECT/MULTI-SELECT类型必须包含一个value为''的选项

元数据格式：
[
  [
    {
      name: "_uniq_id_",
      value: 1,
      text: 1,
      "type": "_uniq_id_"
    },
    {
      name: "sub_company",
      value: "ZHIFU",
      text: "支付",
      "type": "SELECT"
    },
    ...
  ],
  ...
]

*/


(function($){

  // CFG_PROPERTIES
  var CFG_PROPERTIES = {
    name: "CFG_PROPERTIES",
    chainId: 0,
    columns: [
      {
        name: "properties_env",
        title: "环境",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"env"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "properties_opera",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"opera"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "properties_file",
        title: "路径",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({}, true, "/cfgc/getfilenamebychainid/" + CFG_PROPERTIES.chainId)
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "properties_content",
        title: "内容",
        type: "TEXTAREA",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // CFG_SCHEDULE
  var CFG_SCHEDULE = {
    name: "CFG_SCHEDULE",
    columns: [
      {
        name: "schedule_env",
        title: "环境",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"env"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_opera",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"opera_schedule"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_name",
        title: "名称",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_q_name",
        title: "队列名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_q_type",
        title: "发送方式",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"q_type"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_cron",
        title: "CRON表达式",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schedule_remark",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // CFG_ERRORCODE
  var CFG_ERRORCODE = {
    name: "CFG_ERRORCODE",
    columns: [
      {
        name: "error_code_env",
        title: "环境",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"env"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "error_code_opera",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"opera"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "error_code_scenario",
        title: "场景",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "error_code_key",
        title: "错误码名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "error_code_value",
        title: "错误码值",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // CFG_CONFIG
  var CFG_CONFIG = {
    name: "CFG_CONFIG",
    columns: [
      {
        name: "config_env",
        title: "环境",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"env"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "config_opera",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"opera"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "config_key",
        title: "配置项",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "config_value",
        title: "值",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "config_remark",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // CFG_MQ
  var CFG_MQ = {
    name: "CFG_MQ",
    columns: [
      {
        name: "mq_env",
        title: "环境",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"env"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mq_opera",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"opera_mq"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mq_name",
        title: "QUEUE/TOPIC队列名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mq_type",
        title: "Q类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"q_type"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mq_level",
        title: "Q等级",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({query_type:"q_level"}, true, "/cfgc/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mq_remark",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // AUTO_FIREALL
  var AUTO_FIREWALL = {
    name: "AUTO_FIREWALL",
    validation: function() {
      var result = []
      $(".c_table_auto_firewall").each(function(){
        result = JSON.stringify($(this).data('c_table_data'))
      })
      var result = do_cmdb_pre_validation(result)
      return result
    },
    columns: [
      {
        name: "src_catalog",
        title: "源类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='1'>内部应用</option>"
          html += "<option value='2'>互联网</option>"
          html += "<option value='3'>专线</option>"
          return html
        },
        validation: function() {
          console.log("validation")
          if (get_select_value_by_name("src_catalog") == 1) {
            $('#c_table_item_src_app_ips').multipleSelect("checkAll");
            if (get_input_value_by_name("src_manual_ips") != "" || get_input_value_by_name("src_manual_urls") != "") {
              alert("类型为内部应用时，应用自带IP必须全选，不允许手动填写IP及URL，已为您自动更正")
              set_input_value_by_name("src_manual_ips", "")
              set_input_value_by_name("src_manual_urls", "")
              $('#c_table_item_src_app_ips').multipleSelect("checkAll");
              return true
            }
          }
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_app",
        title: "源应用",
        type: "SELECT",
        deps: ["src_catalog"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            var html = get_select_html_from_params({'query':'app_zw_list'})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_env",
        title: "源环境",
        type: "SELECT",
        deps: ["src_app"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'env_by_appid',
                'app_id':get_select_value_by_name('src_app')})
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_dc",
        title: "源机房区域",
        type: "SELECT",
        deps: ["src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'datacenter_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_network",
        title: "源网络区域",
        type: "SELECT",
        deps: ["src_dc", "src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '' || get_select_value_by_name('src_dc') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'network_zone_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env'),
                'dc_id':get_select_value_by_name('src_dc')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_app_ips",
        title: "源IP(来自应用)",
        type: "MULTI-SELECT",
        deps: ["src_network", "src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '' || get_select_value_by_name('src_network') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'ip_no_id_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env'),
                'zone_id':get_select_value_by_name('src_network')
              }, true)
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          //$('#c_table_item_src_app_ips').multipleSelect("checkAll");
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "snat",
        title: "SNAT",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("snat", "SNAT", get_input_value_by_name("snat"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_manual_ips",
        title: "源IP(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ips", "源IP(手工填写)", get_input_value_by_name("src_manual_ips"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_manual_urls",
        title: "源URL(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("url", "源URL(手工填写)", get_input_value_by_name("src_manual_urls"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_catalog",
        title: "目的类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='1'>内部应用</option>"
          html += "<option value='2'>互联网</option>"
          html += "<option value='3'>专线</option>"
          return html
        },
        validation: function() {
          console.log("validation")
          if (get_select_value_by_name("dest_catalog") == 1) {
            $('#c_table_item_dest_app_ips').multipleSelect("checkAll");
            if (get_input_value_by_name("dest_manual_ips") != "" || get_input_value_by_name("dest_manual_urls") != "") {
              alert("类型为内部应用时，应用自带IP必须全选，不允许手动填写IP及URL，已为您自动更正")
              set_input_value_by_name("dest_manual_ips", "")
              set_input_value_by_name("dest_manual_urls", "")
              $('#c_table_item_dest_app_ips').multipleSelect("checkAll");
              return true
            }
          }
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_app",
        title: "目的应用",
        type: "SELECT",
        deps: ["dest_catalog"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            var html = get_select_html_from_params({'query':'app_zw_list'})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_env",
        title: "目的环境",
        type: "SELECT",
        deps: ["dest_app"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'env_by_appid',
                'app_id':get_select_value_by_name('dest_app')})
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_dc",
        title: "目的机房区域",
        type: "SELECT",
        deps: ["dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'datacenter_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_network",
        title: "目的网络区域",
        type: "SELECT",
        deps: ["dest_dc", "dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '' || get_select_value_by_name('dest_dc') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'network_zone_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env'),
                'dc_id':get_select_value_by_name('dest_dc')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_app_ips",
        title: "目的IP(来自应用)",
        type: "MULTI-SELECT",
        deps: ["dest_network", "dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '' || get_select_value_by_name('dest_network') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'ip_no_id_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env'),
                'zone_id':get_select_value_by_name('dest_network')
              }, true)
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          //$('#c_table_item_dest_app_ips').multipleSelect("checkAll");
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dnat",
        title: "DNAT",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("dnat", "DNAT", get_input_value_by_name("dnat"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_manual_ips",
        title: "目的IP(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ips", "目的IP(手工填写)", get_input_value_by_name("dest_manual_ips"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_manual_urls",
        title: "目的URL(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("url", "目的URL(手工填写)", get_input_value_by_name("dest_manual_urls"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "protocol",
        title: "调用协议",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({
            'query':'protocol_type'
          }, true)
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_ports",
        title: "调用端口",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ports", "调用端口", get_input_value_by_name("dest_ports"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "expire_policy",
        title: "时效性",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({
            'query':'expiry_type'
          }, true)
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "expire_datetime",
        title: "过期时间",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("date", "过期时间", get_input_value_by_name("expire_datetime"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "remark",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
    ]
  }

  // FIREWALL_EXPAND
  var FIREWALL_EXPAND = {
    name: "FIREWALL_EXPAND",
    validation: function() {
      var result = []
      $(".c_table_firewall_expand").each(function(){
        result = JSON.stringify($(this).data('c_table_data'))
      })
      var result = do_cmdb_fwexpand_pre_validation(result)
      return result
    },
    columns: [
      {
        name: "catalog",
        title: "类型",
        type: "MULTI-SELECT",
        deps: [],
        content: function(){
          var html = ""
          html += "<option value='2'>互联网</option>"
          html += "<option value='3'>专线</option>"
          return html
        },
        validation: function() {
          return true
        },
        post: function() {
          $('#c_table_item_catalog').multipleSelect("checkAll");
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "app",
        title: "源应用",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'app_zw_list'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "env",
        title: "环境",
        type: "SELECT",
        deps: ["app"],
        content: function(){
          if(get_select_value_by_name('app') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'env_by_appid',
              'app_id':get_select_value_by_name('app')})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dc",
        title: "机房",
        type: "MULTI-SELECT",
        deps: ["app", "env"],
        content: function(){
          if(get_select_value_by_name('app') == '' || get_select_value_by_name('env') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'datacenter_by_appid',
              'app_id':get_select_value_by_name('app'),
              'env_id':get_select_value_by_name('env')
            }, true)
            return html
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          $('#c_table_item_dc').multipleSelect("checkAll");
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "groupname",
        title: "GROUP NAME",
        type: "SELECT",
        deps: ["app"],
        content: function(){
          if(get_select_value_by_name('app') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'groupname_by_appid',
              'app_id':get_select_value_by_name('app')}, true, "/cmdb/querygroupname")
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // A_RECORD
  var A_RECORD = {
    name: "A_RECORD",
    columns: [
      {
        name: "action_type",
        title: "操作类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='add'>新增</option>"
          html += "<option value='del'>删除</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "domain",
        title: "区域",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='prd'>prd</option>"
          html += "<option value='stg'>stg</option>"
          html += "<option value='yqb.idc'>yqb.idc</option>"
          html += "<option value='hd'>hd</option>"
          html += "<option value='uat'>uat</option>"
          html += "<option value='zhiwan.com'>zhiwan.com</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "ip",
        title: "IP",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_domain",
        title: "目的区域",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='BX'>宝信</option>"
          html += "<option value='ZJ'>张江</option>"
          html += "<option value='ALL'>全部</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "record",
        title: "记录名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          var value = get_input_value_by_name("record")
          // 不能包含下划线
          if (value.split("_").length > 1) {
            alert("记录名不能包含下划线")

            return false
          }
          if (value.split(" ").length > 1) {
            alert("记录名不能包含空格")
            return false
          }
          if (value.indexOf("BX") >= 0 || value.indexOf("ZJ") >= 0 || value.indexOf("ALL") >= 0 || value.indexOf("prd") >= 0 || value.indexOf("stg") >= 0 || value.indexOf("yqb.idc") >= 0 || value.indexOf("hd") >= 0 || value.indexOf("uat") >= 0 || value.indexOf("zhiwan.com") >= 0) {
            alert("记录名不能包含 BX/ZJ/ALL/prd/stg/yqb.idc/hd/uat/zhiwan.com 这些区域名")
            return false
          }
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // F5&Ctrix
  var F5_AND_CTRIX = {
    name: "F5_AND_CTRIX",
    columns: [
      {
        name: "env",
        title: "环境",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='PRD'>PRD</option>"
          html += "<option value='STG'>STG</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "domain",
        title: "区域",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='张江DMZ'>张江DMZ</option>"
          html += "<option value='张江PTR'>张江PTR</option>"
          html += "<option value='张江SF'>张江SF</option>"
          html += "<option value='宝信内部'>宝信内部</option>"
          html += "<option value='宝信互联网'>宝信互联网</option>"
          html += "<option value='宝信专线'>宝信专线</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "logical_object",
        title: "逻辑实体",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "vs_vip",
        title: "VS VIP",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "vs_service_port",
        title: "VS 服务端口",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "vs_service_type",
        title: "VS 服务类型",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "pool_ip",
        title: "POOL IP",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "pool_service_port",
        title: "POOL 服务端口",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "pool_service_type",
        title: "POOL 服务类型",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "session_keepalive",
        title: "会话保持",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "irule",
        title: "iRule",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "comment",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
    ]
  }

  // SQL数据订正
  var SQL_DATA_PATCH = {
    name: "SQL_DATA_PATCH",
    columns: [
      {
        name: "script_name",
        title: "脚本名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "record_cnt",
        title: "记录数",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "comment",
        title: "变更说明",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
    ]
  }

  // SQL解封
  var SQLREOPEN = {
    name: "SQLREOPEN",
    columns: [
      {
        name: "script_type",
        title: "脚本类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='DDL'>DDL</option>"
          html += "<option value='DML'>DML</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "schemas",
        title: "涉及的Schema",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "script_name",
        title: "对应附件中的脚本名",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "comment",
        title: "注意事项",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
    ]
  }

  //  防火墙申请
  var FIREWALL = {
    name: "FIREWALL",
    validation: function() {
      var result = []
      $(".c_table_firewall").each(function(){
        result = JSON.stringify($(this).data('c_table_data'))
      })
      var result = do_cmdb_pre_validation(result)
      return result
    },
    columns: [
      {
        name: "src_catalog",
        title: "源类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='1'>内部应用</option>"
          html += "<option value='2'>互联网</option>"
          html += "<option value='3'>专线</option>"
          html += "<option value='4'>绿地</option>"
          html += "<option value='5'>办公网、VPN、云桌面</option>"
          html += "<option value='6'>其它</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_app",
        title: "源应用",
        type: "SELECT",
        deps: ["src_catalog"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            var html = get_select_html_from_params({'query':'app_zw_list'})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_env",
        title: "源环境",
        type: "SELECT",
        deps: ["src_app"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'env_by_appid',
                'app_id':get_select_value_by_name('src_app')})
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_dc",
        title: "源机房区域",
        type: "SELECT",
        deps: ["src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'datacenter_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_network",
        title: "源网络区域",
        type: "SELECT",
        deps: ["src_dc", "src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '' || get_select_value_by_name('src_dc') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'network_zone_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env'),
                'dc_id':get_select_value_by_name('src_dc')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_app_ips",
        title: "源IP(来自应用)",
        type: "MULTI-SELECT",
        deps: ["src_network", "src_app", "src_env"],
        content: function(){
          if(get_select_value_by_name('src_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('src_app') == '' || get_select_value_by_name('src_env') == '' || get_select_value_by_name('src_network') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'ip_no_id_by_appid',
                'app_id':get_select_value_by_name('src_app'),
                'env_id':get_select_value_by_name('src_env'),
                'zone_id':get_select_value_by_name('src_network')
              }, true)
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          //$('#c_table_item_src_app_ips').multipleSelect("checkAll");
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "snat",
        title: "SNAT",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("snat", "SNAT", get_input_value_by_name("snat"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_manual_ips",
        title: "源IP(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ips", "源IP(手工填写)", get_input_value_by_name("src_manual_ips"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "src_manual_urls",
        title: "源URL(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("url", "源URL(手工填写)", get_input_value_by_name("src_manual_urls"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_catalog",
        title: "目的类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='1'>内部应用</option>"
          html += "<option value='2'>互联网</option>"
          html += "<option value='3'>专线</option>"
          html += "<option value='4'>绿地</option>"
          html += "<option value='5'>办公网、VPN、云桌面</option>"
          html += "<option value='6'>其它</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_app",
        title: "目的应用",
        type: "SELECT",
        deps: ["dest_catalog"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            var html = get_select_html_from_params({'query':'app_zw_list'})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_env",
        title: "目的环境",
        type: "SELECT",
        deps: ["dest_app"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'env_by_appid',
                'app_id':get_select_value_by_name('dest_app')})
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_dc",
        title: "目的机房区域",
        type: "SELECT",
        deps: ["dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'datacenter_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_network",
        title: "目的网络区域",
        type: "SELECT",
        deps: ["dest_dc", "dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '' || get_select_value_by_name('dest_dc') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'network_zone_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env'),
                'dc_id':get_select_value_by_name('dest_dc')
              })
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        display: false,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_app_ips",
        title: "目的IP(来自应用)",
        type: "MULTI-SELECT",
        deps: ["dest_network", "dest_app", "dest_env"],
        content: function(){
          if(get_select_value_by_name('dest_catalog') != '1') {
            var html = "<option value='-1'>无需填写</option>"
            return html
          } else {
            if(get_select_value_by_name('dest_app') == '' || get_select_value_by_name('dest_env') == '' || get_select_value_by_name('dest_network') == '') {
              var html = "<option value=''>请先填写其它项</option>"
              return html
            } else {
              var html = get_select_html_from_params({
                'query':'ip_no_id_by_appid',
                'app_id':get_select_value_by_name('dest_app'),
                'env_id':get_select_value_by_name('dest_env'),
                'zone_id':get_select_value_by_name('dest_network')
              }, true)
              return html
            }
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          //$('#c_table_item_dest_app_ips').multipleSelect("checkAll");
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dnat",
        title: "DNAT",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("dnat", "DNAT", get_input_value_by_name("dnat"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_manual_ips",
        title: "目的IP(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ips", "目的IP(手工填写)", get_input_value_by_name("dest_manual_ips"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_manual_urls",
        title: "目的URL(手工填写)",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("url", "目的URL(手工填写)", get_input_value_by_name("dest_manual_urls"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "protocol",
        title: "调用协议",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({
            'query':'protocol_type'
          }, true)
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dest_ports",
        title: "调用端口",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("ports", "调用端口", get_input_value_by_name("dest_ports"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "expire_policy",
        title: "时效性",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({
            'query':'expiry_type'
          }, true)
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "expire_datetime",
        title: "过期时间",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("date", "过期时间", get_input_value_by_name("expire_datetime"))
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "remark",
        title: "备注",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: false,
        empty: true,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
    ]
  }

  // OGG同步申请
  var OGG = {
    name: "OGG",
    columns: [
      {
        name: "dbname",
        title: "源库名",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'oracle_dbs'}, false, "/padb/query")
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "dbschema",
        title: "源Schema",
        type: "SELECT",
        deps: ["dbname"],
        content: function(){
          if(get_select_value_by_name('dbname') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'schemas',
              'db_name':get_select_value_by_name('dbname')},
              false,
              "/padb/query"
            )
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "table",
        title: "源表名",
        type: "MULTI-SELECT",
        deps: ["dbname", "dbschema"],
        content: function(){
          if(get_select_value_by_name('dbname') == '' || get_select_value_by_name('dbschema') == '') {
            var html = ""
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'tables',
              'db_id':get_select_value_by_name('dbschema')},
              true,
              "/padb/query"
            )
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "user",
        title: "授权查询用户",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='OMSRPTOPR'>OMSRPTOPR</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "keep",
        title: "数据保留策略",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = "<option value='1个月'>1个月</option>"
          html += "<option value='3个月'>3个月</option>"
          html += "<option value='6个月'>6个月</option>"
          html += "<option value='12个月'>12个月</option>"
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "project",
        title: "所属项目",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "app_name",
        title: "所属应用子系统",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'app_zw_list'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // VIP创建申请
  var VIP = {
    name: "VIP",
    columns: [
      {
        name: "net",
        title: "网段",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'network_list'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },{
        name: "project",
        title: "系统名称",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("db_name", "系统名称", get_input_value_by_name("project"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },{
        name: "amount",
        title: "数量",
        type: "INPUT",
        deps: [],
        content: function(){
          var html = ""
          return html
        },
        validation: function() {
          return do_cmdb_validation("num", "数量", get_input_value_by_name("amount"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // SFTP账号申请
  var SFTP = {
    name: "SFTP",
      columns: [
        {
          name: "network",
          title: "网络区域",
          type: "SELECT",
          deps: [],
          content: function(){
            html = "<option value='BC'>BC</option>"
            html += "<option value='FS'>FS</option>"
            html += "<option value='CA'>CA</option>"
            return html
          },
          validation: function() {
            return true
          },
          display: false,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "volumes",
          title: "NAS逻辑名称",
          type: "SELECT",
          deps: ["network"],
          content: function(){
            if(get_select_value_by_name('network') == '') {
              var html = ""
              return html
            } else {
              var html = ""
              if (get_select_value_by_name('network') == "BC") {
                html += "<option value='pafb_mtp_jbs_vol1_prd'>pafb_mtp_jbs_vol1_prd</option>"
                html += "<option value='pafb_caps_jbs_vol1_prd'>pafb_caps_jbs_vol1_prd</option>"
                html += "<option value='pafb_cipauth_imgpath_vol1'>pafb_cipauth_imgpath_vol1</option>"
                html += "<option value='pafb_ecstc_recon_id9527_vol1'>pafb_ecstc_recon_id9527_vol1</option>"
                html += "<option value='pafb_lifecp_vol'>pafb_lifecp_vol</option>"
                html += "<option value='pafb_ybp_id854797_vol1'>pafb_ybp_id854797_vol1</option>"
                html += "<option value='pafb_capsapp_id706646_vol1'>pafb_capsapp_id706646_vol1</option>"
                html += "<option value='yimall_manage_id594305'>yimall_manage_id594305</option>"
                html += "<option value='fncp_frcs_id337618_vol1'>fncp_frcs_id337618_vol1</option>"
                html += "<option value='pafb_cstc_id187294_vol1'>pafb_cstc_id187294_vol1</option>"
              } else if (get_select_value_by_name('network') == "FS") {
                html += "<option value='pafb_jfbisout_api_vol1'>pafb_jfbisout_api_vol1</option>"
                html += "<option value='pafu_bx_bdata_vol1_prd'>pafu_bx_bdata_vol1_prd</option>"
                html += "<option value='pafm_mcm_vol1_prd'>pafm_mcm_vol1_prd</option>"
                html += "<option value='fip_fts_vol1_prd'>fip_fts_vol1_prd</option>"
                html += "<option value='fncp_fmgw_id886273_dmzfront_vol1'>fncp_fmgw_id886273_dmzfront_vol1</option>"
                html += "<option value='papdp_ptr_vol1_prd'>papdp_ptr_vol1_prd</option>"
                html += "<option value='pafu_merchant_vol1_prd'>pafu_merchant_vol1_prd</option>"
                html += "<option value='pafb_capsapp_id706646_vol1'>pafb_capsapp_id706646_vol1</option>"
                html += "<option value='pap_pay_sftpapp_vol1'>pap_pay_sftpapp_vol1</option>"
                html += "<option value='pafb_capsdmz_id706646_vol1'>pafb_capsdmz_id706646_vol1</option>"
                html += "<option value='pafb_pspt_id948713_vol1_prd'>pafb_pspt_id948713_vol1_prd</option>"
                html += "<option value='pafm_fs_id622753_vol1'>pafm_fs_id622753_vol1</option>"
                html += "<option value='pafb_pspt_id948713_vol1_prd'>pafb_pspt_id948713_vol1_prd</option>"
              } else if (get_select_value_by_name('network') == "CA") {
                html += "<option value='fncp_fmgw_id886273_front_vol1'>fncp_fmgw_id886273_front_vol1</option>"
                html += "<option value='pafb_fssvrptr_id946205_vol1'>pafb_fssvrptr_id946205_vol1</option>"
                html += "<option value='pafb_capsapp_id706646_vol1'>pafb_capsapp_id706646_vol1</option>"
                html += "<option value='pap_pay_sftpapp_vol1'>pap_pay_sftpapp_vol1</option>"
                html += "<option value='pafb_capsptr_id706646_vol1'>pafb_capsptr_id706646_vol1</option>"
                html += "<option value='pafb_caps_jbs_vol1_prd'>pafb_caps_jbs_vol1_prd</option>"
                html += "<option value='papdp_ptr_vol1_prd'>papdp_ptr_vol1_prd</option>"
              }
              return html
            }
          },
          validation: function() {
            return true
          },
          display: true,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "ftpusername",
          title: "FTP账户",
          type: "INPUT",
          deps: [],
          content: function(){
            return ""
          },
          validation: function() {
            return true
          },
          display: true,
          empty: false,
          sensitive: true,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "ftppassword",
          title: "FTP密码",
          type: "INPUT",
          deps: [],
          content: function(){
            return ""
          },
          validation: function() {
            return true
          },
          display: false,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "ftphomedir",
          title: "FTP HOME目录",
          type: "INPUT",
          deps: [],
          content: function(){
            return ""
          },
          validation: function() {
            return true
          },
          display: true,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "ftpsubdir",
          title: "FTP 子目录",
          type: "INPUT",
          deps: [],
          content: function(){
            return ""
          },
          validation: function() {
            return true
          },
          display: true,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        },
        {
          name: "ftpchmod",
          title: "目录权限",
          type: "SELECT",
          deps: [],
          content: function(){
            html = "<option value='775'>775</option>"
            html += "<option value='755'>755</option>"
            return html
          },
          validation: function() {
            return true
          },
          display: false,
          empty: false,
          sensitive: false,
          hide: false,
          edit_group: [],
          sensitive_group: []
        }
    ]
  }

  // NAS创建申请
  var NEW_NAS = {
    name: "NEW_NAS",
    columns: [
      {
        name: "sub_company",
        title: "子公司",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'company'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "env",
        title: "环境",
        type: "SELECT",
        deps: ["sub_company"],
        content: function(){
          if(get_select_value_by_name('sub_company') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'env_by_co_id',
              'co_id':get_select_value_by_name('sub_company')})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "network",
        title: "网络区域",
        type: "SELECT",
        deps: ["sub_company"],
        content: function(){
          if(get_select_value_by_name('sub_company') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'network_zone_co_id',
              'co_id':get_select_value_by_name('sub_company')
            })
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "nasname",
        title: "NAS卷名",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("volume_name", "NAS卷名", get_input_value_by_name("nasname"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "nas_type",
        title: "NAS类型",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'nas_type'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "space",
        title: "空间大小",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("size", "空间大小", get_input_value_by_name("space"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "cost",
        title: "业务每天生成文件大小",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("generate_size", "业务每天生成文件大小", get_input_value_by_name("cost"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "keepdays",
        title: "业务文件需要保存天数",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("days_need", "业务文件需要保存天数", get_input_value_by_name("keepdays"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  // NAS挂载
  var NAS = {
    name: "NAS",
    columns: [
      {
        name: "sub_company",
        title: "子公司",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'company'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "app_name",
        title: "应用名",
        type: "SELECT",
        deps: [],
        content: function(){
          var html = get_select_html_from_params({'query':'app_zw_list'})
          return html
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "env",
        title: "环境",
        type: "SELECT",
        deps: ["app_name"],
        content: function(){
          if(get_select_value_by_name('app_name') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'env_by_appid',
              'app_id':get_select_value_by_name('app_name')})
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "network",
        title: "网络区域",
        type: "SELECT",
        deps: ["app_name", "env"],
        content: function(){
          if(get_select_value_by_name('app_name') == '' || get_select_value_by_name('env') == '') {
            var html = "<option value=''>请先填写其它项</option>"
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'network_zone_by_appid',
              'app_id':get_select_value_by_name('app_name'),
              'env_id':get_select_value_by_name('env')
            })
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "machines",
        title: "逻辑实体主机IP",
        type: "MULTI-SELECT",
        deps: ["network", "app_name", "env"],
        content: function(){
          if(get_select_value_by_name('app_name') == '' || get_select_value_by_name('env') == '' || get_select_value_by_name('network') == '') {
            var html = ""
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'ip_by_appid',
              'app_id':get_select_value_by_name('app_name'),
              'env_id':get_select_value_by_name('env'),
              'zone_id':get_select_value_by_name('network')
            }, true)
            return html
          }
        },
        validation: function() {
          return true
        },
        post: function() {
          $('#c_table_item_machines').multipleSelect("checkAll");
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "volumes",
        title: "NAS逻辑卷",
        type: "MULTI-SELECT",
        deps: ["network", "app_name", "env"],
        content: function(){
          if(get_select_value_by_name('app_name') == '' || get_select_value_by_name('env') == '' || get_select_value_by_name('network') == '') {
            var html = ""
            return html
          } else {
            var html = get_select_html_from_params({
              'query':'nas_by_appid',
              'app_id':get_select_value_by_name('app_name'),
              'env_id':get_select_value_by_name('env'),
              'zone_id':get_select_value_by_name('network')
            }, true)
            return html
          }
        },
        validation: function() {
          return true
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "mountdir",
        title: "挂载目录",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("dict_mount", "挂载目录", get_input_value_by_name("mountdir"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      },
      {
        name: "privileges",
        title: "用户权限",
        type: "INPUT",
        deps: [],
        content: function(){
          return ""
        },
        validation: function() {
          return do_cmdb_validation("nas_auth", "用户权限", get_input_value_by_name("privileges"))
        },
        display: true,
        empty: false,
        sensitive: false,
        hide: false,
        edit_group: [],
        sensitive_group: []
      }
    ]
  }

  function set_input_value_by_name(name, value) {
    console.log("set_input_value_by_name " + name + ": " + value)
    $('#c_table_item_' + name).val(value);
  }

  function get_input_value_by_name(name) {
    return $('#c_table_item_' + name).val();
  }

  function get_select_value_by_name(name) {
    return $('#c_table_item_' + name).val();
  }

  function get_select_html_from_params(params, noempty, url) {
    console.log("get_select_html_from_params begin")
    console.log(url)
    console.log(params)
    console.log(noempty)
    console.log("get_select_html_from_params end")
    if (typeof(url) == 'undefined') {
      url = "/cmdb/query"
    }
    return get_select_html_from_ajax_result(ajax_query(params, url), noempty)
  }

  function get_select_html_from_ajax_result(info, noempty) {
    var html = ''
    if (noempty === true) {
        // do nothing
    } else {
      html += "<option value=''></option>"
    }
    if (info === null) {
      alert('获取数据错误，请稍后重试或者联系管理员(QINTIANHUAN886)')
      return html
    }
    for (var i=0; i<info.length; i++) {
      html += "<option value='"
      html += info[i]['id']
      html += "'>"
      var v = info[i]['name']
      if (v === undefined) {
        v = info[i]['text']
      }
      html += v
      html += "</option>"
    }
    return html
  }

  function do_cmdb_fwexpand_pre_validation(data) {
    var result = false
    $.ajax(
          "/cmdb/fwexpandprevalidation",
          {
            dataType: 'json',
            data: {
              request_body: data
            },
            method: 'POST',
            processData: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var err_msg = responseText['returnMsg']
              result = false
              console.log(err_msg);
              alert("格式校验报错，提示：" + err_msg);
            },
            success: function(data, textStatus, jqXHR) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var ret_code = responseText['returnCode']
              console.log(ret_code)
              if (ret_code !== 0) {
                var err_msg = responseText['returnMsg']
                console.log(err_msg);
                alert("格式不正确，提示：" + err_msg);
                result = false
              } else {
                console.log(responseText)
                result = true
              }
            }
          }
        );
      return result;
  }

  function do_cmdb_pre_validation(data) {
    var result = false
    $.ajax(
          "/cmdb/prevalidation",
          {
            dataType: 'json',
            data: {
              request_body: data
            },
            method: 'POST',
            processData: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var err_msg = responseText['returnMsg']
              result = false
              console.log(err_msg);
              alert("格式校验报错，提示：" + err_msg);
            },
            success: function(data, textStatus, jqXHR) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var ret_code = responseText['returnCode']
              console.log(ret_code)
              if (ret_code !== 0) {
                var err_msg = responseText['returnMsg']
                console.log(err_msg);
                alert("格式不正确，提示：" + err_msg);
                result = false
              } else {
                console.log(responseText)
                result = true
              }
            }
          }
        );
      return result;
  }

  function do_cmdb_validation(target_id, target_name, item_value) {
    var result = false
    $.ajax(
          "/cmdb/validation",
          {
            dataType: 'json',
            data: {
              verify_item: target_id,
              verify_value: item_value
            },
            method: 'POST',
            processData: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var err_msg = responseText['returnMsg']
              result = false
              console.log(err_msg);
              alert("格式校验报错，提示：" + err_msg);
            },
            success: function(data, textStatus, jqXHR) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var ret_code = responseText['returnCode']
              console.log(ret_code)
              if (ret_code !== 0) {
                var err_msg = responseText['returnMsg']
                console.log(err_msg);
                alert(target_name + " 格式不正确，提示：" + err_msg);
                result = false
              } else {
                console.log(responseText)
                result = true
              }
            }
          }
        );
      return result;
  }

  function ajax_query(params, url) {
    var result = null
    console.log("ajax_query begin")
    console.log(url)
    console.log(params)
    console.log("ajax_query end")
    $.ajax(
          url,
          {
            dataType: 'json',
            data: params,
            method: 'POST',
            processData: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var err_msg = responseText['returnMsg']
              console.log(err_msg);
            },
            success: function(data, textStatus, jqXHR) {
              console.log(jqXHR.responseText)
              var responseText = $.parseJSON(jqXHR.responseText);
              var ret_code = responseText['returnCode']
              console.log(ret_code)
              if (ret_code !== 0) {
                var err_msg = responseText['returnMsg']
                console.log(err_msg);
              } else {
                console.log(responseText)
                result = responseText['returnMsg']
              }
            }
          }
        );
      return result;
  }

  function Node(name) {
    this.name = name
    this.children = []
    this.deps = []
  }

  Node.prototype.dumps = function(){
    console.log("Parent: ")
    console.log(this.name)
    console.log("Children: ")
    for(var i=0; i<this.children.length; i++) {
      console.log(this.children[i].name + ", ")
    }
    console.log('-------')
    for(var i=0; i<this.children.length; i++) {
      this.children[i].dumps()
    }
  }

  function parse_options_into_nodes(options) {
    var root = new Node('_ROOT_')
    var col_already_known = []
    var nodes = {}
    for (var i=0; i<options['columns'].length; i++) {
      var o = options['columns'][i]
      if (o['hide'] === true) continue // 忽略hide
      var o_id = '#c_table_item_' + o['name']
      if (o['type'] == 'INPUT' || o['type'] == 'TEXTAREA' ) continue // 只关心SELECT和MULTI-SELECT
      // 判断这个列是否已经有对应的node，没有的话则创建
      if ($.inArray(o_id, col_already_known) === -1) {
        var n = new Node(o_id)
        col_already_known.push(o_id)
        nodes[o_id] = n
      }
      var current_node = nodes[o_id]
      var n_deps = o['deps']
      for (var j=0; j<n_deps.length;j++) {
        var dep = n_deps[j]
        var dep_id = '#c_table_item_' + dep
        // 判断这个列是否已经有对应的node，没有的话则创建
        if ($.inArray(dep_id, col_already_known) === -1) {
          var n = new Node(dep_id)
          col_already_known.push(dep_id)
          nodes[dep_id] = n
        }
        var dep_node = nodes[dep_id]
        dep_node.children.push(current_node)
        current_node.deps.push(dep_node)
      }
    }

    // 获取那些没有依赖的节点作为root的子节点
    for(var k=0; k<col_already_known.length; k++) {
      var node_id = col_already_known[k]
      var node = nodes[node_id]
      if(node.deps.length == 0) {
        root.children.push(node)
      }
    }
    //console.log(root)
    return root
  }

  function loads(callback, pluginElement) {
    var thiss = this
    var that = $(this)
    var data = that.data('c_table_data')
    var options = that.data('c_table_data_options')
    var has_sensitive_privilege = that.data('c_table_has_sensitive_privilege')
    //console.log(JSON.stringify(data))
    var t_body_html = ''

    for(var i=0; i<data.length; i++) {
      var row = data[i]
      t_body_html += '<tr id="c_table_tr_rid_'
      t_body_html += row[0]['value']
      t_body_html += '">'

      for(var x=0; x<options['columns'].length; x++) {
        var v = ""
        var o = options['columns'][x]
        for(var j=1; j<row.length; j++) {
          if (o['name'] == row[j]['name']) {
            v = row[j]['text']
          }
        }
        if (o['hide']===false && o['display']===true) {
          t_body_html += "<td nowrap=\"nowrap\">"
          if (o['sensitive'] === true && has_sensitive_privilege === false) {
            t_body_html += "仅相关人员可见"
          } else {
            t_body_html += v
          }
          t_body_html += "</td>"
        }
      }

      if (that.data('c_table_data_readonly')) {
        t_body_html += "<td class='c_table_tr_last_td' nowrap=\"nowrap\">"
        t_body_html += "<a href='javascript:void(0)' class='c_table_tr_view' id='c_table_tr_view_"
        t_body_html += row[0]['value']
        t_body_html += "'>查看</a>"
        t_body_html += "</td>"
      } else {
        t_body_html += "<td class='c_table_tr_last_td' nowrap=\"nowrap\">"
        t_body_html += "<a href='javascript:void(0)' class='c_table_tr_view' id='c_table_tr_view_"
        t_body_html += row[0]['value']
        t_body_html += "'>查看</a> | <a href='javascript:void(0)' class='c_table_tr_del'  id='c_table_tr_del_"
        t_body_html += row[0]['value']
        t_body_html += "'>删除</a> | <a href='javascript:void(0)' class='c_table_tr_edit'  id='c_table_tr_edit_"
        t_body_html += row[0]['value']
        t_body_html += "'>编辑</a>"
        t_body_html += "</td>"
      }

      t_body_html += '</tr>'
    }

    pluginElement.find('#c_table_tbody').html(t_body_html)

    // 绑定编辑方法
    pluginElement.find('.c_table_tr_edit').each(function(){
      var thatt = $(this)
      thatt.click(function(event){
        console.log("edit row")
        var current_record_data = {}
        var add_html = ""
        for(var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          if (o['hide']===true) {
            continue
          }
          add_html += "<div class='c_table_row'>"
          add_html += "<div class='c_table_col'>"
          add_html += o['title']
          add_html += ":"
          add_html += "</div>"
          add_html += "<div class='c_table_col'>"
          if (o['type'] == "INPUT") {
            add_html += "<input type='text' style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html +="></input>"
          } else if (o['type'] == "TEXTAREA") {
            add_html += "<textarea style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html +="></textarea>"
          } else if (o['type'] == "SELECT") {
            add_html += "<select style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html += "></select>"
          } else if (o['type'] == "MULTI-SELECT") {
            add_html += "<select multiple=\"multiple\" style=\"width:200px;\" "
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html += "></select>"
          }
          add_html += "</div>"
          add_html += "</div>"
          current_record_data['c_table_item_' + o['name']] = ""
        }
        add_html += "<div class='c_table_row'><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_add'>更新</a></div><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_cancel'>放弃</a></div></div>"
        $('#c_table_full_div').html(add_html)
        $('#c_table_full_div').css('display', 'block')
        $('.c_table_col select[multiple!="multiple"]').chosen();
        $('.c_table_col select[multiple="multiple"]').multipleSelect({filter: true});

        // 放弃操作处理函数
        $('#c_table_do_cancel').click(function(){
          $('#c_table_full_div').css('display', 'none')
          $('#c_table_full_div').html('')
        })
        // 更新操作处理函数
        $('#c_table_do_add').click(function(){
          // 获取老数据的id
          var event_id = event.target.id
          var uniq_id = event_id.substring(16, event_id.length)
          // 获取数据并填充data
          var current_data = that.data("c_table_data")
          var new_record = []
          // uniq用于标示唯一行
          new_record.push({
            name:"_uniq_id_",
            type:"_uniq_id_",
            text:uniq_id,
            value:uniq_id,
            title:"_uniq_id_",
          })

          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            if (o['hide'] === true) {
              continue
            }
            var o_id = '#c_table_item_' + o['name']
            var current_value = $(o_id).val()
            if (current_value instanceof Array) {
              current_value = current_value.join(",")
            }
            //console.log(o["title"] + ": " + current_value)
            // 判断是否强制要求填写
            if ((current_value === null || current_value === "") && o['empty'] == false) {
              alert("必填项 " + o["title"] + " 没有值")
              return
            }

            // 运行校验函数
            if (o['validation'](current_value) == false) {
              console.log("" + o["title"] + " 校验失败，请确认该项填写是否符合要求")
              return
            }

            var new_value = {}
            new_value['name'] = o['name']
            new_value['value'] = current_value
            new_value['type'] = o['type']
            new_value['title'] = o['title']
            if ( o['type']=='INPUT') {
              new_value['text'] = current_value
            } else if ( o['type']=='TEXTAREA') {
              new_value['text'] = current_value
            } else if (o['type'] == "SELECT") {
              new_value['text'] = $(o_id + ' option:selected').text()
            } else if (o['type'] == "MULTI-SELECT") {
              var t_text = ""
              $(o_id + ' option:selected').each(function(){
                t_text += $(this).text()
                t_text += ', '
              })
              new_value['text'] = t_text.substring(0, t_text.length-2)
            }
            new_record.push(new_value)
          }

          var new_datas = []
          for (var ni=0;ni<current_data.length;ni++) {
            if (current_data[ni][0].value == uniq_id) {
              new_datas.push(new_record)
            } else {
              new_datas.push(current_data[ni])
            }
          }
          var old_datas = current_data
          current_data = new_datas

          that.data("c_table_data", current_data)

          // 运行全局校验
          if (options.validation !== undefined) {
            if (options['validation']() == false) {
              console.log("全局校验失败，请确认该项填写是否符合要求")
              current_data = old_datas
              that.data("c_table_data", current_data)
              return
            }
          }
          //that.data("c_table_data", current_data)
          thiss.c_table_loads(callback, pluginElement)
          $('#c_table_full_div').css('display', 'none')
          $('#c_table_full_div').html('')

          if (callback !== undefined) {
            callback(JSON.stringify(that.data('c_table_data')))
          }
        })

        function get_html_from_id(node_id) {
          html = ""
          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            var o_id = '#c_table_item_' + o['name']
            if (o_id == node_id) {
              html += o['content']()
              break
            }
          }
          return html
        }

        function get_node_type_by_id(node_id) {
          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            var o_id = '#c_table_item_' + o['name']
            if (o_id == node_id) {
              return o['type']
            }
          }
        }

        // 依赖关系的SELECT处理函数
        function update_select(tree, force){
          var node_id = tree.name
          var node_value = $(node_id).val()
          var node_pre_value = current_record_data[node_id]
          // 更新节点内容
          if (force) {
            node_value = ''
          }
          if (typeof(node_pre_value) === 'undefined' || node_pre_value === null) {
            // 第一次初始化时使用
            node_pre_value = node_value
          }
          current_record_data[node_id] = node_value
          //console.log(node_id + " current value is: " + node_value + ", pre_value is: " + node_pre_value)
          // 如果根节点没有变化且force为false(表示之前的父节点都没有变)则不做操作，直接让子节点递归
          if (node_value === node_pre_value && force === false) {
            //console.log("value not changed and force is false")
            for(var i=0; i<tree.children.length; i++) {
              update_select(tree.children[i], false)
            }
          } else {
            // 如果根节点没有变化且force为true(表示之前的父节点存在变化)则重新生成自身，然后让子节点递归
            // 如果根节点变化了则进行更行，并且force设置为true，然后让子节点递归
            // 上面两种情况都会造成：1. 根节点更新 2. 让子节点递归 3. force为true
            if (force === true) {
              var node_new_html = get_html_from_id(node_id)
              //console.log(node_new_html)
              $(node_id).html(node_new_html)
              // 如果是多选则要执行多选初始化操作
              if(get_node_type_by_id(node_id) == 'MULTI-SELECT') {
                $(node_id).multipleSelect({filter: true})
              }
              // 如果是单选则要执行单元初始化操作
              if(get_node_type_by_id(node_id) == 'SELECT') {
                $(node_id).chosen("destroy");
                $(node_id).chosen();
              }
              // html改变，需要执行post操作
              for(var i=0; i<options['columns'].length; i++) {
                var o = options['columns'][i]
                if (o['hide']===true) {
                  continue
                }
                if ('#c_table_item_' + o['name'] !== node_id) {
                  continue
                }
                if (typeof(o['post'])==='function') {
                  o['post']()
                }
              }
              for(var i=0; i<tree.children.length; i++) {
                update_select(tree.children[i], true)
              }
            } else {
              if (node_value !== node_pre_value) {
                // 根节点变了，因此子节点强制重新加载
                for(var i=0; i<tree.children.length; i++) {
                  update_select(tree.children[i], true)
                }
              } else {
                // 根节点没变，因此子节点根据情况进行变化
                for(var i=0; i<tree.children.length; i++) {
                  update_select(tree.children[i], false)
                }
              }
            }
          }
        }
        function onchange(){
          // 生成反向决定树
          var tree = parse_options_into_nodes(options)
          //tree.dumps()

          // 从反向决定树的根节点开始递归，如果某个节点变动了，则其所有子节点重新加载数据
          for (var i=0; i<tree.children.length; i++) {
              update_select(tree.children[i], false)
          }
        }

        for (var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          if (o['hide'] === true) continue
          if (o['type'] == "INPUT" || o['type'] == "TEXTAREA") {
            // INPUT不受依赖约束的影响
          } else if (o['type'] == "SELECT") {
            var o_id = '#c_table_item_' + o['name']
            $(o_id).change(onchange)
          } else if (o['type'] == "MULTI-SELECT") {
            // MULTI-SELECT不受依赖约束的影响，但是可以依赖SELECT
          }
        }

        // 生成初始化内容
        // 生成反向决定树
        var tree = parse_options_into_nodes(options)
        tree.dumps()
        for (var i=0; i<tree.children.length; i++) {
            update_select(tree.children[i], true)
        }

        function get_item_value_by_id(uniq_id, data, o) {
          var v = ""
          for (var z=0; z<data.length; z++) {
            var row = data[z]
            if ('' + row[0]['value'] == '' + uniq_id) {
              for(var j=1; j<row.length; j++) {
                if (o['name'] == row[j]['name']) {
                  v = row[j]['value']
                }
              }
            }
          }
          return v
        }

        // 加载已有数据，从头往下进行加载，对于SELECT加载后触发onchange操作
        var event_id = event.target.id
        var uniq_id = event_id.substring(16, event_id.length)
        var current_data = that.data("c_table_data")
        for (var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          var o_id = '#c_table_item_' + o['name']
          if (o['hide'] === true) continue
          if (o['type'] == "INPUT") {
            $(o_id).val(get_item_value_by_id(uniq_id, current_data, o))
          } else if (o['type'] == "TEXTAREA") {
            $(o_id).val(get_item_value_by_id(uniq_id, current_data, o))
          } else if (o['type'] == "SELECT") {
            $(o_id).val(get_item_value_by_id(uniq_id, current_data, o))
            $(o_id).trigger("chosen:updated")
            onchange()
          } else if (o['type'] == "MULTI-SELECT") {
            $(o_id).multipleSelect('setSelects', get_item_value_by_id(uniq_id, current_data, o).split(","))
          }
        }
      })
    })

    // 绑定查看方法
    pluginElement.find('.c_table_tr_view').each(function(){
      var thatt = $(this)
      thatt.click(function(){
        var r_id = $(this).attr('id')
        var uniq_id = r_id.substring(16, r_id.length)
        var view_html = ""
        for(var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          if (o['hide']===true) {
            continue
          }
          var data = that.data('c_table_data')
          var v = ""
          for (var z=0; z<data.length; z++) {
            var row = data[z]
            if ('' + row[0]['value'] == '' + uniq_id) {
              for(var j=1; j<row.length; j++) {
                if (o['name'] == row[j]['name']) {
                  v = row[j]['text']
                }
              }
            }
          }
          view_html += "<div class='c_table_row_display'>"
          view_html += "<div class='c_table_col_display'>"
          view_html += o['title']
          view_html += ":"
          view_html += "</div>"
          view_html += "<div class='c_table_col_display'>"
          if (o['sensitive'] === true && has_sensitive_privilege === false) {
            view_html += "仅相关人员可见"
          } else {
            view_html += v
          }
          view_html += "</div>"
          view_html += "</div>"
        }
        view_html += "<div class='c_table_row'><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_close'>关闭</a></div></div>"
        $('#c_table_full_div').html(view_html)
        $('#c_table_full_div').css('display', 'block')
        // 关闭操作处理函数
        $('#c_table_do_close').click(function(){
          $('#c_table_full_div').css('display', 'none')
          $('#c_table_full_div').html('')
        })
      })
    })

    // 绑定删除方法
    if(that.data('c_table_data_readonly') === false) {
      $('.c_table_tr_del').each(function(){
        var thatt = $(this)
        thatt.click(function(){
          var r_id = $(this).attr('id')
          var uniq_id = r_id.substring(15, r_id.length)
            var new_data = []
            var data = that.data('c_table_data')
            for(var k=0; k<data.length; k++) {
              if ('' + data[k][0]['value'] != '' + uniq_id) {
                new_data.push(data[k])
              }
            }
            that.data('c_table_data', new_data)
            thiss.c_table_loads(callback, pluginElement)
            if (callback !== undefined) {
              callback(JSON.stringify(that.data('c_table_data')))
            }
        })
      })
    }
  }

  function dumps() {
    var thiss = this
    var that = $(this)
    var data = that.data('c_table_data')
    var uniq_id = that.data("c_table_data_uniq_id")
    var options = that.data("c_table_data_options")
    return JSON.stringify({
      data:data,
      uniq_id:uniq_id,
      options:options
    })
  }

  function init_c_table(target, options, readonly, init_data, has_sensitive_privilege, callback) {
    //console.log('init c_table for :' + options['name'])
    var that = $(target)
    var pluginElement = $(target)
    // 表格元数据
    that.data("c_table_data", init_data)
    var uniq_id_bl = 0
    for (var u=0; u<init_data.length; u++) {
      if (init_data[u][0]['value']>uniq_id_bl) {
        uniq_id_bl = init_data[u][0]['value']
      }
    }
    uniq_id_bl += 10
    // 当前可用的id，使用一次要记得加1
    that.data("c_table_data_uniq_id", uniq_id_bl)
    // 保存options
    that.data("c_table_data_options", options)
    // 控件是否可以编辑
    that.data("c_table_data_readonly", readonly)
    // 当前查看流程的人是否有权限查看敏感数据
    that.data("c_table_has_sensitive_privilege", has_sensitive_privilege)
    console.log("has sensitive privilege", has_sensitive_privilege)
    // 绑定loads
    that.c_table_loads = loads
    // 绑定dumps
    that.c_table_dumps = dumps

    // 生成界面
    //console.log(options)
    // 主界面
    display_html = ""
    display_html += "<table>"
    display_html += "<thead><tr>"
    for(var i=0; i<options['columns'].length; i++) {
      var o = options['columns'][i]
      if (o['hide']===false && o['display']===true) {
        display_html += "<th nowrap=\"nowrap\">"
        display_html += o['title']
        display_html += "</th>"
      }
    }
    display_html += "<th nowrap=\"nowrap\">"
    if (that.data("c_table_data_readonly") && has_sensitive_privilege) {
      display_html += "<a href='javascript:void(0)' id='c_table_export'>导出</a>"
    } else if (that.data("c_table_data_readonly") && has_sensitive_privilege === false) {
      display_html += ""
    } else {
      display_html += "<a href='javascript:void(0)' id='c_table_add'>新增</a>"
    }
    display_html += "</th>"
    display_html += "</tr></thead>"
    display_html += "<tbody id='c_table_tbody'>"
    display_html += "</tbody>"
    display_html += "</table>"
    //console.log("display_html:" + display_html)
    that.html(display_html)
    // 导出按钮
    if (that.data("c_table_data_readonly")===true) {
      pluginElement.find('#c_table_export').click(function(){
        var data = that.data('c_table_data')
        var options = that.data('c_table_data_options')
        var has_sensitive_privilege = that.data('c_table_has_sensitive_privilege')
        $.ajax(
              "/ctable/export",
              {
                dataType: 'json',
                data: JSON.stringify(data),
                method: 'POST',
                processData: false,
                async: false,
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log(jqXHR.responseText)
                  var responseText = $.parseJSON(jqXHR.responseText);
                  var err_msg = responseText
                  result = false
                  console.log(err_msg);
                  alert("导出报错，提示：" + err_msg);
                },
                success: function(data, textStatus, jqXHR) {
                  var responseText = $.parseJSON(jqXHR.responseText);
                  window.location = "/v2/ajax/file/download/" + responseText.path + "/" + responseText.file_name
                }
              }
            );

      })
    }

    // 新增按钮页面
    if (that.data("c_table_data_readonly")===false) {
      pluginElement.find('#c_table_import').click(function() {
        console.log('import')
        var import_html = ""
        import_html += "<div class='c_table_row'>"
        import_html += "<div class='c_table_col'>"
        import_html += "待导入文件:"
        import_html += "</div>"
        import_html += "<div class='c_table_col'>"
        import_html += '<form id="ajax_c_table_form" method="post"><input type="file" class="col-xs-12 col-sm-10" name="c_table_import_file" id="c_table_import_file"></input></form>'
        import_html += "</div>"
        import_html += "</div>"

        import_html += "<div class='c_table_row'><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_import'>导入</a></div><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_cancel'>放弃</a></div></div>"
        pluginElement.find('#c_table_full_div').html(import_html)
        pluginElement.find('#c_table_full_div').css('display', 'block')

        // 导入操作处理函数
        pluginElement.find('#c_table_do_import').click(function(){
          var fd = new FormData(document.getElementById("ajax_c_table_form"));
          $.ajax({
                url: "/ajax/c_table/extract_excel",
                type: "POST",
                data: fd,
                async: false,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false   // tell jQuery not to set contentType
              }).done(function( result ) {
                  result = JSON.parse(result)
                  if (result.result=='SUCCESSFUL') {
                      var excel_data = result.data
                      console.log(JSON.stringify(excel_data))
                      for (var ri=0; ri<excel_data.length; ri++) {
                        var excel_row = excel_data[ri]
                        if (options['columns'].length != excel_row.length) {
                          alert('文件列数无效!')
                          return
                        }
                        // 获取数据并填充data
                        var current_data = that.data("c_table_data")
                        var new_record = []
                        var uniq_id = that.data('c_table_data_uniq_id')
                        that.data('c_table_data_uniq_id', uniq_id+1)
                        // uniq用于标示唯一行
                        new_record.push({
                          name:"_uniq_id_",
                          type:"_uniq_id_",
                          text:uniq_id,
                          value:uniq_id,
                          title:"_uniq_id_",
                        })

                        for (var i=0; i<options['columns'].length; i++) {
                          var o = options['columns'][i]
                          if (o['hide'] === true) {
                            continue
                          }
                          var o_id = '#c_table_item_' + o['name']
                          var current_value = excel_row[i]
                          console.log(current_value)
                          var values = current_value.split("$$$")
                          var fv = ""
                          var sv = ""
                          if (values.length == 2) {
                            fv = values[0]
                            sv = values[1]
                          } else {
                            fv = values[0]
                            sv = values[0]
                          }
                          console.log('handle value: ' + current_value)
                          //console.log(o["title"] + ": " + current_value)
                          // 判断是否强制要求填写
                          if ((current_value === null || current_value === "") && o['empty'] == false) {
                            alert("必填项 " + o["title"] + " 没有值")
                            return
                          }

                          // 运行校验函数
                          if (o['validation'](fv) == false) {
                            console.log("" + o["title"] + " 校验失败，请确认该项填写是否符合要求")
                            return
                          }

                          var new_value = {}
                          new_value['name'] = o['name']
                          new_value['value'] = fv
                          new_value['type'] = o['type']
                          new_value['title'] = o['title']
                          if ( o['type']=='INPUT') {
                            new_value['text'] = sv
                          } else if ( o['type']=='TEXTAREA') {
                            new_value['text'] = sv
                          } else if (o['type'] == "SELECT") {
                            if (values.length == 1) {
                              alert(o['title'] + ': 下拉框类型需要在导入文件中通过$$$分隔内部值和显示值，例如『1:张江』')
                              return
                            }
                            new_value['text'] = sv
                          } else if (o['type'] == "MULTI-SELECT") {
                            if (values.length == 1) {
                              alert('下拉框类型需要在导入文件中通过$$$分隔内部值和显示值，例如『1:张江』')
                              return
                            }
                            new_value['text'] = sv
                          }
                          new_record.push(new_value)
                        }
                        current_data.push(new_record)

                        // 运行全局校验
                        if (options.validation !== undefined) {
                          if (options['validation']() == false) {
                            console.log("全局校验失败，请确认该项填写是否符合要求")
                            current_data.pop()
                            return
                          }
                        }
                      }
                      pluginElement.find('#c_table_full_div').css('display', 'none')
                      pluginElement.find('#c_table_full_div').html('')
                      that.c_table_loads(callback, pluginElement)
                      if (callback !== undefined) {
                        callback(JSON.stringify(that.data('c_table_data')))
                      }
                  }
                  else {
                      alert( "发生错误(可能的原因：模板格式有误" );
                  }
              });
        })

        // 放弃操作处理函数
        pluginElement.find('#c_table_do_cancel').click(function(){
          pluginElement.find('#c_table_full_div').css('display', 'none')
          pluginElement.find('#c_table_full_div').html('')
        })
      })

      pluginElement.find('#c_table_add').click(function(){
        console.log("add row")
        var current_record_data = {}
        var add_html = ""
        for(var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          if (o['hide']===true) {
            continue
          }
          add_html += "<div class='c_table_row'>"
          add_html += "<div class='c_table_col'>"
          add_html += o['title']
          add_html += ":"
          add_html += "</div>"
          add_html += "<div class='c_table_col'>"
          if (o['type'] == "INPUT") {
            add_html += "<input type='text' style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html +="></input>"
          } else if (o['type'] == "TEXTAREA") {
            add_html += "<textarea style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html +="></textarea>"
          } else if (o['type'] == "SELECT") {
            add_html += "<select style=\"width:200px;\""
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html += "></select>"
          } else if (o['type'] == "MULTI-SELECT") {
            add_html += "<select multiple=\"multiple\" style=\"width:200px;\" "
            add_html += " id='c_table_item_" + o['name'] +  "' "
            add_html += "></select>"
          }
          add_html += "</div>"
          add_html += "</div>"
          current_record_data['c_table_item_' + o['name']] = ""
        }
        add_html += "<div class='c_table_row'><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_add'>新增</a></div><div class='c_table_col'><a href='javascript:void(0)' id='c_table_do_cancel'>放弃</a></div></div>"
        $('#c_table_full_div').html(add_html)
        $('#c_table_full_div').css('display', 'block')
        $('.c_table_col select[multiple!="multiple"]').chosen();
        $('.c_table_col select[multiple="multiple"]').multipleSelect({filter: true});

        // 放弃操作处理函数
        $('#c_table_do_cancel').click(function(){
          $('#c_table_full_div').css('display', 'none')
          $('#c_table_full_div').html('')
        })
        // 新增操作处理函数
        $('#c_table_do_add').click(function(){
          // 获取数据并填充data
          var current_data = that.data("c_table_data")
          var new_record = []
          var uniq_id = that.data('c_table_data_uniq_id')
          that.data('c_table_data_uniq_id', uniq_id+1)
          // uniq用于标示唯一行
          new_record.push({
            name:"_uniq_id_",
            type:"_uniq_id_",
            text:uniq_id,
            value:uniq_id,
            title:"_uniq_id_",
          })

          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            if (o['hide'] === true) {
              continue
            }
            var o_id = '#c_table_item_' + o['name']
            var current_value = $(o_id).val()
            if (current_value instanceof Array) {
              current_value = current_value.join(",")
            }
            //console.log(o["title"] + ": " + current_value)
            // 判断是否强制要求填写
            if ((current_value === null || current_value === "") && o['empty'] == false) {
              alert("必填项 " + o["title"] + " 没有值")
              return
            }

            // 运行校验函数
            if (o['validation'](current_value) == false) {
              console.log("" + o["title"] + " 校验失败，请确认该项填写是否符合要求")
              return
            }

            var new_value = {}
            new_value['name'] = o['name']
            new_value['value'] = current_value
            new_value['type'] = o['type']
            new_value['title'] = o['title']
            if ( o['type']=='INPUT') {
              new_value['text'] = current_value
            } else if ( o['type']=='TEXTAREA') {
              new_value['text'] = current_value
            } else if (o['type'] == "SELECT") {
              new_value['text'] = $(o_id + ' option:selected').text()
            } else if (o['type'] == "MULTI-SELECT") {
              var t_text = ""
              $(o_id + ' option:selected').each(function(){
                t_text += $(this).text()
                t_text += ', '
              })
              new_value['text'] = t_text.substring(0, t_text.length-2)
            }
            new_record.push(new_value)
          }
          current_data.push(new_record)

          // 运行全局校验
          if (options.validation !== undefined) {
            if (options['validation']() == false) {
              console.log("全局校验失败，请确认该项填写是否符合要求")
              current_data.pop()
              return
            }
          }
          //that.data("c_table_data", current_data)
          that.c_table_loads(callback, pluginElement)
          $('#c_table_full_div').css('display', 'none')
          $('#c_table_full_div').html('')

          if (callback !== undefined) {
            callback(JSON.stringify(that.data('c_table_data')))
          }
        })

        function get_html_from_id(node_id) {
          html = ""
          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            var o_id = '#c_table_item_' + o['name']
            if (o_id == node_id) {
              html += o['content']()
              break
            }
          }
          return html
        }

        function get_node_type_by_id(node_id) {
          for (var i=0; i<options['columns'].length; i++) {
            var o = options['columns'][i]
            var o_id = '#c_table_item_' + o['name']
            if (o_id == node_id) {
              return o['type']
            }
          }
        }

        // 依赖关系的SELECT处理函数
        function update_select(tree, force){
          var node_id = tree.name
          var node_value = $(node_id).val()
          var node_pre_value = current_record_data[node_id]
          // 更新节点内容
          if (force) {
            node_value = ''
          }
          if (typeof(node_pre_value) === 'undefined' || node_pre_value === null) {
            // 第一次初始化时使用
            node_pre_value = node_value
          }
          current_record_data[node_id] = node_value
          //console.log(node_id + " current value is: " + node_value + ", pre_value is: " + node_pre_value)
          // 如果根节点没有变化且force为false(表示之前的父节点都没有变)则不做操作，直接让子节点递归
          if (node_value === node_pre_value && force === false) {
            //console.log("value not changed and force is false")
            for(var i=0; i<tree.children.length; i++) {
              update_select(tree.children[i], false)
            }
          } else {
            // 如果根节点没有变化且force为true(表示之前的父节点存在变化)则重新生成自身，然后让子节点递归
            // 如果根节点变化了则进行更行，并且force设置为true，然后让子节点递归
            // 上面两种情况都会造成：1. 根节点更新 2. 让子节点递归 3. force为true
            if (force === true) {
              var node_new_html = get_html_from_id(node_id)
              //console.log(node_new_html)
              $(node_id).html(node_new_html)
              // 如果是多选则要执行多选初始化操作
              if(get_node_type_by_id(node_id) == 'MULTI-SELECT') {
                $(node_id).multipleSelect({filter: true})
              }
              // 如果是单选则要执行单元初始化操作
              if(get_node_type_by_id(node_id) == 'SELECT') {
                $(node_id).chosen("destroy");
                $(node_id).chosen();
              }
              // html改变，需要执行post操作
              for(var i=0; i<options['columns'].length; i++) {
                var o = options['columns'][i]
                if (o['hide']===true) {
                  continue
                }
                if ('#c_table_item_' + o['name'] !== node_id) {
                  continue
                }
                if (typeof(o['post'])==='function') {
                  o['post']()
                }
              }
              for(var i=0; i<tree.children.length; i++) {
                update_select(tree.children[i], true)
              }
            } else {
              if (node_value !== node_pre_value) {
                // 根节点变了，因此子节点强制重新加载
                for(var i=0; i<tree.children.length; i++) {
                  update_select(tree.children[i], true)
                }
              } else {
                // 根节点没变，因此子节点根据情况进行变化
                for(var i=0; i<tree.children.length; i++) {
                  update_select(tree.children[i], false)
                }
              }
            }
          }
        }
        function onchange(){
          // 生成反向决定树
          var tree = parse_options_into_nodes(options)
          //tree.dumps()

          // 从反向决定树的根节点开始递归，如果某个节点变动了，则其所有子节点重新加载数据
          for (var i=0; i<tree.children.length; i++) {
              update_select(tree.children[i], false)
          }
        }

        for (var i=0; i<options['columns'].length; i++) {
          var o = options['columns'][i]
          if (o['hide'] === true) continue
          if (o['type'] == "INPUT" || o['type'] == "TEXTAREA") {
            // INPUT不受依赖约束的影响
          } else if (o['type'] == "SELECT") {
            var o_id = '#c_table_item_' + o['name']
            $(o_id).change(onchange)
          } else if (o['type'] == "MULTI-SELECT") {
            // MULTI-SELECT不受依赖约束的影响，但是可以依赖SELECT
          }
        }

        // 生成初始化内容
        // 生成反向决定树
        var tree = parse_options_into_nodes(options)
        tree.dumps()
        for (var i=0; i<tree.children.length; i++) {
            update_select(tree.children[i], true)
        }
      })
    }

    // 加载一次数据
    that.c_table_loads(callback, pluginElement)
  }

  function CTable() {

  }

  // NAS
  CTable.prototype.init_nas_from_init_data = function(target, d, f){
    init_c_table(target, NAS, false, d, true, f)
  }

  CTable.prototype.init_nas_readonly = function(target, d, s){
    init_c_table(target, NAS, true, d, s)
  }
  CTable.prototype.init_nas = function(target, f){
    init_c_table(target, NAS, false, [], true, f)
  }

  // A_RECORD
  CTable.prototype.init_a_record_from_init_data = function(target, d, f){
    init_c_table(target, A_RECORD, false, d, true, f)
  }

  CTable.prototype.init_a_record_readonly = function(target, d, s){
    init_c_table(target, A_RECORD, true, d, s)
  }
  CTable.prototype.init_a_record = function(target, f){
    init_c_table(target, A_RECORD, false, [], true, f)
  }

  // NEW_NAS
  CTable.prototype.init_new_nas_from_init_data = function(target, d, f){
    init_c_table(target, NEW_NAS, false, d, true, f)
  }

  CTable.prototype.init_new_nas_readonly = function(target, d, s){
    init_c_table(target, NEW_NAS, true, d, s)
  }
  CTable.prototype.init_new_nas = function(target, f){
    init_c_table(target, NEW_NAS, false, [], true, f)
  }

  // OGG
  CTable.prototype.init_ogg_from_init_data = function(target, d, f){
    init_c_table(target, OGG, false, d, true, f)
  }

  CTable.prototype.init_ogg_readonly = function(target, d, s){
    init_c_table(target, OGG, true, d, s)
  }
  CTable.prototype.init_ogg = function(target, f){
    init_c_table(target, OGG, false, [], true, f)
  }

  // VIP
  CTable.prototype.init_vip_from_init_data = function(target, d, f){
    init_c_table(target, VIP, false, d, true, f)
  }

  CTable.prototype.init_vip_readonly = function(target, d, s){
    init_c_table(target, VIP, true, d, s)
  }
  CTable.prototype.init_vip = function(target, f){
    init_c_table(target, VIP, false, [], true, f)
  }

  // SFTP
  CTable.prototype.init_sftp_from_init_data = function(target, d, f){
    init_c_table(target, SFTP, false, d, true, f)
  }

  CTable.prototype.init_sftp_readonly = function(target, d, s){
    init_c_table(target, SFTP, true, d, s)
  }
  CTable.prototype.init_sftp = function(target, f){
    init_c_table(target, SFTP, false, [], true, f)
  }

  // FIREWALL
  CTable.prototype.init_firewall_from_init_data = function(target, d, f){
    init_c_table(target, FIREWALL, false, d, true, f)
  }

  CTable.prototype.init_firewall_readonly = function(target, d, s){
    init_c_table(target, FIREWALL, true, d, s)
  }
  CTable.prototype.init_firewall = function(target, f){
    init_c_table(target, FIREWALL, false, [], true, f)
  }

  // AUTO_FIREWALL
  CTable.prototype.init_auto_firewall_from_init_data = function(target, d, f){
    init_c_table(target, AUTO_FIREWALL, false, d, true, f)
  }

  CTable.prototype.init_auto_firewall_readonly = function(target, d, s){
    init_c_table(target, AUTO_FIREWALL, true, d, s)
  }
  CTable.prototype.init_auto_firewall = function(target, f){
    init_c_table(target, AUTO_FIREWALL, false, [], true, f)
  }

  // FIREWALL_EXPAND
  CTable.prototype.init_firewall_expand_from_init_data = function(target, d, f){
    init_c_table(target, FIREWALL_EXPAND, false, d, true, f)
  }

  CTable.prototype.init_firewall_expand_readonly = function(target, d, s){
    init_c_table(target, FIREWALL_EXPAND, true, d, s)
  }
  CTable.prototype.init_firewall_expand = function(target, f){
    init_c_table(target, FIREWALL_EXPAND, false, [], true, f)
  }

  // SQLREOPEN
  CTable.prototype.init_sqlreopen_from_init_data = function(target, d, f){
    init_c_table(target, SQLREOPEN, false, d, true, f)
  }

  CTable.prototype.init_sqlreopen_readonly = function(target, d, s){
    init_c_table(target, SQLREOPEN, true, d, s)
  }
  CTable.prototype.init_sqlreopen = function(target, f){
    init_c_table(target, SQLREOPEN, false, [], true, f)
  }

  // SQL_DATA_PATCH
  CTable.prototype.init_sqldatapatch_from_init_data = function(target, d, f){
    init_c_table(target, SQL_DATA_PATCH, false, d, true, f)
  }

  CTable.prototype.init_sqldatapatch_readonly = function(target, d, s){
    init_c_table(target, SQL_DATA_PATCH, true, d, s)
  }
  CTable.prototype.init_sqldatapatch = function(target, f){
    init_c_table(target, SQL_DATA_PATCH, false, [], true, f)
  }

  // F5_AND_CTRIX
  CTable.prototype.init_f5andctrix_from_init_data = function(target, d, f){
    init_c_table(target, F5_AND_CTRIX, false, d, true, f)
  }

  CTable.prototype.init_f5andctrix_readonly = function(target, d, s){
    init_c_table(target, F5_AND_CTRIX, true, d, s)
  }
  CTable.prototype.init_f5andctrix = function(target, f){
    init_c_table(target, F5_AND_CTRIX, false, [], true, f)
  }

  // CFG_SCHEDULE
  CTable.prototype.init_cfg_schedule_from_init_data = function(target, d, f){
    init_c_table(target, CFG_SCHEDULE, false, d, true, f)
  }

  CTable.prototype.init_cfg_schedule_readonly = function(target, d, s){
    init_c_table(target, CFG_SCHEDULE, true, d, s)
  }
  CTable.prototype.init_cfg_schedule = function(target, f){
    init_c_table(target, CFG_SCHEDULE, false, [], true, f)
  }

  // CFG_ERRORCODE
  CTable.prototype.init_cfg_errorcode_from_init_data = function(target, d, f){
    init_c_table(target, CFG_ERRORCODE, false, d, true, f)
  }

  CTable.prototype.init_cfg_errorcode_readonly = function(target, d, s){
    init_c_table(target, CFG_ERRORCODE, true, d, s)
  }
  CTable.prototype.init_cfg_errorcode = function(target, f){
    init_c_table(target, CFG_ERRORCODE, false, [], true, f)
  }

  // CFG_CONFIG
  CTable.prototype.init_cfg_config_from_init_data = function(target, d, f){
    init_c_table(target, CFG_CONFIG, false, d, true, f)
  }

  CTable.prototype.init_cfg_config_readonly = function(target, d, s){
    init_c_table(target, CFG_CONFIG, true, d, s)
  }
  CTable.prototype.init_cfg_config = function(target, f){
    init_c_table(target, CFG_CONFIG, false, [], true, f)
  }

  // CFG_MQ
  CTable.prototype.init_cfg_mq_from_init_data = function(target, d, f){
    init_c_table(target, CFG_MQ, false, d, true, f)
  }

  CTable.prototype.init_cfg_mq_readonly = function(target, d, s){
    init_c_table(target, CFG_MQ, true, d, s)
  }
  CTable.prototype.init_cfg_mq = function(target, f){
    init_c_table(target, CFG_MQ, false, [], true, f)
  }

  // CFG_PROPERTIES
  CTable.prototype.init_cfg_properties_from_init_data = function(target, d, f, chainId){
    CFG_PROPERTIES.chainId = chainId
    init_c_table(target, CFG_PROPERTIES, false, d, true, f)
  }

  CTable.prototype.init_cfg_properties_readonly = function(target, d, s, chainId){
    CFG_PROPERTIES.chainId = chainId
    init_c_table(target, CFG_PROPERTIES, true, d, s)
  }
  CTable.prototype.init_cfg_properties = function(target, f, chainId){
    CFG_PROPERTIES.chainId = chainId
    init_c_table(target, CFG_PROPERTIES, false, [], true, f)
  }

  // export
  this.CTable = CTable

  $(document).ready(function(){
    $(document.body).append("<div class=\"c_table_full\" style=\"display:none\" id=\"c_table_full_div\"></div>")
  })

})(jQuery);
