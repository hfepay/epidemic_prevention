import axios from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import store from '../store'
import router from '../router'
const countMap = new Map()

const SUCCESS_CODE = 1
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 30 * 1000 // 请求超时时间
})

// service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
let loadingInstance
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.method !== 'get') {
      loadingInstance = Loading.service({ text: '加载中' })
      // store.commit('DO_LOADING')
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

function validateRetryCondition(url) {
  return !countMap.has(url) || countMap.get(url) < 3
}

function setUrlCount(url) {
  if (countMap.has(url)) {
    const count = countMap.get(url)
    countMap.set(url, count + 1)
  } else {
    countMap.set(url, 1)
  }
}

function resetUrlCount(url) {
  return countMap.set(url, 0)
}
// response 拦截器
service.interceptors.response.use(
  async response => {
    loadingInstance && loadingInstance.close()
    // store.commit('CANCEL_LOADING')
    /**
     * code为非1是抛错
     */
    const res = response.data
    const url = response.config.url
    if (!res && validateRetryCondition(url)) {
      setUrlCount(url)
      const config = response.config
      if (config.url.startsWith('/api')) {
        config.url = config.url.replace(/^\/api/, '')
      }
      const res = await service.request(config)
      return res
    }
    // 成功返回数据 url count设置为0
    resetUrlCount(url)
    // 下载做特殊处理
    if (response.data.constructor === Blob.prototype.constructor) {
      var reader = new FileReader()
      reader.onload = function(event) {
        try {
          var content = JSON.parse(reader.result)// 内容就在这里
          if (content.code == SUCCESS_CODE) {
            download(response)
          } else {
            Message({
              message: content.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        } catch (e) {
          download(response)
        }
      }
      reader.readAsText(response.data)
      return
    }
    // 获取token接口需要特殊处理  返回没有code
    if (res.code && res.code != SUCCESS_CODE) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // token失效
      if (res.code == 698 || res.code == 699) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
            callback: function(action) {
              store.dispatch('FedLogOut').then(() => {
                router.push('/login')
              }).catch(_ => {
                router.push('/login')
              }
              )
            }
          }
        )
      }
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    loadingInstance && loadingInstance.close()
    console.error(Object.keys(error).map(item => error[item])) // for debug
    Message({
      message: error.config.url + '：' + error.request.status,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const exportExcel = (url, data, methods = 'get') => {
  const config = { // 用axios发送post请求
    method: methods,
    url: url, // 请求地址
    responseType: 'blob' // 表明返回服务器返回的数据类型
  }
  if (methods === 'post') {
    config.data = data
  } else {
    config.params = data
  }
  return service.request(config)
}

// 下载文件
function download(res, fileName) {
  try {
    const content = res.data
    const blob = new Blob([content], { type: 'application/x-xls' })
    const fileName_arr = res.headers['content-disposition'] ? res.headers['content-disposition'].match(/filename=(\S*)/) : [fileName || `${Date.now()}.xls`]
    if (fileName_arr.length > 0) {
      fileName = decodeURI(fileName_arr[0].replace('filename=', ''))
    }
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  } finally {
    Loading.service({}).close()
  }
}

/**
 * 方法扩展：导出excel
 * @param url
 * @param data
 * @param method
 * @param filename
 */
service.exportExcel = (url, data, method) => {
  loadingInstance = Loading.service({ fullscreen: true, text: '下载中', customClass: 'onload' })
  method = (method || 'get').toLowerCase()
  let action = () => {}
  switch (method) {
    case 'post':
      action = exportExcel(url, data, 'post')
      break
    default:
      action = exportExcel(url, data)
      break
  }
  action
}

export const mergeFormDataConfig = (data) => {
  return { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: data }
}

export default service
