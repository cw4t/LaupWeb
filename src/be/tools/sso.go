package tools

import (
	"be/structs"
	log "github.com/Sirupsen/logrus"
	laupE "be/common/error"
	"io/ioutil"
	"encoding/json"
	"net/http"
	"be/options"
	"bytes"
	"fmt"
	"sync"
	"time"
	"strings"
	"be/common"
)



// 这里用于执行没有body请求的cache。key为 METHOD - URL
type ssoRequestCacheData struct {
	ExpireDate string
	Data string
}
var ssoRequestCache = map[string]*ssoRequestCacheData{}
var ssoRequestCacheLock = &sync.RWMutex{}

func getSSOResultByCache(url string, method string) (string, bool) {
	currentTime := time.Now().Format("2006-01-02 15:04:05")
	key := fmt.Sprintf("%s - %s", method, url)
	ssoRequestCacheLock.RLock()
	if value, exist := ssoRequestCache[key]; exist == true {
		if value.ExpireDate <= currentTime {
			ssoRequestCacheLock.RUnlock()
			return "", false
		} else {
			ssoRequestCacheLock.RUnlock()
			return value.Data, true
		}
	} else {
		ssoRequestCacheLock.RUnlock()
		return "", false
	}
}

func setSSOResultCache(url string, method string, data string) error {
	expireTime := time.Now().Add(time.Duration(10) * time.Minute).Format("2006-01-02 15:04:05")
	cachedData := &ssoRequestCacheData{
		ExpireDate: expireTime,
		Data: data,
	}
	key := fmt.Sprintf("%s - %s", method, url)
	ssoRequestCacheLock.Lock()
	ssoRequestCache[key] = cachedData
	ssoRequestCacheLock.Unlock()
	return nil
}


func doSSORequest(url string, body interface {}, method string) (string, error) {
	url = options.Options.SSOApiAddress + url

	// 是否要走cache
	if body == nil {
		cachedData, hasCache := getSSOResultByCache(url, method)
		if hasCache {
			return cachedData, nil
		}
	}

	hc := &http.Client{}

	var bodyStr []byte
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			log.WithFields(log.Fields{
				"err": err.Error(),
			}).Error("生成JSON串失败")
			return "", laupE.RestError()
		}
		bodyStr = b
	} else {
		bodyStr = []byte("")
	}

	req, err := http.NewRequest(method, url, bytes.NewBuffer(bodyStr))
	if err != nil {
		log.WithFields(log.Fields{
			"url": url,
			"body": body,
			"err": err.Error(),
		}).Error("构造REST DO请求失败")
		return "", laupE.RestError()
	}

	resp, err := hc.Do(req)
	if err != nil {
		log.WithFields(log.Fields{
			"url": url,
			"body": body,
			"err": err.Error(),
		}).Error("发送REST DO请求失败")
		return "", laupE.RestError()
	}

	defer resp.Body.Close()
	respContent, _ := ioutil.ReadAll(resp.Body)
	Content := string(respContent)

	if resp.StatusCode != 200 {
		log.WithFields(log.Fields{
			"url": url,
			"body": body,
			"code": resp.StatusCode,
			"content": Content,
		}).Error("REST DO结果状态码异常")
		return "", laupE.New("调用SSO接口失败")
	}

	// 设置cache
	if body == nil {
		setSSOResultCache(url, method, Content)
	}

	return Content, nil

}

func SSOGetGroupNamesByUser(user string) ([]string, error) {
	groupNames := []string{}

	groups, err := SSOListGroups()
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSOListGroups 失败")
		return nil, err
	}

	for _, group := range groups {
		members, err := SSOListGroupMembers(group.Name)
		if err != nil {
			log.WithFields(log.Fields{
				"err": err.Error(),
			}).Error("SSOListGroupMembers 失败")
			return nil, err
		}

		for _, member := range members.ReturnMsg {
			if strings.ToUpper(member.UM) == strings.ToUpper(user) {
				if common.StringInSlice(group.Name, groupNames) == false {
					groupNames = append(groupNames, group.Name)
					break
				}
			}
		}
	}
	return groupNames, nil
}
//
//func SSOGetDutyPersonsByGroupName(date string, groupName string) (*structs.SSODutyInfo, error) {
//	url := fmt.Sprintf("%s?date=%s&dep_str=%s", options.Options.SSOListDutyURL, date, groupName)
//	hc := &http.Client{}
//	log.Infoln(url)
//	req, err := http.NewRequest("GET", url, nil)
//	if err != nil {
//		log.WithFields(log.Fields{
//			"err": err.Error(),
//		}).Error("SSOGetDutyPersonsByGroupName HTTP请求失败")
//		return nil, err
//	}
//	req.Header.Set("Content-Type", "application/json")
//	resp, err := hc.Do(req)
//	if err != nil {
//		log.WithFields(log.Fields{
//			"url": url,
//			"err": err.Error(),
//		}).Error("SSOGetDutyPersonsByGroupName 发送请求失败")
//		return nil, err
//	}
//
//	defer resp.Body.Close()
//	respContent, _ := ioutil.ReadAll(resp.Body)
//	log.Infoln(string(respContent))
//	response := &structs.SSODutyInfo{}
//	if err := common.ParseJsonStr(string(respContent), &response); err != nil {
//		log.Errorln("解析模板JSON失败")
//		return nil, err
//	}
//	if response.ReturnCode != 0 {
//		return nil, laupE.New(response.ReturnMsg)
//	}
//	return response, nil
//}

