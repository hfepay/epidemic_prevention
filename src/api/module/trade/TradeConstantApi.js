import TradeApi from './TradeApi'
class TradeConstantApi extends TradeApi {
  constructor() {
    super('constant')
  }
}

export default new TradeConstantApi()
