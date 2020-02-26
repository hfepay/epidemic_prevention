var ws = require('nodejs-websocket')
ws.createServer(function(conn) {
  console.log('有新连接')
  const event = setInterval(function() {
    conn.sendText(JSON.stringify({
      'code': 1,
      'data': { 'content': '您有新的外卖订单，配送日期：2020-02-24', 'imgUrl': '', 'title': '新订单通知' },
      'message': '操作成功'
    }))
  }, 15000)
  // 获取连接信息
  conn.on('text', function(str) {
    console.log('接收到的数据 ' + str)
    // conn.sendText(str)
  })

  // 断开连接的回调
  conn.on('close', function(code, reason) {
    console.log('Connection closed')
    clearInterval(event)
  })

  // 处理错误事件信息
  conn.on('error', function(err) {
    console.log('throw : err')
    console.log(err)
  })
}).listen(8001)
