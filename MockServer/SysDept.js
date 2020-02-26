const InterfaceUtils = require('./InterfaceUtils')
const obj = {
  'id': '@id',
  'num|1-9': 1,
  'pid|0-10': 0,
  'hasChildren': '@boolean',
  'simpleName|1': ['人事部', '运维部', '研发部'],
  'fullName|1': ['华付A', '华付B', '华付C'],
  'createtime': '@datetime',
  'describle': '@cparagraph'
}
const server = (app) => {
  InterfaceUtils.GenerateInterface(app, obj, '/setting/sysDept')
}

module.exports = {
  server
}
