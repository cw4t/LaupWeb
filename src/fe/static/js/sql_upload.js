(function($){

  var basicConfig = {
    limitations: {
      "sqlRecordLimitation": 0, // 如果该值为0则不限制脚本行数，否则实际的脚本行数必须和这个值一致。注意这个值不是指的用户的SQL影响了多少行，而只是说用户提交的文件中包含了多少个SQL语句
      "DMLAffectRowsLimitation": "LARGE_THAN_ZERO", // DML语句影响的行数限制，如果是LARGE_THAN_ZERO则要求大于0
      "seqLimitation": 30, // 最大的执行脚本数目
      "rollbackLimitation": ["INSERT", "UPDATE", "DELETE"], // 必须提供回滚文件的语句类型
    },
    // 初始化时这里会根据seqLimitation的值生成对应数目的记录，且状态会被置为NOT_UPLOAD
    records: [
      {
        "sqlType": "", // SQL类型，会让用户在下拉框中选择，包含INSERT/UPDATE/DELETE/DDL
        "originFileName": "", // 用户上传的文件的文件名
        "originFilePath": "", // 用户上传的文件的存放路径
        "rollbackFileName": "", // 用户上传的回滚文件的文件名
        "rollbackFilePath": "", // 用户上传的回滚文件的存放路径
        "sequence": 0, // 执行顺序，0表示无顺序
        "affectRows": 0, // 影响行数
        "comment": "", // 备注
        "originFileStatus": "", // 文件的检查状态, 包含: "NOT_UPLOAD", "SQL_VALIDATION_PROCESSING", "SQL_VALIDATION_SUCCESSFUL", "SQL_VALIDATION_FAILED"，表示未上传、SQL审查中、SQL审查成功和SQL审查失败，提交平台如果有问题这里的状态也是SQL审查失败
        "originFileCheckResult": "", // 文件的审查详情信息
        "rollbackFileStatus": "", // 回滚文件的检查状态，内容同originFileStatus
        "rollbackFileCheckResult": "", // 回滚文件的审查详情信息
      }
    ],
  }

  function gen_page_for_write(config, chain_id, target, callback, chain_extra_data) {
    var that = $(target)
    var display_html = ""



    that.html(display_html)
  }

  function gen_page_for_read(config, chain_id, target, callback, chain_extra_data) {

  }

  function gen_page(config, chain_id, target, status, callback, chain_extra_data) {
    var that = $(target)
    if (status === "write") {
      gen_page_for_write(config, chain_id, target, callback, chain_extra_data)
    } else {
      gen_page_for_read(config, chain_id, target, callback, chain_extra_data)
    }
  }

  function init_plugin(chain_id, target, value, status, callback, cfg, chain_extra_data) {
    var that = $(target)
    var config = undefined
    if (value !== undefined && value !== "") {
      config = JSON.parse(value)
    } else if (cfg !== undefined) {
      var config = {
        limitations: {
          "sqlRecordLimitation": 0,
          "DMLAffectRowsLimitation": "LARGE_THAN_ZERO",
          "seqLimitation": 30,
          "rollbackLimitation": ["INSERT", "UPDATE", "DELETE"],
        },
        records: [

        ]
      }
      if (cfg.sqlRecordLimitation !== undefined) {
        config.limitations.sqlRecordLimitation = cfg.sqlRecordLimitation
      }
      if (cfg.DMLAffectRowsLimitation !== undefined) {
        config.limitations.DMLAffectRowsLimitation = cfg.DMLAffectRowsLimitation
      }
      if (cfg.seqLimitation !== undefined) {
        config.limitations.seqLimitation = cfg.seqLimitation
      }
      if (cfg.rollbackLimitation !== undefined) {
        config.limitations.rollbackLimitation = cfg.rollbackLimitation
      }

      for (var idx=0; idx<config.limitations.seqLimitation.length; idx++) {
        config.records.push({
          "sqlType": "",
          "originFileName": "",
          "originFilePath": "",
          "rollbackFileName": "",
          "rollbackFilePath": "",
          "sequence": idx+1,
          "affectRows": 0,
          "comment": "",
          "originFileStatus": "NOT_UPLOAD",
          "originFileCheckResult": "",
          "rollbackFileStatus": "",
          "rollbackFileCheckResult": "",
        })
      }

    } else {
      var config = {
        limitations: {
          "sqlRecordLimitation": 0,
          "DMLAffectRowsLimitation": "LARGE_THAN_ZERO",
          "seqLimitation": 30,
          "rollbackLimitation": ["INSERT", "UPDATE", "DELETE"],
        },
        records: [

        ]
      }
      for (var idx=0; idx<config.limitations.seqLimitation.length; idx++) {
        config.records.push({
          "sqlType": "",
          "originFileName": "",
          "originFilePath": "",
          "rollbackFileName": "",
          "rollbackFilePath": "",
          "sequence": idx+1,
          "affectRows": 0,
          "comment": "",
          "originFileStatus": "NOT_UPLOAD",
          "originFileCheckResult": "",
          "rollbackFileStatus": "",
          "rollbackFileCheckResult": "",
        })
      }
    }

    console.log(config)
    // 持久化数据
    callback(config)

    // 生成页面
    gen_page(config, chain_id, target, status, callback, chain_extra_data)
  }

  function SQLUpload() {

  }

  this.SQLUpload = SQLUpload

  SQLUpload.prototype.init_plugin = function(chain_id, target, value, status, callback, cfg, chain_extra_data) {
    init_plugin(chain_id, target, value, status, callback, cfg, chain_extra_data)
  }

  $(document).ready(function(){
    $(document.body).append("<div class=\"sql_upload_full\" style=\"display:none\" id=\"sql_upload_full_div\"></div>")
  })

})(jQuery);
