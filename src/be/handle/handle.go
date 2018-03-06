package handle

import (
	"be/server"
	"net/http"
	"be/options"
)

func InitHandle(r *server.WWWMux) {
	// 初始化静态文件路径
	initStaticFileMapping(r)

	// 页面相关的接口
	initCustomMapping(r)
	// ajax相关的接口
	initAjaxMapping(r)
	//// api相关的接口
	//initAPIMapping(r)
}

func initStaticFileMapping(r *server.WWWMux) {
	fs := http.FileServer(http.Dir(options.Options.StaticFilePath))
	r.GetRouter().PathPrefix("/static/").Handler(http.StripPrefix("/static/", fs))
}

func initCustomMapping(r *server.WWWMux) {
	r.RegistURLMapping("/", "GET", showIndexHtml)
	r.RegistURLMapping("/ologin.html", "GET", showLoginHtml)
	r.RegistURLMapping("/favicon.ico", "GET", showFaviconIco)

	// 默认路由
	r.GetRouter().NotFoundHandler = http.HandlerFunc(server.AccessLogHandler(showIndexHtml))
}

func initAjaxMapping(r *server.WWWMux) {
	// 注销
	r.RegistURLMapping("/v2/ajax/auth/logout", "GET", ajaxLogout)

	// 根据UM和密码在session中生成token
	r.RegistURLMapping("/v2/ajax/auth/token", "POST", ajaxGenTokenByUMAndPassword)

	// 根据session获取用户信息
	r.RegistURLMapping("/v2/ajax/auth/info", "GET", ajaxGetUserInfo)
}