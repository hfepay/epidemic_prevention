const InterfaceUtils = require('./InterfaceUtils')
const obj = {
  'id': '@id',
  'pid|0-9': 0,
  'name': '@cword(3, 5)',
  'url': '@url',
  'num|0-9': 0,
  'isMenu|1': ['0', '1'],
  'isBlank|1': ['0', '1'],
  'status|1': ['1', '2', '3'],
  'hasChildren': '@boolean',
  'describle|1': '@cparagraph',
  'createtime': '@datetime',
  'createBy|0-999': 1,
  'updateTime': '@datetime',
  'updateBy|0-999': 1
}
const server = (app) => {
  InterfaceUtils.GenerateInterface(app, obj, '/setting/sysMenu')
}

module.exports = {
  server
}
