class WebSocketCls {
  constructor({ onmessage, onopen, onerror, close, url, domain }) {
    const websock = this.getInstance(url, domain)
    websock.onmessage = onmessage || function(e) { console.log(`返回数据:${e.data}`) }
    websock.onopen = onopen || function() { console.log(`连接建立成功:${url}`) }
    websock.onerror = onerror || function() { console.log(`连接建立失败:${url}`) }
    websock.onclose = close || function(e) { console.log(`关闭连接:`, e) }
    return websock
  }
  getInstance(url, domain) {
    return new WebSocket((domain || process.env.VUE_APP_WEBSOCKET_URL || '') + url)
  }
}

export default WebSocketCls
