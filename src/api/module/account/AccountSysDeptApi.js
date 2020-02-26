import AccountApi from './AccountApi'
class AccountSysDeptApi extends AccountApi {
  constructor() {
    super('sysDept')
  }
  tree() {
    return super.customize_get('/tree')
  }
}

export default new AccountSysDeptApi()
