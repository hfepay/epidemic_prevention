import AccountApi from './AccountApi'
class AccountSysMenuApi extends AccountApi {
  constructor() {
    super('sysMenu')
  }
  findListByPid(pid) {
    return super.customize_get(`/findListByPid/${pid}`)
  }
  getAllTreeMenu() {
    return super.customize_get('/getAllTreeMenu')
  }
}

export default new AccountSysMenuApi()
