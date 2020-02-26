/**
 * Created by ym on 2018/6/30 0030.
 * 基于elment ui表单的自定义校验
 * 不是element请用 2.js
 */
import {
  regex_idCard,
  regex_tel,
  regex_email,
  regex_password,
  regex_social_code,
  regex_zip_code,
  regex_bank_card,
  regex_two_float,
  regex_username,
  regex_url,
  regex_integer
} from './regex'
import { validator as baseValidator } from './validate'

/**
 *
 * @param value 值
 * @param regex 正则
 * @param keyword 关键字
 * @param callback
 * @param permitNull 是否允许为空
 * @returns {*}
 */
const validate = function(value, regex, keyword, callback, permitNull = false) {
  if (!permitNull && baseValidator.validateIsNull(value)) {
    return callback(new Error(keyword + '不能为空'))
  }
  if (!regex.test(value)) {
    return callback(new Error(keyword + '不合法'))
  } else {
    return callback()
  }
}

/**
 * 校验正整数
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateInteger = (rule, value, callback) => {
  return validate(value, regex_integer, '非正整数', callback)
}
/**
 * 校验身份证
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateIDCard = (rule, value, callback) => {
  return validate(value, regex_idCard, '身份证', callback)
}
/**
 * 校验url
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateUrl = (rule, value, callback) => {
  return validate(value, regex_url, '链接', callback)
}

/**
 * 社会统一信用码
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateSocialCode = (rule, value, callback) => {
  return validate(value, regex_social_code, '统一信用码', callback)
}
/**
 * 校验电话号码
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validatePhone = (rule, value, callback) => {
  return validate(value, regex_tel, '手机号码', callback)
}

export const validatePhoneOrNull = (rule, value, callback) => {
  return !value ? callback() : validate(value, regex_tel, '手机号码', callback)
}
/**
 * 校验邮箱
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateEmail = (rule, value, callback) => {
  return validate(value, regex_email, '邮箱', callback)
}
/**
 * 校验账号
 */
export const validateUsername = (rule, value, callback) => {
  return validate(value, regex_username, '账号', callback)
}
/**
 * 校验密码
 * @param rule
 * @param value
 * @param callback
 */
export const validatePassword = (rule, value, callback) => {
  return validate(value, regex_password, '密码', callback)
}

/**
 * 校验邮政编码
 * @param rule
 * @param value
 * @param callback
 */
export const validateZipCode = (rule, value, callback) => {
  return validate(value, regex_zip_code, '邮编', callback)
}

/**
 * 校验银行卡号
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateBankCard = (rule, value, callback) => {
  return validate(value, regex_bank_card, '银行卡', callback)
}

export const validateTwoFloat = (rule, value, callback) => {
  return validate(value, regex_two_float, '请输入数字，小数点后保留两位', callback)
}
// todo 暂时没空改
export const validateUtils = {
  validateIDCard: (rule, value, callback) => { return validate(value, regex_idCard, '身份证', callback) },
  validateUrl: (rule, value, callback) => { return validate(value, regex_url, '链接', callback) },
  validateSocialCode: (rule, value, callback) => { return validate(value, regex_social_code, '统一信用码', callback) },
  validatePhone: (rule, value, callback) => { return validate(value, regex_tel, '手机号码', callback) },
  validatePhoneOrNull: (rule, value, callback) => { return !value ? callback() : validate(value, regex_tel, '手机号码', callback) },
  validateEmail: (rule, value, callback) => { return validate(value, regex_email, '邮箱', callback) },
  validateUsername: (rule, value, callback) => { return validate(value, regex_username, '账号', callback) },
  validatePassword: (rule, value, callback) => { return validate(value, regex_password, '密码', callback) },
  validateZipCode: (rule, value, callback) => { return validate(value, regex_zip_code, '邮编', callback) },
  validateBankCard: (rule, value, callback) => { return validate(value, regex_bank_card, '银行卡', callback) },
  validateTwoFloat: (rule, value, callback) => { return validate(value, regex_two_float, '输入', callback) }
}

