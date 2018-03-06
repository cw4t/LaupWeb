package structs

type SSOSelectUserRecord struct {
	UM string `json:"um"`
	DepName string `json:"dep_name"`
	Id int64 `json:"id"`
	Name string `json:"name"`
}

type SSOManagerInfo struct {
	UM string `json:"um"`
	EMail string `json:"email"`
	CN string `json:"cn"`
	Department string `json:"department"`
}

type SSODepartmentInfo struct {
	Id int64 `json:"id"`
	Name string `json:"name"`
}

type SSOUserDetail struct {
	Name string `json:"name"`
	ManagerInfo *SSOManagerInfo `json:"manager_info"`
	UM string `json:"um"`
	EMail string `json:"email"`
	Department string `json:"department"`
	DepartmentInfo *SSODepartmentInfo `json:"department_info"`
}

type SSOGroupMember struct {
	ReturnMsg []*SSOUserDetail `json:"returnMsg"`
	ReturnCode int64 `json:"returnCode"`
}

type SSOGroupInfo struct {
	Ext string `json:"exit"`
	Name2 string `json:"name2"`
	Id int64 `json:"id"`
	Modified string `json:"modified"`
	Name string `json:"name"`
}

type SSODepartment struct {
	ParentName string `json:"parent_name"`
	Name string `json:"name"`
	Created string `json:"created"`
	ParentId int64 `json:"parent_id"`
	ManagerName string `json:"manager_name"`
	Name2 string `json:"name2"`
	ManagerId int64 `json:"manager_id"`
	Id int64 `json:"id"`
}

type SSODutyPersonInfo struct {
	Name string `json:"name"`
	Mobile string `json:"mobile"`
	EMail string `json:"email"`
	UM string `json:"um"`
}

type SSODutyInfoDetail struct {
	Slave *SSODutyPersonInfo `json:"slave"`
	Master *SSODutyPersonInfo `json:"master"`
}

type SSODutyInfo struct {
	DutyDetails *SSODutyInfoDetail `json:"duty_details"`
	ReturnCode int64 `json:"returnCode"`
	ReturnMsg string `json:"returnMsg"`
}

