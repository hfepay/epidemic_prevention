# api模块介绍
此系统的Api设计，参考Java的继承，所有的Api都最终继承了BaseApi。
+ BaseApi
```
class BaseApi {
  constructor(module, entity) {
    this.module = module// 模块名
    this.entity = entity //实体名
    this.BASEURL = `/${this.module}/${this.entity}`// 根url
  }
  /* 公共crud page 导出方法 begin*/
  page(data) {
    return request.get(`${this.BASEURL}/page`, { params: data })
  }
  export(data) {
    return request.exportExcel(`${this.BASEURL}/export`, data)
  }
  add(data) {
    return request.post(`${this.BASEURL}/add`, data)
  }
  del(id) {
    return request.delete(`${this.BASEURL}/${id}`)
  }
  update(data) {
    return request.put(`${this.BASEURL}/update`, data)
  }
  get(id) {
    return request.get(`${this.BASEURL}/${id}`)
  }
  list(data = {}) {
    delete data.page
    delete data.limit
    return request.get(`${this.BASEURL}/list`, { params: data })
  }
  /* 公共crud page 导出方法 end*/
  // 转变下拉列表
  toOptions(data, { label = 'id', value = 'id' }) {
    data = Array.isArray(data) ? data : [data]
    return data.map(item => {
      return {
        label: item[label], // 显示字段
        value: '' + item[value], // 取值字段
        item: item
      }
    })
  }
  /* 自定义扩展方法begin*/
  customize_export(url, data) {
    return request.exportExcel(`${this.BASEURL}${url}`, data)
  }
  customize_get(url, data) {
    return request.get(`${this.BASEURL}${url}`, { params: data })
  }
  customize_post(url, data) {
    return request.post(`${this.BASEURL}${url}`, data)
  }
  customize_put(url, data) {
    return request.put(`${this.BASEURL}${url}`, data)
  }
  customize_del(url, data) {
    return request.del(`${this.BASEURL}${url}`, data)
  }
  /* 自定义扩展方法end*/
}
```
+ 模块Api(以BeAccountApi为例)
```
class BeAccountApi extends BaseApi {
  constructor(entity) {
     // beAccount 模块名称
    super('beAccount', entity)
  }
}
```
+ 实体Api(以BeAccountRoleApi为例)
```
class BeAccountRoleApi extends BeAccountApi {
  constructor() {
    // role 实体名称 所有访问前缀/role/beAccount
    super('role')
  }
}
```