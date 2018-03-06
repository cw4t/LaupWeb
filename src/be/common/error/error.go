package error

//LAUPError Error struct
type LAUPError struct {
	msg string
}

func (e *LAUPError) Error() string {
	return e.msg
}

func New(msg string) *LAUPError {
	return &LAUPError{msg: msg}
}

func DBError() *LAUPError {
	return New("数据库错误")
}

func VCError() *LAUPError {
	return New("验证码错误")
}

func UserExist() *LAUPError {
	return New("用户已存在")
}

func AuthError() *LAUPError {
	return New("认证失败")
}

func RestError() *LAUPError {
	return New("REST交互失败")
}

func SSOError() *LAUPError {
	return New("SSO请求失败")
}
