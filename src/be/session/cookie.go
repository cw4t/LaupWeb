package session

import (
	lerror "be/common/error"
	"be/options"
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/securecookie"
	"net/http"
	"time"
)

type cookieMgr struct {
	s *securecookie.SecureCookie
}

var CM *cookieMgr

func init() {
	s := securecookie.New([]byte("qazwsxedcrfv0987654321poastgvfew"), []byte("t6r5fghy8ujh4red"))
	CM = &cookieMgr{s: s}
}

func (c *cookieMgr) Set(key string, value string, res http.ResponseWriter) {
	expiration := time.Now().Add(time.Duration(options.Options.CookieExpire) * time.Hour)
	if encoded, err := c.s.Encode(key, value); err == nil {
		cookie := &http.Cookie{
			Name:    key,
			Value:   encoded,
			Expires: expiration,
			Path:    "/",
		}
		http.SetCookie(res, cookie)
	} else {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("Cookie Set失败")
	}
}

func (c *cookieMgr) Get(key string, req *http.Request) (string, error) {
	if cookie, err := req.Cookie(key); err == nil {
		value := ""
		if err = c.s.Decode(key, cookie.Value, &value); err == nil {
			return value, nil
		} else {
			log.WithFields(log.Fields{
				"err": err.Error(),
			}).Error("Cookie Get失败")
			return "", lerror.New("Cookie Get失败")
		}
	} else {
		log.WithFields(log.Fields{
			"err": err.Error(),
		}).Error("Cookie Get失败")
		return "", lerror.New("Cookie Get失败")
	}
}

func (c *cookieMgr) Remove(key string, res http.ResponseWriter) {
	// 设置为空字符串即认为删除
	c.Set(key, "", res)
}
