const { toBigHump } = require('./utils')
const { vueTemplate } = require('./template-api')
const mkModuleApi = require('./generate-module-api')
const { File } = require('./file')
const path = require('path')
const basePath = __dirname
const moduleName = 'trade'
const entity = 'orderEarly'
const filePath = `../src/api/module/${moduleName}`
const parentName = toBigHump(moduleName)
const fileName = `${parentName}${entity.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}Api`
const moduleFile = path.join(basePath, filePath, `${parentName}Api.js`)
const file = path.join(basePath, filePath, `${fileName}.js`)
// 生成模块Api
!File.existFile(moduleFile) && mkModuleApi(moduleName)
// 生成实体Api
File.mkdirFile(file, vueTemplate(entity, fileName, parentName))

