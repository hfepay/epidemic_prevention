const { toBigHump } = require('./utils')
const { vueTemplate } = require('./template-module-api')
const { File } = require('./file')
const path = require('path')
const basePath = __dirname

const mkModuleApi = (moduleName) => {
  const filePath = `../src/api/module/${moduleName}`
  const parentName = toBigHump(moduleName)
  const fileName = `${parentName}Api`
  File.mkdirFile(path.join(basePath, filePath, `${fileName}.js`), vueTemplate(moduleName, fileName))
}

module.exports = mkModuleApi
