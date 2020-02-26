/* eslint-disable no-eval */
function getRandom() {
  return (Math.random() + '').substring(2, 6)
}
/**
 * 公共工具方法
 */
// 重置对象（仅最外层)
const reset = val => {
  if (Object.keys(val).length) {
    const data = {}
    for (const condition in val) {
      const value = val[condition]
      let type = toString.call(value)
      type = type.replace(/^(\[object )([\w]+)(\])$/, '$2')
      // null 和 Undefined 需要特殊判断
      switch (type) {
        case 'Null':
          data[condition] = null
          break
        case 'Undefined':
          data[condition] = undefined
          break
        default:
          data[condition] = value.__proto__.constructor() // eslint-disable-line
      }
    }
    return data
  }
  throw new Error('请传入合法参数')
}

const IMG_BASE_URL = `${process.env.VUE_APP_IMG_URL}`
const getVideoFullUrl = (fileName) => `${process.env.VUE_APP_BASE_URL}/file/imgs/showVideo/${fileName}`

const Base64ImgWrapper = (val) => {
  return 'data:image/jpeg;base64,' + val
}
// 回显图片
const imgWrapper = (val) => {
  return IMG_BASE_URL + val
}

const imgWrapperRevert = (val) => {
  return `${val}`.replace(IMG_BASE_URL, '')
}

/**
 * 下划线变驼峰
 * @param val
 * @returns {void | string | *}
 */
const toCamelCase = (val) => {
  return val.replace(/_(\w)/g, function(context, first) {
    return first.toUpperCase()
  })
}
/**
 * 功能同copyChangeKeys，参数形式变更
 * {
 *   name:'newName'    =>   name字段修改为newName
 * }
 * @param src
 * @param keysObj
 */
const copyChangeKeysByObj = (src, keysObj) => {
  return copyChangeKeys(src, Object.keys(keysObj), Object.values(keysObj))
}

/**
 * 把源对象的key换成返回对象的key
 * @param src
 * @param srcKeys
 * @param dstKeys
 */
const copyChangeKeys = (src, srcKeys, dstKeys) => {
  // 保证数据类型正确性
  !isObject(src) && (srcKeys = {})
  !isArray(srcKeys) && (srcKeys = [])
  !isArray(dstKeys) && (dstKeys = [])
  // key长度取较小的
  const sreKeysLength = srcKeys.length
  const dstKeysLength = dstKeys.length
  const length = Math.min(sreKeysLength, dstKeysLength)
  const result = {}
  for (let i = 0; i < length; i++) {
    result[dstKeys[i]] = src[srcKeys[i]]
  }
  return result
}
/**
 * 根据key复制对象
 * @param src
 * @param srcKeys
 */
const copyByKey = (src, srcKeys) => {
  if (isObject(src)) {
    if (!isArray(srcKeys)) {
      throw new Error('keys非法，请传入Array类型')
    }
    const result = {}
    srcKeys.forEach(key => {
      result[key] = src[key]
    })
    return result
  }
  throw new Error('src非法，请传入object类型')
}

function isString(obj) {
  return toString.call(obj) === '[object String]'
}

function isObject(obj) {
  return toString.call(obj) === '[object Object]'
}

function isArray(obj) {
  return toString.call(obj) === '[object Array]'
}

function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

function pick(obj, keys) {
  obj = isObject(obj) ? obj : {}
  keys = isArray(keys) ? keys : []
  const data = {}
  keys.forEach(item => {
    data[item] = obj[item]
  })
  return data
}

function isNull(val = '') {
  return Object.keys(val).length > 0
}
async function asyncFuntion(fn) {
  try {
    const res = await fn()
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}

// [{label:label,value:value}]
const toOptions = val => {
  return val
    ? Object.keys(val).map(item => {
      return {
        label: val[item],
        value: item
      }
    })
    : {}
}

export default {
  toOptions,
  pick,
  reset,
  imgWrapper,
  imgWrapperRevert,
  Base64ImgWrapper,
  toCamelCase,
  copyByKey,
  copyChangeKeys,
  copyChangeKeysByObj,
  isNull,
  isArray,
  isFunction,
  isString,
  isObject,
  getRandom,
  asyncFuntion,
  getVideoFullUrl
}
