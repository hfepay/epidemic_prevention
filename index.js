const express = require('express')
const app = express()
app.use(express.static('dist'))
const server = app.listen(3000, function() {
  const host = server.address().address
  const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
app.use(function(req, res) {
  res.status(404).send('页面不存在')
})
