// template.js
module.exports = {
  vueTemplate: (entity, className, parentName) => {
    return `import ${parentName}Api from './${parentName}Api'
class ${className} extends ${parentName}Api {
  constructor() {
    super('${entity}')
  }
}

export default new ${className}()
`
  }
}
