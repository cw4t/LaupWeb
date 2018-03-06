(function($){

  /* 入库结果格式
  result = {
    files: [
      {
        "name": "UPDATE文件",
        "dml_type": "UPDATE",
        "sql_type": "DML",
        "deps": ["UPDATE文件"],
        "help_msg": "SQL文件只允许包含UPDATE语句",
        "empty": 0,
        "file_name": "",
        "path": "",
        "affect_rows": 10,
        // 如果检测结果没问题则这里为SUCCESSFUL，否则为报错说明，如果为空说明还没有审查信息，如果在审查中则为PROCESSING
        "check_result": "",
        "comment":"",
        "seq":1,
      }
    ]
  }
  */

  // 配置文件
  var STANDARD = {
    files: [
      {
          "name": "UPDATE文件",
          "dml_type": "UPDATE",
          "sql_type": "DML",
          "deps": ["UPDATE回滚文件"],
          "help_msg": "SQL文件只允许包含UPDATE语句",
          "empty": 0,
      },
      {
          "name": "UPDATE回滚文件",
          "dml_type": "UPDATE",
          "sql_type": "DML",
          "deps": ["UPDATE文件"],
          "help_msg": "SQL文件只允许包含UPDATE语句",
          "empty": 0,
      }
    ]
  }

  function init_plugin(chain_id, target, value, status, callback, cfg) {
    var that = $(target)
    var config = STANDARD
    if (value !== undefined && value !== "") {
      config = JSON.parse(value)
    } else if (cfg !== undefined) {
      config = cfg
    }
    console.log(config)
    var data = config.files
    callback(data)

    // 处理执行顺序
    for (var i = 0; i<data.length; i++) {
      var record = data[i]
      if (record.seq === undefined) {
        record.seq = "无要求"
      }
    }

    // status的值为write或者是read，前者表明可以编辑，后者表明不可编辑
    var display_html = ""
    display_html += "<table class='sql_submit_table'><thead>"
    display_html += "<tr>"
    display_html += "<th width='10%'>执行顺序</th>"
    display_html += "<th width='20%'>类别</th>"
    display_html += "<th width='35%'>SQL文件</th>"
    display_html += "<th width='10%'>涉及行数</th>"
    display_html += "<th width='15%'>审查信息</th>"
    display_html += "<th width='10%'>备注</th>"
    display_html += "</tr>"
    display_html += "</thead>"
    display_html += "<tbody>"

    for (var i=0; i<data.length; i++) {
      var record = data[i]

      // read状态如果用户没有上传文件则不用显示
      if (status === "read") {
        if (record.file_name === undefined || record.file_name === "") {
          continue
        }
      }

      display_html += "<tr>"

      // 执行顺序，由于已经预处理过了所以不用担心无值
      display_html += "<td>"
      if (status === "read") {
        display_html += record.seq
      } else {
        display_html += "<select class='sql_submit_seq' name='"
        display_html += record['name']
        display_html += "'>"
        display_html += "<option value='无要求'>无要求</option>"
        for (var idx=1; idx<=data.length; idx++) {
          dh = "<option value='第" + idx + "个执行'>第" + idx + "个执行</option>"
          display_html += dh
        }
        display_html += "</select>"
      }
      display_html += "</td>"

      // 类别
      display_html += "<td>"
      display_html += record['name']
      display_html += "</td>"

      // SQL文件
      display_html += "<td>"
      if (status === "read") {
        display_html += '<a href="javascript:void(0);" class="sql_submit_attachment_download" name="'
        display_html += record['name']
        display_html += '">下载文件</a>'
        if (record['check_result'] !== "SUCCESSFUL") {
          display_html += '<input type="button" class="sql_submit_attachment_failed_msg" style="display:inline-block; margin: 2px 2px 2px 10px;" value="规则审核未通过" name="'
          display_html += record['name']
          display_html += '"></input>'
        } else {
          display_html += '<input type="button" class="sql_submit_attachment_successful_msg" style="display:inline-block; margin: 2px 2px 2px 10px;" value="规则审核通过" name="'
          display_html += record['name']
          display_html += '"></input>'
        }
      } else {
        if (record['file_name'] === undefined || record['file_name'] === '') {
          display_html += '<input type="button" class="sql_submit_attachment_upload_button" value="点击上传" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input class="sql_submit_attachment_file" type="file" style="display:none;" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input type="button" class="sql_submit_attachment_del_button" style="display:none" value="删除" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input type="button" class="sql_submit_attachment_successful_msg" style="display:none" value="审查通过" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input type="button" class="sql_submit_attachment_failed_msg" style="display:none" value="未通过审查" name="'
          display_html += record['name']
          display_html += '"></input>'
        } else {
          display_html += '<input type="button" class="sql_submit_attachment_upload_button" value="已上传,点击可重新上传" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input class="sql_submit_attachment_file" type="file" style="display:none;" name="'
          display_html += record['name']
          display_html += '"></input>'
          display_html += '<input type="button" class="sql_submit_attachment_del_button" style="display:inline-block" value="删除" name="'
          display_html += record['name']
          display_html += '"></input>'

          if (record['check_result'] === "SUCCESSFUL") {
            display_html += '<input type="button" class="sql_submit_attachment_successful_msg" style="display:inline-block" value="审查通过" name="'
            display_html += record['name']
            display_html += '"></input>'
            display_html += '<input type="button" class="sql_submit_attachment_failed_msg" style="display:none" value="未通过审查" name="'
            display_html += record['name']
            display_html += '"></input>'
          } else {
            display_html += '<input type="button" class="sql_submit_attachment_successful_msg" style="display:none" value="审查通过" name="'
            display_html += record['name']
            display_html += '"></input>'
            display_html += '<input type="button" class="sql_submit_attachment_failed_msg" style="display:inline-block" value="未通过审查" name="'
            display_html += record['name']
            display_html += '"></input>'
          }

        }
      }
      display_html += "</td>"

      // 涉及行数
      display_html += "<td style='padding: 0px;'>"
      if (status === "read") {
        var lines = "未提供"
        if (record.affect_rows !== undefined) {
          lines = record.affect_rows
        }
        display_html += lines
      } else {
        var rows = ""
        if (record.affect_rows !== undefined) {
          rows = record.affect_rows
        }
        var lines = ""
        lines += "<input type='text' class='sql_submit_affect_rows_input' name='"
        lines += record['name']
        lines += "'></input>"
        display_html += lines
      }
      display_html += "</td>"

      // 审查信息
      display_html += "<td>"
      if (status === "read") {
        display_html += "<a href='javascript:void(0);' class='sql_submit_record_checkresult' name='"
        display_html += record['name']
        display_html += "'>查看审查结果</a>"
      } else {
        if (record['file_name'] === undefined || record['file_name'] === "") {
          display_html += "<a href='javascript:void(0);' class='sql_submit_record_checkresult' style='display: none;' name='"
          display_html += record['name']
          display_html += "'>查看审查结果</a>"
        } else {
          display_html += "<a href='javascript:void(0);' class='sql_submit_record_checkresult' name='"
          display_html += record['name']
          display_html += "'>查看审查结果</a>"
        }
      }
      display_html += "</td>"

      // 备注
      display_html += "<td style='padding: 0px;'>"
      if (status === "read") {
        var comment = ""
        if (record.comment !== undefined) {
          comment = record.comment
        }
        display_html += comment
      } else {
        var comment = ""
        if (record.comment !== undefined) {
          comment = record.comment
        }
        display_html += "<input type='text' class='sql_submit_comment_input' name='"
        display_html += record['name']
        display_html += "'></input>"
      }
      display_html += "</td>"

      display_html += "</tr>"
    }

    display_html += "</tbody></table>"

    if (status === "read" && data.length === 0) {
      display_html = "用户未上传任何相关文件"
    }

    that.html(display_html)

    // 设置编辑状态的行数和备注
    if (status === "write") {
      for (var i=0; i<data.length; i++) {
        var record = data[i]
        if (record.file_name !== undefined && record.file_name !== "") {
          $('.sql_submit_affect_rows_input[name="' + record.name + '"]').val(record.affect_rows)
        }
        if (record.file_name !== undefined && record.file_name !== "" && record.comment !== undefined) {
          $('.sql_submit_comment_input[name="' + record.name + '"]').val(record.comment)
        }
        if (record.file_name !== undefined && record.file_name !== "" && record.seq !== undefined) {
          $('.sql_submit_seq[name="' + record.name + '"]').val(record.seq)
        }
      }
    }

    function get_record_by_name(name) {
      for (var i=0; i<data.length; i++) {
        var record = data[i]
        if (record.name === name) {
          return record
        }
      }
      console.log("no record name " + name)
      return {}
    }

    function check_name_exist(filename) {
      console.log(filename)
      for (var i=0; i<data.length; i++) {
        var record = data[i]
        console.log(record.file_name)
        if (record.file_name === filename) {
          return true
        }
      }
      return false
    }

    that.find('.sql_submit_attachment_download').click(function() {
      var name = $(this).attr('name')
      var file_name = get_record_by_name(name).file_name
      var path = get_record_by_name(name).path
      window.location = '/v2/ajax/file/download' + '/' + path + '/' + file_name
    })

    that.find('.sql_submit_record_checkresult').click(function(){
      var name = $(this).attr('name')
      var msg = ""
      var check_result = get_record_by_name(name).check_result
      if (check_result === "") {
        msg = "暂无信息，请上传文件"
      } else if (check_result === "PROCESSING") {
        msg = "文件审查中，请稍后"
      } else if (check_result === "SUCCESSFUL") {
        msg = "文件审查通过"
      } else if (check_result === "FAILED") {
        msg = "系统异常，请重新上传"
      } else {
        msg = check_result
      }

      var dialog = bootbox.dialog({
          title: '审查信息',
          message: '<pre style="background-color: white;">' + msg + '</pre>'
      });
      dialog.init(function(){})
    })

    that.find('.sql_submit_attachment_del_button').click(function() {
      var name = $(this).attr('name')
      get_record_by_name(name).check_result = ""
      get_record_by_name(name).file_name = ""
      get_record_by_name(name).path = ""
      $('.sql_submit_attachment_upload_button[name="' + name + '"]').val("点击上传")
      $(this).css("display", "none")
      $('.sql_submit_attachment_successful_msg[name="' + name + '"]').css("display", "none")
      $('.sql_submit_attachment_failed_msg[name="' + name + '"]').css("display", "none")
      $('.sql_submit_record_checkresult[name="' + name + '"]').css("display", "none")
      $('.sql_submit_attachment_file[name="' + name + '"]').val(null)
      callback(data)
    })

    that.find('.sql_submit_attachment_file').change(function(e){
      var thatt = this
      var name = $(this).attr('name')
      var uploadButton = $('.sql_submit_attachment_upload_button[name="' + name + '"]')
      uploadButton.val("正在上传&审查...")

      var sb = $('.sql_submit_attachment_successful_msg[name="' + name + '"]')
      sb.css("display", "none")
      var fb = $('.sql_submit_attachment_failed_msg[name="' + name + '"]')
      fb.css("display", "none")

      var file = e.target.files[0]
      var formData = new FormData()
      formData.append('ac-file', file)
      // 设置状态
      get_record_by_name(name).check_result = "PROCESSING"
      get_record_by_name(name).file_name = ""
      get_record_by_name(name).path = ""
      callback(data)

      var request_sql_type = ""
      var request_dml_type = ""
      request_sql_type = get_record_by_name(name).sql_type
      request_dml_type = get_record_by_name(name).dml_type
      if (request_dml_type === "") {
        request_dml_type = "DDL"
      }

      // 执行审查
      $.ajax(
        "/v2/ajax/mgr/sqlvalidation/" + chain_id + "/" + request_sql_type + "/" + request_dml_type,
        {
          enctype: 'multipart/form-data',
          data: formData,
          method: "POST",
          cache: false,
          processData: false,
          contentType: false,
          async: true,
          error: function(jqXHR, textStatus, errorThrown) {
            var response = JSON.parse(jqXHR.responseText)
            var err_msg = response['msg']
            alert(err_msg)
            get_record_by_name(name).check_result = "FAILED"
            get_record_by_name(name).file_name = ""
            get_record_by_name(name).path = ""
            uploadButton.val("未上传,点击可上传")
            $('.sql_submit_attachment_del_button[name="' + name + '"]').css("display", "none")
            $('.sql_submit_attachment_successful_msg[name="' + name + '"]').css("display", "none")
            $('.sql_submit_attachment_failed_msg[name="' + name + '"]').css("display", "none")
            $('.sql_submit_record_checkresult[name="' + name + '"]').css("display", "none")
            callback(data)
          },
          success: function(response, textStatus, jqXHR) {
            response = JSON.parse(response)
            // 判断文件名是否唯一，如果不唯一则认为存在错误
            if (check_name_exist(response.file.file_name) === true) {
              alert("此文件文件名和此流程中提交的其它SQL文件文件名重复，请修改文件名后提交")
              get_record_by_name(name).check_result = "FAILED"
              get_record_by_name(name).file_name = ""
              get_record_by_name(name).path = ""
              uploadButton.val("未上传,点击可上传")
              $('.sql_submit_attachment_del_button[name="' + name + '"]').css("display", "none")
              $('.sql_submit_attachment_successful_msg[name="' + name + '"]').css("display", "none")
              $('.sql_submit_attachment_failed_msg[name="' + name + '"]').css("display", "none")
              $('.sql_submit_record_checkresult[name="' + name + '"]').css("display", "none")
            } else {
              get_record_by_name(name).check_result = response.result
              get_record_by_name(name).file_name = response.file.file_name
              get_record_by_name(name).path = response.file.path
              uploadButton.val("已上传,点击可重新上传")
              if (response.result === "SUCCESSFUL") {
                $('.sql_submit_attachment_del_button[name="' + name + '"]').css("inline-block", "inline-block")
                $('.sql_submit_attachment_successful_msg[name="' + name + '"]').css("display", "inline-block")
                $('.sql_submit_attachment_failed_msg[name="' + name + '"]').css("display", "none")
                $('.sql_submit_record_checkresult[name="' + name + '"]').css("display", "inline-block")
              } else {
                $('.sql_submit_attachment_del_button[name="' + name + '"]').css("display", "inline-block")
                $('.sql_submit_attachment_successful_msg[name="' + name + '"]').css("display", "none")
                $('.sql_submit_attachment_failed_msg[name="' + name + '"]').css("display", "inline-block")
                $('.sql_submit_record_checkresult[name="' + name + '"]').css("display", "inline-block")
              }
            }
            callback(data)
          }
        }
      )
    })

    that.find('.sql_submit_attachment_upload_button').click(function() {
      var name = $(this).attr('name')
      $('.sql_submit_attachment_file[name="' + name + '"]').click();
    })

    that.find('.sql_submit_affect_rows_input').change(function(){
      var lines = $(this).val()
      var name = $(this).attr('name')
      // 设置行数
      get_record_by_name(name).affect_rows = lines
      callback(data)
    })

    that.find('.sql_submit_comment_input').change(function(){
      var comment = $(this).val()
      var name = $(this).attr('name')
      // 设置备注
      get_record_by_name(name).comment = comment
      callback(data)
    })

    that.find('.sql_submit_seq').change(function(){
      var seq = $(this).val()
      var name = $(this).attr('name')
      // 设置执行顺序
      get_record_by_name(name).seq = seq
      callback(data)
    })
  }

  function SQLSubmit() {

  }

  this.SQLSubmit = SQLSubmit

  // target: 目标element
  // value: 值
  // status: write or read
  // cfg: config
  SQLSubmit.prototype.init_plugin = function(chain_id, target, value, status, callback, cfg){
    init_plugin(chain_id, target, value, status, callback, cfg)
  }

  $(document).ready(function(){
    $(document.body).append("<div class=\"sql_submit_full\" style=\"display:none\" id=\"sql_submit_full_div\"></div>")
  })

})(jQuery);
