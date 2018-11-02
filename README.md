# LaupWeb
用户画像与高危操作识别项目


## 数据库配置
etc/init_db_laup.sql 里的数据库初始化后，数据库相应信息在etc/laup.conf里面配置


## 运行
bin/laup_start -config=../etc/laup.conf

## 程序配置文件
src/be/options/options.go
包括日志文件存放地址，HTTP地址，数据库最大连接数等配置
