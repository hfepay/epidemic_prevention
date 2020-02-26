var crypto = require('crypto') // 加载crypto库
/**
 * AES加密的配置
 * 1.密钥
 * 2.偏移向量
 * 3.算法模式CBC
 * 4.补全值
 */
var AES_conf = {
  key: getSecretKey(), // 密钥
  iv: '1012132405963708', // 偏移向量
  padding: 'PKCS7Padding' // 补全值
}

/**
 * 读取密钥key
 * 更具当前客户端的版本vid、平台platform获取对应的key
 */
function getSecretKey() {
  return 'abcdabcdabcdabcd'
}

/**
 * AES_128_CBC 加密
 * 128位
 * return base64
 */

const AESUtils = {
  encrypt: (data) => {
    const key = AES_conf.key
    const iv = AES_conf.iv
    // let padding = AES_conf.padding;
    var cipherChunks = []
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    cipher.setAutoPadding(true)
    cipherChunks.push(cipher.update(data.toString(), 'utf8', 'base64'))
    cipherChunks.push(cipher.final('base64'))
    return cipherChunks.join('')
  },
  decrypt: (data) => {
    const key = AES_conf.key
    const iv = AES_conf.iv
    // let padding = AES_conf.padding;

    var cipherChunks = []
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    decipher.setAutoPadding(true)
    cipherChunks.push(decipher.update(data, 'base64', 'utf8'))
    cipherChunks.push(decipher.final('utf8'))
    return cipherChunks.join('')
  }
}

export default AESUtils
