import { regex_idCard, regex_tel } from './regex'
/**
 * 校验对象
 */
/**
 * 通过正则校验
 * @param val
 * @param regex
 * @returns {*|boolean}
 */
const validateByRegex = (val, regex) => {
  return regex.test(val)
}

const regexObj = {
  phone: regex_tel,
  idCard: regex_idCard
}

const validateObj = (function() {
  const result = {}
  for (const condition in regexObj) {
    result[condition] = function(val) {
      return regexObj[condition].test(val)
    }
  }
  return result
}())

/**
 * 单个校验
 * @param val
 * @param required
 * @param regex
 * @param validator
 * @returns {boolean}
 */
function validateItem(val, { required, type, regex, validator }) {
  let result = true
  if (required && validateNull(val)) { // 如果必须
    result = false
  } else if (type) { // 如果是通过类型校验
    // 如果非必须，可为空
    result = validateObj[type](val) || (required ? true : validateNull(val))
  } else if (regex) { // 如果是通过正则校验
    result = validateByRegex(val, regex) || (required ? true : validateNull(val))
  } else if (validator) { // 如果是通过自定义规则校验
    result = validator.call(this, val)
  }
  return result
}

function validateNotNull(val) {
  return Boolean(val)
}

function validateNull(val) {
  return !validateNotNull(val)
}

function isArray(obj) {
  return toString.call(obj) === '[object Array]'
}

/**
 *
 * @param obj 要校验的对象
 * @param rules 要校验的规则
 * @returns {boolean}
 */
const validate = function(obj, rules) {
  let result = true
  if (isArray(rules)) {
    /**
     * item格式: {key:'字段', message:'提示信息', validator: '校验规则', regex:'正则校验', required: true , type:'类型'}
     * 校验优先级type > regex > validator,只校验一种
     */
    const length = rules.length
    for (let i = 0; i < length; i++) {
      const rule = rules[i]
      const val = obj[rule.key]
      if (!validateItem(val, rule)) {
        result = false
        break
      }
    }
  } else {
    throw new Error('校验规则不合法，请传入数组类型')
  }
  return result
}
const obj = {
  name: '1',
  phone: '1888888888'
}
const rules = [
  { key: 'name', required: true },
  { key: 'phone', type: 'phone', message: '电话号码不合法' }
]
console.log(validate(obj, rules))
export default validate
