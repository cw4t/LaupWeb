package main

import (
	go_log "log"
	"net/http"
	"os"
	"math/rand"
	"runtime"
	"strings"

	log "github.com/Sirupsen/logrus"
	"be/mysql"
	"be/handle"
	"be/options"
	"be/server"
	"strconv"
	"time"
)

func initLog() {
	// 设置日志输出格式
	customFormatter := new(log.TextFormatter)
	customFormatter.TimestampFormat = "2006-01-02 15:04:05"
	customFormatter.FullTimestamp = true
	log.SetFormatter(customFormatter)

	// 设置默认的日志级别
	switch strings.ToUpper(options.Options.LogLevel) {
	case "DEBUG":
		log.SetLevel(log.DebugLevel)
	case "INFO":
		log.SetLevel(log.InfoLevel)
	case "WARN":
		log.SetLevel(log.WarnLevel)
	case "ERROR":
		log.SetLevel(log.ErrorLevel)
	default:
		log.SetLevel(log.DebugLevel)
	}

	// 设置输出路径
	f, err := os.OpenFile(options.Options.LogFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		panic("无法打开日志文件") //异常发生，程序终端，终端打印的信息
	}
	log.SetOutput(f)
}

func doServe() {
	defer func() {
		if err := recover(); err != nil {
			doServe()
		}
	}()

	// 初始化DB
	mysql.DB.InitConn()

	// 初始化服务,并启动服务
	mux := server.New()

	// URL映射
	handle.InitHandle(mux)
	srv := &http.Server{
		Handler:      mux.GetRouter(),
		Addr:         options.Options.HTTPAddress + ":" + strconv.FormatUint(options.Options.HTTPPort, 10),
		WriteTimeout: 15 * time.Hour,
		ReadTimeout:  15 * time.Hour,
		ErrorLog:     go_log.New(log.StandardLogger().Writer(), "", 0),
	}

	// 启动主服务
	log.Fatal(srv.ListenAndServe())
}

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())
	rand.Seed(time.Now().UTC().UnixNano())

	// 从命令行、配置文件初始化配置
	options.Options.InitOptions()

	// 初始化Log
	initLog()

	// 可以使用log了
	log.Infoln("日志文件初始化成功")

	// 启动服务
	doServe()
}
