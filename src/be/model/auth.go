package model

import (
	"be/common"
	dao "be/dao/auth"
	log "github.com/Sirupsen/logrus"
	"be/structs"
)

type AuthS struct {
	dao dao.AuthDAO
}

var Auth *AuthS

// todo: 由于认证模块的动态性，因此或许此模块应该强制通过ResetAuth进行初始化
func init() {
	Auth = &AuthS{
		dao: &dao.AuthSSODAO{},
	}
}

func ResetAuth() {
	Auth.dao = &dao.AuthSSODAO{}
}

func (a *AuthS) GenTokenByUMAndPassword(reqBodyS string) (string, error) {
	type reqb struct {
		UM       string `json:"um"`
		Password string `json:"password"`
	}

	reqBody := reqb{}
	if err := common.ParseJsonStr(reqBodyS, &reqBody); err != nil {
		return "", err
	}

	token, err := a.dao.GenTokenByUMAndPassword(reqBody.UM, reqBody.Password)

	if err != nil {
		log.WithFields(log.Fields{
			//"reqBodyS": reqBodyS,
			"um": reqBody.UM,
			//"password": reqBody.password,
			"err": err.Error(),
		}).Error("生成token失败")
		return "", err
	}

	return token, nil
}


func (a *AuthS) GetUserInfoByToken(token string) (*structs.UserInfo, error) {
	userInfo, err := a.dao.GetUserInfoByToken(token)
	if err != nil {
		log.WithFields(log.Fields{
			"token": token,
			"err": err.Error(),
		}).Error("根据token获取用户信息失败")
		return nil, err
	}
	return userInfo, nil
}