func SSOGetUsersForSearch(condition string) ([]*structs.SSOSelectUserRecord, error) {
	url := fmt.Sprintf("/api/v1.0/user/get_user_for_select?condition=%s", condition)
	result, err := doSSORequest(url, nil, "GET")
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSO请求失败")
		return nil, err
	}

	records := []*structs.SSOSelectUserRecord{}
	err = json.Unmarshal([]byte(result), &records)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("解析JSON串失败")
		return nil, err
	}
	return records, nil
}

func SSOGetUserDetail(um string) (*structs.SSOUserDetail, error) {
	url := fmt.Sprintf("/api/v1.0/user/get_by_um?um=%s", um)
	result, err := doSSORequest(url, nil, "GET")
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSO请求失败")
		return nil, err
	}

	record := &structs.SSOUserDetail{}
	err = json.Unmarshal([]byte(result), &record)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("解析JSON串失败")
		return nil, err
	}

	if record == nil {
		log.WithFields(log.Fields{
			"err": "SSO信息不存在",
		}).Error("解析JSON串失败")
		return nil, laupE.New("SSO信息不存在")
	}
	return record, nil
}

func SSOListGroupMembers(groupName string) (*structs.SSOGroupMember, error) {
	url := fmt.Sprintf("/api/v1.0/group/get_usr_by_groupname?group_name=%s", groupName)
	result, err := doSSORequest(url, nil, "GET")
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSO请求失败")
		return nil, err
	}

	record := &structs.SSOGroupMember{}
	err = json.Unmarshal([]byte(result), &record)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("解析JSON串失败")
		return nil, err
	}
	return record, nil
}

func SSOListGroups() ([]*structs.SSOGroupInfo, error) {
	url := "/api/v1.0/group/list"
	result, err := doSSORequest(url, nil, "GET")
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSO请求失败")
		return nil, err
	}

	groups := []*structs.SSOGroupInfo{}
	err = json.Unmarshal([]byte(result), &groups)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("解析JSON串失败")
		return nil, err
	}
	return groups, nil
}

func SSOListDepartments() ([]*structs.SSODepartment, error) {
	url := "/api/v1.0/department/getall"
	result, err := doSSORequest(url, nil, "GET")
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("SSO请求失败")
		return nil, err
	}

	departments := []*structs.SSODepartment{}
	err = json.Unmarshal([]byte(result), &departments)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("解析JSON串失败")
		return nil, err
	}
	return departments, nil
}

// 根据用户名密码认证用户，如果通过则返回nil
func SSOValidateAuthByUserNameAndPassword(username string, password string) error {
	username = strings.TrimSpace(username)
	password = strings.TrimSpace(password)

	url := options.Options.SSOAuthAPI
	hc := &http.Client{}

	type SSORequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	ssoRequest := &SSORequest{Username: username, Password: password}
	b, err := json.Marshal(ssoRequest)
	if err != nil {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("生成JSON串失败")
		return laupE.RestError()
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(b))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		log.WithFields(log.Fields{
			"url": url,
			"body": string(b),
			"err": err.Error(),
		}).Error("构造SSO认证请求失败")
		return laupE.RestError()
	}
	resp, err := hc.Do(req)
	if err != nil {
		log.WithFields(log.Fields{
			"url": url,
			"body": string(b),
			"err": err.Error(),
		}).Error("发送SSO认证请求失败")
		return laupE.RestError()
	}

	defer resp.Body.Close()
	respContent, _ := ioutil.ReadAll(resp.Body)

	type SSOResponse struct {
		ErrorMsg string `json:"errorMsg"`
		Token string `json:"token"`
	}
	result := &SSOResponse{}
	if err := common.ParseJsonStr(string(respContent), result); err != nil {
		log.Errorln("解析模板JSON失败")
		return err
	}
	if strings.TrimSpace(result.ErrorMsg) != "" {
		return laupE.New(result.ErrorMsg)
	}
	if strings.TrimSpace(result.Token) == "" {
		return laupE.New("Token为空")
	}
	return nil
}