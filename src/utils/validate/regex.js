/**
 * Created by ym on 2018/9/3 0003.
 */
// 身份证号
export const regex_idCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
// 电话号码
export const regex_tel = /^1[0-9]{10}$/
// 邮箱
export const regex_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
// 账号 由数字、字母或者两者组合而成，字母不区分大小写，最多可输入15位。
export const regex_username = /^\w{6,15}$/
/**
 * 6-15位
 * @type {RegExp}
 */
export const regex_password = /^\w{6,15}$/
/* 两位小数*/
export const regex_two_float = /^\d+(\.\d{1,2})?$/
/* 正整数*/
export const regex_integer = /^[1-9](\d?)+$/
// 小写
export const regex_lowercase = /^[a-z]+$/
// 大写
export const regex_uppercase = /^[A-Z]+$/
// 大小写
export const regex_alphabets = /^[A-Za-z]+$/
/* 统一信用码*/
export const regex_social_code = /^[A-Z0-9]{18}/
// 校验邮编
export const regex_zip_code = /^[1-9]{3}[0-9]{3}/
// 校验银行卡
export const regex_bank_card = /^[0-9]{10,}/
// 中文
export const regex_chinese = /^[\u4E00-\u9FA5]*$/
// 校验number类型，可为空
export const regex_number = /^[0-9]+(\.\d{1,2})?$/
// 校验number类型，可为空，最大8位数
export const regex_number_max = /^[0-9]{0,9}(\.\d{1,2})?$/

// url
export const regex_url = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
