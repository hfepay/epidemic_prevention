import WebSocketCls from '../utils/websocket'
import store from '../store'
import { WS_REQ_CODE } from '../constants/module/WebsocketCode'
export const WebsocketMixins = {
  data() {
    return {
      _websocket: null,
      websocketUrl: '/websocket',
      websocketMsgScheduled: null,
      interval: 30 * 1000,
      retryCount: 0, // 重试计数
      maxRetry: Number.MAX_VALUE // 最大重连次数
    }
  },
  created() {
    this._initWebSocket()
  },
  beforeDestroy() {
    this._closeWebSocket()
  },
  watch: {
    websocketUrl: function(newVal) {
      if (newVal) {
        this._initWebSocket()
      } else {
        this._closeWebSocket()
      }
    }
  },
  methods: {
    getWSAuthParams(data) {
      return this.mergeAuthParams(data)
    },
    mergeAuthParams(data) {
      const authParams = {
        token: store.getters.token,
        businessId: store.getters.userInfo?.companyId,
        userId: store.getters.userInfo?.id
      }
      return { code: WS_REQ_CODE.LOGIN, data: { ...authParams, ...data }}
    },
    validatekWebSocketEnvironment() {
      return true
    },
    _initWebSocket() {
      this._closeWebSocket()
      // 防止websocket切换过快
      setTimeout(_ => {
        if (this.websocketUrl && this.validatekWebSocketEnvironment()) {
          this._websocket = this._getWebSocket()
          this.websocketMsgScheduled = setInterval(
            _ => this.websocketsend(
              { code: WS_REQ_CODE.HEARTBEAT, data: null }
            ), this.interval)
        }
      },0 )
    },
    _getWebSocket() {
      return new WebSocketCls({
        url: this.websocketUrl,
        onmessage: this._websocketonmessage,
        onopen: this._websocketonopen,
        onerror: this._websocketonerror,
        onclose: this._websocketonclose
      })
    },
    _websocketonmessage(e) {
      console.log(`${e.currentTarget.url}返回数据:`, e.data)
      const data = JSON.parse(e.data).data
      this.websocketonmessageCallBack(data)
    },
    websocketonmessageCallBack(data) {},
    _websocketonopen() {
      console.log(`连接建立成功${this.websocketUrl}`)
      this.sendAuthorization()
      this.websocketonopenCallBack()
    },
    sendAuthorization(){
      this.websocketsend(this.getWSAuthParams())
    },
    websocketonopenCallBack() { },
    _websocketonerror() {
      this._websocket && this._websocket.close()
      this.websocketonerrorCallBack()
      if (this.retryCount < this.maxRetry) {
        this.retryCount++
        setTimeout(_ => this._initWebSocket(), 5)
      }
    },
    websocketsend(data) { // 数据发送
      this._websocket?.readyState === 1 && this._websocket.send(JSON.stringify(data))
      console.log('发送数据:', data)
    },
    websocketonerrorCallBack() {},
    _websocketonclose() {
      this._websocket = null
      this.websocketoncloseCallBack()
      console.log(`断开连接${this.websocketUrl}`)
    },
    websocketoncloseCallBack() {},
    _closeWebSocket() {
      this._websocket?.readyState === 1 && this._websocket.close()
      this.websocketMsgScheduled && clearInterval(this.websocketMsgScheduled)
    }
  }
}
