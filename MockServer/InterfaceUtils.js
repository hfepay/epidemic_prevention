const Mock = require('mockjs') // 引入mock
const GenerateInterface = (app, obj, url) => {
  url = `/admin${url}`
  // 分页
  app.get(url + '/page', function(req, res) {
    const data = Mock.mock(Result.SUCCESS(
      { 'total': '10', 'size': 10, 'pages': '10', 'current': 1, 'records|10': [
        obj
      ] }
    ))
    res.json(data)
  })
  // 列表
  app.get(url + '/list', function(req, res) {
    const data = Result.SUCCESS(
      Mock.mock({ 'data|1-10': [
        obj
      ] }).data
    )
    res.json(data)
  })
  // 查询
  app.get(url + '/:id', function(req, res) {
    res.json(Result.SUCCESS(Mock.mock(obj)))
  })
  // 新增
  app.post(url + '/add', function(req, res) { res.json(Result.SUCCESS()) })
  // 修改
  app.put(url + '/update', function(req, res) { res.json(Result.SUCCESS()) })
  // 删除
  app.delete(url + '/:id', function(req, res) { res.json(Result.SUCCESS()) })
}

const Result = {
  SUCCESS: function(data) {
    return {
      code: 1,
      message: '操作成功',
      data
    }
  }
}
module.exports = {
  GenerateInterface,
  Result
}
