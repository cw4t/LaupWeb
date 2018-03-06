import Ajax from './Ajax'

var userInfoCache = {}

const Auth = (($) => {

  const USER_INFO_URL = '/v2/ajax/auth/info'
  const LOGIN_PAGE = 'http://sso.pinganfu.net/login?referer='
  const ACHAIN_VALIDATION = "http://achain.pinganfu.net/ssovalidation.html"

  class Auth {
    constructor() {

    }

    // 获取当前用户信息
    get_current_user_info(callback, current_path="") {
      var that = this
      //console.log('get_current_user_info')
      Ajax.get(
        USER_INFO_URL,
        {},
        true,
        // success
        (data, textStatus, jqXHR) => {
          callback(jqXHR.responseJSON)
        },
        // error
        (jqXHR, textStatus, errorThrown) => {
          console.log('登陆失败')
          console.log(jqXHR)
          // 登陆失败则获取跳转页面地址
          window.location.href = `${LOGIN_PAGE}${ACHAIN_VALIDATION}`
        }
      )
    }

    get_user_id_by_um(um) {
      if (userInfoCache[um] !== undefined) {
        console.log("use user info cache")
        return userInfoCache[um]
      }
      console.log("get user info from sso")
      var result = um
      Ajax.get(
        USER_DETAIL_BY_UM_URL + '/' + um,
        {},
        false,
        // success
        (data, textStatus, jqXHR) => {
          result = `${jqXHR.responseJSON.name}/${jqXHR.responseJSON.um}`
          userInfoCache[um] = result
        },
        // error
        (jqXHR, textStatus, errorThrown)=>{
          result = um
        }
      )
      return result
    }
  }

  return Auth

})(jQuery)

export default Auth
