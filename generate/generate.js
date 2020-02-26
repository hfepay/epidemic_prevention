const { toBigHump } = require('./utils')
const { vueTemplate } = require('./template')
const { File } = require('./file')
const path = require('path')
const basePath = __dirname
/* 父文件夹名称 */
const parentPath = 'setting'
/* 文件夹名称 */
const name = 'reception-unit'
// 引入的Api文件相关
/* begin*/
const apiDir = 'account'
const apiName = 'AccountSysUserApi'
/* end*/
const filePath = `../src/views/${parentPath}/${name}`
const fileName = 'index'
/* 搜索*/
const QueryParamsHeaders = `[
  { label: 'id', prop: 'id' },
  ]`
/* 表格表头 */
const Headers = `[
  { label: '单位编号', prop: 'id' },
  { label: '单位名称', prop: 'id' },
  { label: '主要负责人', prop: 'id' },
  { label: '联系电话', prop: 'id' },
  { label: '添加时间', prop: 'id' },
  { label: '操作', slot: 'operator' }
]`
/* 弹窗表格*/
const DialogFormHeaders = `[
      {label: '', prop: ''}
  ]`
/* 弹窗对象 */
const DialogForm = `{
    id: ''
  }`
const options = {
  apiDir,
  apiName,
  QueryParamsHeaders,
  name: toBigHump(name),
  Headers,
  DialogFormHeaders,
  DialogForm
}
File.mkdirFile(path.join(basePath, filePath, `${fileName}.vue`), vueTemplate(options))

