# table混入介绍
借鉴了Java的接口以及AOP思想进行table页面的公共代码封装。  
注意:后续版本将对方法和数据进行命名规范("\_"开头的不允许重写，非"\_"开头的留给用户扩展)  
## 生命周期执行方法介绍
+ created:  
(执行页面初始化操作)
```
await this.createdAspectBefore()
if (this.polling) {
  this.scheduled = setInterval(this.init, 30000)
}
this.init()
```
+ destroyed:  
(清除定时器)
```
this.scheduled && clearInterval(this.scheduled)
```
## data常用参数配置介绍
+ headers  
表头(默认:[])
+ queryParams  
table搜索条件,默认:{}
+ ApiObject  
当前页api接口对象
+ queryItemByRequest  
查询详情接口是否调用网络请求,默认true,如果为false，点击修改，数据源为当前行对象。
+ pageObj  
分页对象
+ dialogVisible  
弹窗控制
+ pagination  
是否分页,默认:true,如果为false,页面将调用list接口，不显示分页
## methods介绍
+ createdAspectBefore:  
页面初始化,调用init方法之前执行的方法，一般用于初始化下拉列表
+ init: 
```
if (this.validateSearchParams()) {
  this.getTableData()
  this.initAspectAfter()
}
```
初始化方法，这里校验通过后执行两个方法:  
1. getTableData:加载列表  
2. initAspectAfter:自定义扩展方法:一般用于跟table联动的数据
+ validateSearchParams  
搜索前校验搜索条件，是否某些必选项为空，默认返回true。
+ search  
点击查询按钮触发
+ sizeChange  
分页页面改变触发
+ currentChange 
当前页改变触发 
+ getQueryParams  
获取搜索条件:默认为queryParams。  
如果有timeRange，并且有值，将把timeRange转换成start_time和end_time,如果data中timeRangeToCamelCase为true，则转换为驼峰形式。
+ getQueryParamsBefore  
扩展方法，获取搜索条件前调用
+ getQueryParamsAfter
扩展方法，获取搜索条件后调用
+ getFinalQueryParams  
扩展方法，用于获取最终的查询参数
+ resetQueryParams  
重置查询参数
+ resetQueryParamsAfter  
扩展方法，重置查询参数后调用
+ filterNullCondition  
搜索条件过滤空属性
+ exportExcel  
导出excel,会将页面的查询条件传往后端
+ add  
新增
+ addBefore  
扩展方法，弹窗显示之前调用。
+ addAfter  
扩展方法，弹窗显示之后调用。
+ show  
查看详情方法
+ edit  
编辑方法
+ editBefore  
扩展方法，获取编辑详情之前调用
+ editAfter
扩展方法，获取编辑详情之后调用
+ submit  
提交表单
+ submitBeforeValidator  
扩展方法，提交表单前的自定义校验
+ submitBefore  
扩展方法，提交表单前的操作
+ submitAfter  
扩展方法，提交表单后的操作
+ getDialogFormParams  
获取表单数据
+ getFinalDialogFormParams
扩展方法，获取最终表单数据
+ reset  
关闭弹窗重置dialogForm
+ resetAfter  
扩展方法，重置dialogForm后调用
+ del  
删除
## 计算属性介绍
(一般情况下默认即可，当通过api无法满足，可重新定义此方法来覆盖原来的方法)
+ pageApi
+ listApi
+ addApi
+ delApi
+ updateApi
+ getApi
+ exportApi
 