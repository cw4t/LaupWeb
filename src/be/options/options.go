package options

import (
	"flag"
	"github.com/vharitonsky/iniflags"
)

type WWWOptions struct {
	//默认日志级别
	LogLevel 	string
	LogFile 	string

	//HTTP监听地址
	HTTPAddress 	string
	HTTPPort 	uint64

	//静态文件地址
	StaticFilePath 	string
	//模板文件地址
	TemplateFilePath string

	// Cookie过期时间(小时)
	CookieExpire uint64

	// Token过期时间(小时)
	TokenExpire uint64

	// USO退出重定向地址
	//USOLogoutURL string

	// LAUP用户名
	LAUPUsername string

	// LAUP密码
	LAUPPassword string

	// MySQL dataSourceName
	DataSourceName 	string
	// MySQL 最大连接数
	DBMaxOpenConn	int
	// MySQL 最大闲置连接数
	DBMaxIdleConn	int

	// USO API 地址
	USOApiAddress	string
	// USO AUTH API
	USOAuthAPI string
	// USO Logout 重定向地址
	USOLogoutURL string
}

var Options WWWOptions

func (o *WWWOptions) InitOptions() {
	flag.StringVar(&o.LogLevel, "log_level", "DEBUG", "Log Level")
	flag.StringVar(&o.LogFile, "log_file", "/tmp/laup.log", "Log File")
	flag.StringVar(&o.HTTPAddress, "http_address", "0.0.0.0", "HTTP Address")
	flag.Uint64Var(&o.HTTPPort, "http_port", 62333, "HTTP Port")
	flag.StringVar(&o.StaticFilePath, "static_path", "./src/fe/static/", "Static file path")
	flag.StringVar(&o.TemplateFilePath, "template_path", "./src/fe/template/", "Template file path")
	flag.Uint64Var(&o.CookieExpire, "cookie_expire", 24*30, "cookie expiration time")
	flag.Uint64Var(&o.TokenExpire, "token_expire", 24*60, "token expiration time")
	flag.StringVar(&o.USOLogoutURL, "uso_logout_url", "http://uso.test.cn/logout?referer=http://xx.test.cn/usovarify.html", "USOLogoutURL")

	flag.StringVar(&o.LAUPUsername, "xxdb_username", "admin", "LAUPUsername")
	flag.StringVar(&o.LAUPPassword, "xxdb_password", "password", "LAUPPassword")
	flag.StringVar(&o.USOAuthAPI, "uso_auth_api", "http://192.168.176.39/api/v1.0/user/gen_token_by_param_v2", "USOAuthAPI")
	flag.StringVar(&o.DataSourceName, "dsn", "", "MySQL DataSourceName")
	flag.IntVar(&o.DBMaxOpenConn, "max_open_conn", 32, "MySQL Max Open Connections")
	flag.IntVar(&o.DBMaxIdleConn, "max_idle_conn", 16, "MySQL Max Idle Connections")
	iniflags.Parse()
}
