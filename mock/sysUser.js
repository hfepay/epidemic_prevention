// api.js
import Mock from 'mockjs'
import Responce from './Responce'
const BASEURL = process.env.VUE_APP_MOCK_URL + '/sysUser'
const restUrl = new RegExp(`${BASEURL}/\\d+$`)
const user = {
  'id|1-999999': 999,
  'companyId|1-999999': 999,
  'companyName': '@cword(5)',
  'account': '@word(6,15)',
  'name': '@cname',
  'mobileNo': '18888888888',
  'email': '@email',
  'birthday': "@date('yyyy-MM-dd')",
  'sex|1-3': 2,
  'deptId|1-999999': 999,
  'deptName': '@cword(5)',
  'status': 'birthday',
  'lastLoginTime': "@date('yyyy-MM-dd HH:mm:ss')",
  'createBy': "@date('yyyy-MM-dd HH:mm:ss')"
}

Mock.mock(`${BASEURL}/page`, 'get',
  Responce.SUCCESS(
    { 'total': '10', 'size': 10, 'pages': '10', 'current': 1, 'records|10': [
      user
    ] }
  )
)

// 详情
Mock.mock(restUrl, 'get',
  Responce.SUCCESS(
    user
  )
)
// 新增参数
const addData = {
  companyId: 1,
  account: '',
  password: 1,
  name: '',
  status: '',
  mobileNo: '',
  email: '',
  birthday: null,
  sex: null,
  deptId: null,
  empCode: null,
  titleCode: null,
  titleName: null
}
// 新增
Mock.mock(`${BASEURL}/add`, 'post',
  Responce.SUCCESS()
)
// 修改参数
const updateData = {
  id: 1,
  companyId: 1,
  name: '',
  mobileNo: '',
  email: '',
  birthday: null,
  sex: null,
  deptId: null,
  empCode: null,
  titleCode: null,
  titleName: null
}
// 修改
Mock.mock(`${BASEURL}/update`, 'put',
  Responce.SUCCESS()
)
// // 删除
Mock.mock(restUrl, 'delete',
  Responce.SUCCESS()
)

