package server

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
	"net/http"
	"reflect"
	"runtime"
)

type WWWMux struct {
	r *mux.Router
}

func New() *WWWMux {
	return &WWWMux{r: mux.NewRouter()}
}

func (m *WWWMux) GetRouter() *mux.Router {
	return m.r
}

// 记录日志
func AccessLogHandler(h func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Infof("%s - %s", r.Method, r.RequestURI)
		h(w, r)
	}
}

func (m *WWWMux) RegistURLMapping(path string, method string, handle func(http.ResponseWriter, *http.Request)) {
	log.WithFields(log.Fields{
		"path":   path,
		"method": method,
		"handle": runtime.FuncForPC(reflect.ValueOf(handle).Pointer()).Name(),
	}).Info("记录URL映射")
	handle = AccessLogHandler(handle)
	m.r.HandleFunc(path, handle).Methods(method)
}
