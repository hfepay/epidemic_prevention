// rsa
const NodeRSA = require('node-rsa')
const key = new NodeRSA({ b: 512 }) // 生成新的512位长度密钥
// var publicDer = key.exportKey('public')
// var privateDer = key.exportKey('private')
// console.log('publicDer:' + publicDer)
// console.log('privateDer:' + privateDer)
const RSAUtils = {
  encrypt: (val) => {
    return key.encrypt(val, 'base64')
  },
  decrypt: (val) => {
    return key.decrypt(val, 'utf8')
  }
}

export default RSAUtils
