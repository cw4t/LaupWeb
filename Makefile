.PHONY: all fe be clean

GOPATH := $(CURDIR)/_vender:$(CURDIR)

export GOPATH

all: fe be 

fe:
	cd src/fe/workspace && grunt dist
#	python tools/fe_version.py src/fe/workspace/dist src/fe/static src/fe/template/
	python tools/mv_laup.min.py src/fe/workspace/dist src/fe/static

be:
	go install be/cmd/laup_start

clean:
	rm -rf bin
	rm -rf pkg
	cd /src/fe/workspace && grunt clean
