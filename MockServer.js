const express = require('express') // 引入express
const Server = require('./MockServer/index')

const app = express() // 实例化express
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
Server.start(app)
app.listen('8090', () => {
  console.log('监听端口 8090')
})
