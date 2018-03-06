package common

import (
	"fmt"
	"io"
	"os"
	"time"
	"unicode/utf8"
)

func StringInSlice(s string, ss []string) bool {
	for idx := range ss {
		if s == ss[idx] {
			return true
		}
	}
	return false
}

func Int64InSlice(i int64, ii []int64) bool {
	for idx := range ii {
		if i == ii[idx] {
			return true
		}
	}
	return false
}

func Int64SliceEqual(a []int64, b []int64) bool {
	if len(a) != len(b) {
		return false
	}

	for idx := range a {
		av := a[idx]
		if Int64InSlice(av, b) == false {
			return false
		}
	}

	return true
}

func Mkdir(fullPath string) error {
	err := os.MkdirAll(fullPath, 0777)
	return err
}

func CopyFile(srcFilePath string, destFilePath string) error {
	srcFile, err := os.Open(srcFilePath)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	destFile, err := os.Create(destFilePath)
	if err != nil {
		return err
	}
	defer destFile.Close()

	_, err = io.Copy(destFile, srcFile)
	if err != nil {
		return err
	}
	err = destFile.Sync()
	if err != nil {
		return err
	}
	return nil
}

func HasBOMHeader(content []byte) bool {
	if len(content) < 3 {
		return false
	}

	if content[0] != 0xef || content[1] != 0xbb || content[2] != 0xbf {
		return false
	}

	return true
}

func IsUTF8File(content []byte) bool {
	return utf8.Valid(content)
}

// 根据YYYYMMDD计算封板日期
func CalcFBDate(version string) (string, error) {
	layout := "20060102"
	t, err := time.Parse(layout, version)
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}
	weekday := t.Weekday().String()
	weekdayDay := 0
	switch weekday {
	case "Sunday":
		weekdayDay = 1
	case "Monday":
		weekdayDay = 2
	case "Tuesday":
		weekdayDay = 3
	case "Wednesday":
		weekdayDay = 4
	case "Thursday":
		weekdayDay = 5
	case "Friday":
		weekdayDay = 6
	case "Saturday":
		weekdayDay = 7
	}

	// Date - 7 + (W - 2)
	dateSub := 7 + weekdayDay - 3
	h, _ := time.ParseDuration(fmt.Sprintf("-%dh", 24*dateSub))
	fbDate := t.Add(h)

	// 格式化
	fmtedFbDate := fbDate.Format("20060102")
	return fmtedFbDate + "1800", nil
}

// 根据YYYYMMDD计算解封截止日期
func CalcJFDate(version string) (string, error) {
	layout := "20060102"
	t, err := time.Parse(layout, version)
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}
	weekday := t.Weekday().String()
	weekdayDay := 0
	switch weekday {
	case "Sunday":
		weekdayDay = 1
	case "Monday":
		weekdayDay = 2
	case "Tuesday":
		weekdayDay = 3
	case "Wednesday":
		weekdayDay = 4
	case "Thursday":
		weekdayDay = 5
	case "Friday":
		weekdayDay = 6
	case "Saturday":
		weekdayDay = 7
	}

	dateSub := weekdayDay - 2
	if dateSub < 0 {
		h, _ := time.ParseDuration(fmt.Sprintf("%dh", -24*dateSub))
		jfDate := t.Add(h)

		// 格式化
		fmtedJfDate := jfDate.Format("20060102")
		return fmtedJfDate + "0000", nil
	} else if dateSub == 0 {
		return version + "0000", nil
	} else {
		h, _ := time.ParseDuration(fmt.Sprintf("-%dh", 24*dateSub))
		jfDate := t.Add(h)

		// 格式化
		fmtedJfDate := jfDate.Format("20060102")
		return fmtedJfDate + "0000", nil
	}
}
