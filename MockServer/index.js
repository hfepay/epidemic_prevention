const SysDept = require('./SysDept')
const SysCategory = require('./SysCategory')
const SysMenu = require('./SysMenu')
const SysRole = require('./SysRole')
const SysUser = require('./SysUser')

const start = (app) => {
  SysDept.server(app)
  SysCategory.server(app)
  SysMenu.server(app)
  SysRole.server(app)
  SysUser.server(app)
}

module.exports = {
  start: start
}
