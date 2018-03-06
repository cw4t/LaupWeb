package structs

type UserInfo struct {
	UM string `json:"um"`
	Name string `json:"name"`
	Mail string `json:"mail"`
	Department string `json:"department"`
	Manager string `json:"manager"`
}

type GroupInfo struct {
	Id int64 `json:"id"`
	Name string `json:"name"`
	CN string `json:"cn"`
	Source string `json:"source"`
	Users []*UserInfo `json:"users"`
}