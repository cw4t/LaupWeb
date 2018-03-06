package auth

import "be/structs"

type AuthDAO interface {
	GenTokenByUMAndPassword(um string, password string) (token string, err error)
	GetUserInfoByToken(token string) (*structs.UserInfo, error)
}
