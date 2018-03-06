package auth

import (
	"be/structs"
	"strings"
	laupE "be/common/error"
	"github.com/satori/go.uuid"
	"fmt"
	"be/mysql"
	log "github.com/Sirupsen/logrus"
	"time"
	"be/options"
	"be/tools"
)

type AuthSSODAO struct {

}

func (authDao *AuthSSODAO) IsAdmin(um string) (bool, error) {
	var c int64 = 0
	_, err := mysql.DB.SingleRowQuery("SELECT COUNT(id) AS cnt FROM ROLE_INFO WHERE UPPER(um)=? AND role='ADMIN'", []interface{}{strings.ToUpper(um)}, &c)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("IsAdmin DB错误")
		return false, laupE.DBError()
	}

	if c == 0 {
		return false, nil
	} else {
		return true, nil
	}
}

func (authDao *AuthSSODAO) GenTokenByUM(um string) (string, error) {
	// 生成token
	token := fmt.Sprintf("%s", uuid.NewV4())
	// 写入DB
	err := mysql.DB.SimpleInsert("INSERT INTO TOKENS(token, um, expire_time) VALUES(?, ?, ?)", token, um, time.Now().Add(time.Duration(options.Options.TokenExpire)*time.Hour).Format("2006-01-02 15:04:05"))
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("GenTokenByUM DB错误")
		return "", laupE.DBError()
	}
	return token, nil
}

func (authDao *AuthSSODAO) GenTokenByUMAndPassword(um string, password string) (token string, err error) {
	// 内部测试环境
	if ((strings.ToUpper(um) == "ADMIN" && password == "password") || (strings.ToUpper(um) == "USER" && password == "password")) {
		// 生成token
		token := fmt.Sprintf("%s", uuid.NewV4())

		// 写入DB
		err := mysql.DB.SimpleInsert("INSERT INTO TOKENS(token, um, expire_time) VALUES(?, ?, ?)", token, um, time.Now().Add(time.Duration(options.Options.TokenExpire)*time.Hour).Format("2006-01-02 15:04:05"))
		if err != nil {
			log.WithFields(log.Fields{
				"err": err.Error(),
			}).Error("GenTokenByUMAndPassword DB错误")
			return "", laupE.DBError()
		}

		//输出token于日志
		log.WithFields(log.Fields{}).Debug("token is :", token)

		return token, nil
	} else {
		// 这里会走SSO认证
		authResult := tools.SSOValidateAuthByUserNameAndPassword(um, password)
		if authResult != nil {
			log.WithFields(log.Fields{
				"err": authResult.Error(),
			}).Error("GenTokenByUMAndPassword错误")
			return "", authResult
		}
		// 生成token
		token := fmt.Sprintf("%s", uuid.NewV4())

		// 写入DB
		err := mysql.DB.SimpleInsert("INSERT INTO TOKENS(token, um, expire_time) VALUES(?, ?, ?)", token, um, time.Now().Add(time.Duration(options.Options.TokenExpire)*time.Hour).Format("2006-01-02 15:04:05"))
		if err != nil {
			log.WithFields(log.Fields{
				"err": err.Error(),
			}).Error("GenTokenByUMAndPassword DB错误")
			return "", laupE.DBError()
		}

		//输出token于日志
		log.WithFields(log.Fields{}).Debug("token is :", token)

		return token, nil

	}
}

func (authDao *AuthSSODAO) GetUserInfoByToken(token string) (*structs.UserInfo, error) {
	result := &structs.UserInfo{}
	cnt, err := mysql.DB.SingleRowQuery("SELECT um FROM TOKENS WHERE token=? AND expire_time>NOW()", []interface{}{token}, &result.UM)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("GetUserInfoByToken DB错误")
		return nil, laupE.DBError()
	}

	if cnt == 0 {
		return nil, laupE.AuthError()
	}

	return result, nil
}

func (authDao *AuthSSODAO) SearchUsersByStr(ss string) ([]*structs.UserInfo, error) {
	result, err := tools.SSOGetUsersForSearch(ss)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SearchUsersByStr 错误")
		return nil, laupE.SSOError()
	}

	records := []*structs.UserInfo{}
	for _, info := range result {
		user := &structs.UserInfo{}
		user.Name = info.Name
		user.UM = info.UM
		user.Department = info.DepName

		records = append(records, user)
	}
	return records, nil
}


func (authDao *AuthSSODAO) ListGroupMembersByGroupName(groupName string) ([]*structs.UserInfo, error) {
	result, err := tools.SSOListGroupMembers(groupName)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("ListGroupMembersByGroupName 错误")
		return nil, laupE.SSOError()
	}

	records := []*structs.UserInfo{}
	for _, info := range result.ReturnMsg {
		user := &structs.UserInfo{}
		user.Name = info.Name
		user.UM = info.UM
		user.Department = info.Department
		user.Mail = info.EMail

		records = append(records, user)
	}
	return records, nil

}

func (authDao *AuthSSODAO) GetUserDetail(um string) (*structs.UserInfo, error) {
	result, err := tools.SSOGetUserDetail(um)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("GetUserDetail 错误")
		return nil, laupE.SSOError()
	}

	user := &structs.UserInfo{}
	user.Name = result.Name
	user.UM = result.UM
	user.Department = result.Department
	user.Mail = result.EMail
	user.Manager = result.ManagerInfo.UM
	return user, nil
}

func (authDao *AuthSSODAO) ListGroups() ([]*structs.GroupInfo, error) {
	result := []*structs.GroupInfo {}
	ssoGroups, err := tools.SSOListGroups()
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("ListGroups 错误")
		return nil, laupE.SSOError()
	}

	for _, ssoGroup := range ssoGroups {
		group := &structs.GroupInfo{}
		group.Id = ssoGroup.Id
		group.CN = ssoGroup.Name2
		group.Name = ssoGroup.Name
		group.Source = "SSO"
		group.Users = []*structs.UserInfo{}

		result = append(result, group)
	}

	return result, nil
}