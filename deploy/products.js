/*
 *读取env环境变量
 */
const fs = require('fs')
const path = require('path')
const getPath = (NODE_ENV) => {
  NODE_ENV = NODE_ENV || 'production'
  return `../.env.${NODE_ENV}`
}
// env 文件 判断打包环境指定对应的服务器id
const envfile = getPath(process.env.NODE_ENV)
// env环境变量的路径
const envPath = path.resolve(__dirname, envfile)
// env对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'))
const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID'])

function parse(src) {
  // 解析KEY=VAL的文件
  const res = {}
  src.split('\n').forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      res[key] = value
    }
  })
  return res
}

/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
  {
    id: 0,
    name: '开发环境',
    host: '172.16.21.32', // ip
    port: 22, // 端口
    username: 'app_comm', // 登录服务器的账号
    password: 'hfapt@601', // 登录服务器的账号
    path: '/usr/local/nginx/html'// 发布至静态服务器的项目路径
  },
  {
    id: 1,
    name: '测试环境',
    host: '172.16.21.36', // ip
    port: 22, // 端口
    username: 'app_comm', // 登录服务器的账号
    password: 'vip@2019', // 登录服务器的账号
    path: '/usr/local/nginx/html'// 发布至静态服务器的项目路径
  }
]

module.exports = SERVER_LIST[SERVER_ID]
