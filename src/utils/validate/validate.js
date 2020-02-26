/**
 * Created by ym on 2018/6/30 0030.
 * 如果不是elment ui表单的验证
 * 请用这个方法
 */
import { regex_idCard, regex_tel, regex_email, regex_password, regex_two_float, regex_integer, regex_lowercase, regex_uppercase, regex_alphabets } from './regex'

export const validator = {
  validateIsNull: (val) => { return !validateIsNotNull(val) }, // 判断为空
  validateIsNotNull: (val) => { return validateIsNotNull(val) }, // 判断不为空
  validateIDCard: (val, permitNull) => { return validateByRegex(val, regex_idCard, permitNull) }, // 判断身份证
  validatePhone: (val, permitNull) => { return validateByRegex(val, regex_tel, permitNull) }, // 判断电话号码
  validateEmail: (val, permitNull) => { return validateByRegex(val, regex_email, permitNull) }, // 判断邮件
  validatePassword: (val, permitNull) => { return validateByRegex(val, regex_password, permitNull) }, // 判断密码
  validateTwoFloat: (val, permitNull) => { return validateByRegex(val, regex_two_float, permitNull) }, // 判断是否为两位小数
  validateInteger: (val, permitNull) => { return validateByRegex(val, regex_integer, permitNull) }, // 判断是否为整数
  validateLowerCase: (val, permitNull) => { return validateByRegex(val, regex_lowercase, permitNull) }, // 判断是否为小写
  validateUpperCase: (val, permitNull) => { return validateByRegex(val, regex_uppercase, permitNull) }, // 判断是否为大写
  validateAlphabets: (val, permitNull) => { return validateByRegex(val, regex_alphabets, permitNull) }// 判断是否为大小写
}
/**
 * 校验是否不为空
 * @param val 值
 * @param key 提示关键字
 * @returns {boolean}
 */

function validateIsNotNull(val) {
  return val ? true : val === 0
}

/**
 *
 * @param val值
 * @param key提示关键字
 * @param regex正则表达式
 * @param permitNull是否允许为空
 */
function validateByRegex(val, regex, permitNull) {
  return permitNull ? !validateIsNotNull(val) || regex.test(val) : regex.test(val)
}
export default {
  validator
}

