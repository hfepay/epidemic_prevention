import AccountApi from './AccountApi'
import MD5Utils from '../../../utils/security/MD5Utils'

function getEncryptPassword(password) {
  return MD5Utils.encrypt(MD5Utils.encrypt(password))
}

class AccountSysUserApi extends AccountApi {
  constructor() {
    super('sysUser')
  }

  add(data) {
    return super.add({ ...data, password: getEncryptPassword(data.password) })
  }

  // 登录
  login({ account, password }) {
    return super.customize_post('/login', { account, password: getEncryptPassword(password) })
  }

  // 获取当前登录用户信息
  info() {
    return super.customize_get('/info')
  }

  getMenu() {
    return super.customize_get('/getMenuNew')
  }

  logout() {
    return super.customize_post('/logout')
  }

  // 重置密码
  resetPassword(data) {
    return super.customize_put('/updatePassword',
      { ...data, password: getEncryptPassword(data.password) })
  }

  // 修改密码
  updatePassword({ oldPassword, newPassword }) {
    return super.customize_put('/updateLoginUserPassword', {
      oldPassword: getEncryptPassword(oldPassword),
      newPassword: getEncryptPassword(newPassword)
    })
  }
}

export default new AccountSysUserApi()
