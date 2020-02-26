// 变大驼峰
function toBigHump(s) {
  return s.replace(/^(\w)/, function(str) {
    return str.toUpperCase()
  }).replace(/(-\w)/g, function(str) {
    return str.replace('-', '').toUpperCase()
  })
}

module.exports = {
  toBigHump
}
