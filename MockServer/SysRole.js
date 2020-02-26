const InterfaceUtils = require('./InterfaceUtils')
const obj = {
  'id': '@id',
  'num|1-9': 1,
  'name': '@cword(2)',
  'isDel|1': [0, 1],
  'hasChildren': '@boolean',
  'describle|1': '@cparagraph',
  'createtime': '@datetime',
  'createBy|0-999': 1,
  'updateTime': '@datetime',
  'updateBy|0-999': 1
}
const server = (app) => {
  InterfaceUtils.GenerateInterface(app, obj, '/setting/sysRole')
}

module.exports = {
  server
}
