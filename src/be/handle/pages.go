package handle

import (
	"be/options"
	"html/template"
	"net/http"
	"path/filepath"
)

func showIndexHtml(res http.ResponseWriter, req *http.Request) {
	tmpl, _ := template.ParseFiles(templateRealPath("index.html"))
	tmpl.ExecuteTemplate(res, "index", nil)
}

func showLoginHtml(res http.ResponseWriter, req *http.Request) {
	tmpl, _ := template.ParseFiles(templateRealPath("login.html"))
	tmpl.ExecuteTemplate(res, "login", nil)
}

func showFaviconIco(res http.ResponseWriter, req *http.Request) {
	http.ServeFile(res, req, filepath.Join(options.Options.StaticFilePath, "img/laup_icon.jpg"))
}
