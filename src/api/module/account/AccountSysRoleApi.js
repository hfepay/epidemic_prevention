import AccountApi from './AccountApi'
class AccountSysRoleApi extends AccountApi {
  constructor() {
    super('sysRole')
  }
}

export default new AccountSysRoleApi()
