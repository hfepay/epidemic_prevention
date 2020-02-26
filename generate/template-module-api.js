// template.js
module.exports = {
  vueTemplate: (moduleName, className) => {
    return `import BaseApi from '../../base/BaseApi'
class ${className} extends BaseApi {
  constructor(entity) {
    super('${moduleName}', entity)
  }
}

export default ${className}
`
  }
}
