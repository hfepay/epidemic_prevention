var crypto = require('crypto') // 加载crypto库

const MD5Utils = {
  encrypt: (val) => {
    const md5 = crypto.createHash('md5')// 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(val)
    return md5.digest('hex') // 加密后的值d
  }
}
/*
盐：1a2b3c4d
加密方式：原密码+盐（两次md5加密）
原密码：123456
加密后：68c0bb04e832fe71262893c66e39bb2e
* */
/* var salt = '1a2b3c4d'
console.log(MD5Utils.encrypt(MD5Utils.encrypt('123456' + salt) + salt))*/
export default MD5Utils
