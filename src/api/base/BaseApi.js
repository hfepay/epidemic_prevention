import request, { mergeFormDataConfig } from '@/utils/request'
export default class BaseApi {
  #BASEURL;
  // 私有属性 模块名 实体名
  constructor(...args) {
    this.#BASEURL = `/${args.join('/')}`// 根url
  }
  /* 公共crud page 导出方法 begin*/
  page(data) {
    return request.get(`${this.#BASEURL}/page`, { params: data })
  }
  export(data) {
    return request.exportExcel(`${this.#BASEURL}/export`, data)
  }
  add(data) {
    return request.post(`${this.#BASEURL}/add`, data)
  }
  del(id) {
    return request.delete(`${this.#BASEURL}/${id}`)
  }
  update(data) {
    return request.put(`${this.#BASEURL}/update`, data)
  }
  get(id) {
    return request.get(`${this.#BASEURL}/${id}`)
  }
  list(data = {}) {
    data && delete data.page
    data && delete data.limit
    return request.get(`${this.#BASEURL}/list`, { params: data })
  }
  /* 公共crud page 导出方法 end*/
  // 转变下拉列表
  toOptions(data, { label = 'name', value = 'id' }) {
    data = Array.isArray(data) ? data : [data]
    return data.map(item => {
      return {
        label: item[label], // 显示字段
        value: item[value], // 取值字段
        item: item
      }
    })
  }
  /* 自定义扩展方法begin*/
  customize_export(url, data) {
    return request.exportExcel(`${this.#BASEURL}${url}`, data)
  }
  customize_get(url, data, config) {
    return request.get(`${this.#BASEURL}${url}`, { params: data, ...config })
  }
  customize_post(url, data, config) {
    return request.post(`${this.#BASEURL}${url}`, data, config)
  }
  customize_post_formdata(url, data) {
    return this.customize_post(url, {}, mergeFormDataConfig(data))
  }
  customize_put(url, data, config) {
    return request.put(`${this.#BASEURL}${url}`, data, config)
  }
  customize_del(url, config) {
    return request.delete(`${this.#BASEURL}${url}`, config)
  }
  /* 自定义扩展方法end*/
}
