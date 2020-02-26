import AccountApi from './AccountApi'
class AccountSysCategoryApi extends AccountApi {
  constructor() {
    super('sysCategory')
  }
  findListByPid(pid) {
    return super.customize_get(`/findListByPid/${pid}`)
  }
}

export default new AccountSysCategoryApi()
