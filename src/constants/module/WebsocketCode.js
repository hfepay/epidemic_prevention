/**
 *
 * @type {{SUCCESS: number, NOTIFICATION_HALL: number, FRESH_AIRPORT: number, FRESH_HALL: number, NOTIFICATION_AIRPORT: number}}
 * websocket响应码
 * 1 响应成功，不需做任何处理
 * 1001厅房通知,1003接机通知
 * 1002刷新(根据厅房连接的websocket),1004刷新(根据机场Code连接的websocket)
 */
export const WS_RES_CODE_ENUM = {
  NOTIFICATION_HALL: 1001,
  FRESH_HALL: 1002,
  NOTIFICATION_AIRPORT: 1003,
  FRESH_AIRPORT: 1004,
  NOTIFICATION_RESERVE: 1005,
  SUCCESS: 1
}
/**
 *
 * @type {{LOGIN: string, HEARTBEAT: string}}
 * websocket请求码
 * login连接认证,heartBeat心跳
 */
export const WS_REQ_CODE = {
  LOGIN: 'login',
  HEARTBEAT: 'heartBeat'
}
// 1001厅房服务弹窗消息,1003机场接机弹窗消息,1005机场预约弹窗消息
/**
 * websocket通知类型
 * @type {{RESERVE: number, HALL: number, PICKUP: number}}
 */
export const WX_NOTIFICATION_ENUM = {
  HALL: WS_RES_CODE_ENUM.NOTIFICATION_HALL,
  PICKUP: WS_RES_CODE_ENUM.NOTIFICATION_AIRPORT,
  RESERVE: WS_RES_CODE_ENUM.NOTIFICATION_RESERVE
}
