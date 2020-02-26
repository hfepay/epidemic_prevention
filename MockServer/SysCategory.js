const InterfaceUtils = require('./InterfaceUtils')
const obj = {
  'id': '@id',
  'pid': '@id',
  'categoryCode|1-999999': 999,
  'categoryValue|1-999999': 999,
  'categoryName': '@cword(5)',
  'hasChildren': '@boolean',
  'describle': '@ctitle',
  'createtime': '@datetime',
  'createBy|0-999': 1,
  'updateTime': '@datetime',
  'updateBy|0-999': 1
}
const server = (app) => {
  InterfaceUtils.GenerateInterface(app, obj, '/setting/sysCategory')
}

module.exports = {
  server
}
