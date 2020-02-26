const InterfaceUtils = require('./InterfaceUtils')
const obj = {
  'id': '@id',
  'account': '@word',
  'name': '@word',
  'mobileNo': /1\d{10}/,
  'email': '@email',
  'birthday': '@datetime(yyyy-MM-dd)',
  'sex|1': [1, 2, 3],
  'status|1': [1, 2, 3],
  'deptId|0-999': 0,
  'deptName': '@word',
  'empCode|+1': 100,
  'titleCode|+1': '@word',
  'titleName|+1': '@cword(5,8)',
  'lastLoginTime': '@now',
  'createtime': '@datetime',
  'createBy|0-999': 1,
  'updateTime': '@datetime',
  'updateBy|0-999': 1
}
const server = (app) => {
  InterfaceUtils.GenerateInterface(app, obj, '/setting/sysUser')
}

module.exports = {
  server
}
