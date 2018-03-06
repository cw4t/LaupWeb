package handle

import (
	"net/http"
	"be/common"
	"io/ioutil"
	log "github.com/Sirupsen/logrus"
	"be/session"
	"be/model"
	"encoding/json"
	"be/options"
)

func ajaxLogout(res http.ResponseWriter, req *http.Request) {
	session.CM.Remove("token", res)
	http.Redirect(res, req, options.Options.SSOLogoutURL, http.StatusTemporaryRedirect)
}


func ajaxGenTokenByUMAndPassword(res http.ResponseWriter, req *http.Request) {
	reqContent, err := ioutil.ReadAll(req.Body)
	defer req.Body.Close()
	if err != nil {
		log.WithFields(log.Fields{}).Error("请求报文解析失败")
		common.ResInvalidRequestBody(res)
		return
	}

	//输出请求体
	log.WithFields(log.Fields{}).Debug("请求体为:", reqContent)


	token, err := model.Auth.GenTokenByUMAndPassword(string(reqContent))
	if err != nil {
		log.WithFields(log.Fields{
			"token is:": token,
		}).Error("GenToken失败")
		common.ResMsg(res, 400, err.Error())
		return
	}
	//test for the token
	//fmt.Println("token is ", token)

	// 在session中记录token
	session.CM.Set("token", token, res)
	common.ResSuccessMsg(res, 200, "token生成成功")
}



func ajaxGetUserInfo(res http.ResponseWriter, req *http.Request) {
	token, err := session.CM.Get("token", req)
	if err != nil || token == "" {
		common.ResMsg(res, 400, "请求中未包含token")
		return
	}
	userInfo, err := model.Auth.GetUserInfoByToken(token)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("根据token获取用户信息失败")
		common.ResMsg(res, 400, err.Error())
		return
	}
	b, err := json.Marshal(userInfo)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("根据token获取用户信息失败 JSON生成失败")
		common.ResMsg(res, 500, err.Error())
		return
	}
	common.ResMsg(res, 200, string(b))
}
