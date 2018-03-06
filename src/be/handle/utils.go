package handle

import (
	"path/filepath"
	"be/options"
)


func templateRealPath(subPath string) string {
	return filepath.Join(options.Options.TemplateFilePath, subPath)
}