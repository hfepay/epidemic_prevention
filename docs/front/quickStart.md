# 快速开始
1. 生成Api文件(generate-api.js)  
+ 修改对应模块名(moduleName),实体名(entity)。
```
const moduleName = 'beMisc'
const entity = 'stockDetails'
const filePath = `../src/api/module/${moduleName}`
const parentName = toBigHump(moduleName)
const fileName = `${parentName}${entity.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}Api`
File.mkdirFile(path.join(basePath, filePath, `${fileName}.js`), vueTemplate(entity, fileName, parentName))
``` 
2. 生成table页面(generate.js)  
+ 修改页面名称(name:多个单词由-连接，注意:name唯一)  
+ 修改文件父路径parentPath  
+ 修改api相关文件apiDir,apiName  
```
const name = 'receive-records'
const parentPath = 'dispatch-center'
const filePath = `../src/views/${parentPath}/${name}`
const fileName = 'index'
// 引入的Api文件相关
const apiDir = 'beTrade'
const apiName = 'BeTradeOrderApi'
File.mkdirFile(path.join(basePath, filePath, `${fileName}.vue`), vueTemplate(apiDir, apiName, toBigHump(name)))
```
3. 路由文件(/router/index.js)添加页面
4. 根据路由文件定义的路由访问新增页面
5. 参考[table界面模块介绍](./table.md)进行开发