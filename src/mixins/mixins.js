export const Mixins = {
  data() {
    return {
      /* 用户自定义的对象begin*/
      // 查询条件
      QueryParams: {},
      // 表头
      Headers: {},
      // 弹窗对象
      DialogForm: {},
      // 接口对象
      ApiObject: {},
      /* 用户自定义的对象end*/

      /* 用户根据自身情况可重写的变量begin*/
      // 查询详情接口是否调用网络请求，为false，以page对象为查询结果
      Mixins_QueryItemByRequest: true,
      // 是否分页
      Mixins_Pagination: true,
      // 是否轮询 为true，根据轮询周期查询
      Mixins_Polling: false,
      // 轮询周期
      Mixins_PollingTime: 30 * 1000,
      /* 用户根据自身情况可重写的变量end*/

      /* 不建议重写的变量begin*/
      // 表格对象
      Mixins_$TableData: [],
      // page对象
      Mixins_$PageObj: { page: 1, limit: 10, total: 0 },
      Mixins_$OperateType: { ADD: '_add', 'EDIT': '_edit', 'SHOW': '_show' },
      // 弹窗
      Mixins_$DialogVisible: false,
      // 表格加载状态
      Mixins_$TableLoading: false,
      Mixins_$Scheduled: null
      /* 不建议重写的变量end*/
    }
  },
  async created() {
    // 初始化之前执行的方法，一般用于初始化下拉列表
    await this.Mixins_InitBefore()
    if (this.Mixins_Polling) {
      // 如果是轮询，设置定时器
      this.Mixins_$Scheduled = setInterval(this.Mixins_$Init, this.Mixins_PollingTime)
    }
    // 执行初始化方法
    this.Mixins_$Init()
  },
  destroyed() {
    // 清除定时器
    this.Mixins_$Scheduled && clearInterval(this.Mixins_$Scheduled)
  },
  computed: {
    /* 当前页的接口管理，可重写 */
    Mixins_DialogTitle() {
      const data = {
        [this.Mixins_$OperateType.EDIT]: '编辑',
        [this.Mixins_$OperateType.SHOW]: '查看',
        [this.Mixins_$OperateType.ADD]: '新增'
      }
      return data[this.DialogForm._operate || '_add']
    },
    Mixins_$IsAdd() { return this.DialogForm._operate === this.Mixins_$OperateType.ADD },
    Mixins_$IsShow() { return this.DialogForm._operate === this.Mixins_$OperateType.SHOW },
    Mixins_$IsEdit() { return this.DialogForm._operate === this.Mixins_$OperateType.EDIT },
    Mixins_PageApi() { return this.ApiObject.page },
    Mixins_ListApi() { return this.ApiObject.list },
    Mixins_AddApi() { return this.ApiObject.add },
    Mixins_DelApi() { return this.ApiObject.del },
    Mixins_UpdateApi() { return this.ApiObject.update },
    Mixins_GetApi() { return this.ApiObject.get },
    Mixins_ExportApi() { return this.ApiObject.export }
  },
  methods: {
    // 初始化方法
    Mixins_$Init() {
      if (this.Mixins_Validate_SearchParams()) {
        this.Mixins_$InitExtra()
        this.Mixins_$GetTableData()
      }
    },
    // 获取表格数据
    async Mixins_$GetTableData() {
      // 加载中
      if (this.Mixins_$TableLoading) {
        return
      }
      try {
        this.Mixins_$TableLoading = true
        const result = await this.Mixins_SendInitRequest()
        this.Mixins_$TableData = this.Mixins_GetFinalTableData(result.data)
        this.Mixins_$PageObj.total = this.Mixins_Pagination ? ~~result.data.total : 0
        this.Mixins_GetTableDataAfter(result.data)
      } finally {
        this.Mixins_$TableLoading = false
      }
    },
    async Mixins_SendInitRequest() {
      const Api = this.Mixins_Pagination ? this.Mixins_PageApi : this.Mixins_ListApi
      const result = await Api.call(this.ApiObject, this.Mixins_$GetQueryParams())
      return result
    },
    // 如果表格数据不符合规范，这里可自定义返回数据
    Mixins_GetFinalTableData(data) {
      return this.Mixins_Pagination ? data.records : data
    },
    /* 仅混入使用begin*/
    $_getRangeKey(str) {
      return str.replace(/[t|T]imeRange$/, '')
    },
    $_firstWordToUpperCase(str) {
      return str.replace(/^./, function(s) { return s.toUpperCase() })
    },
    $_filterNullCondition(data) {
      /* 过滤 */
      for (const condition in data) {
        if (!data[condition] && (data[condition] !== 0 || data[condition] !== false)) {
          delete data[condition]
        }
      }
      return data
    },
    // *Range结尾会自动转换   例: timeRamge => startTime && endTime , deplyTimeRange => deplyStartTime  deplyEndTime
    $_parseRangeField(queryParams) {
      for (const condition in queryParams) {
        // 处理时间问题
        if (condition.endsWith('imeRange') && Array.isArray(queryParams[condition])) {
          if (queryParams[condition].length > 0) {
            const key = this.$_getRangeKey(condition)
            const startKey = key ? `${key}StartTime` : 'startTime'
            const endKey = key ? `${key}EndTime` : 'endTime'
            queryParams[startKey] = queryParams[condition][0] + ' 00:00:00'
            queryParams[endKey] = queryParams[condition][1] + ' 23:59:59'
          }
          delete queryParams[condition]
        }
      }
      return queryParams
    },
    /* 仅混入使用end*/
    // 获取搜索条件
    Mixins_$GetQueryParams() {
      let queryParams = { ...this.QueryParams, ...this.Mixins_$PageObj }
      queryParams = this.$_parseRangeField(queryParams)
      delete queryParams['total']
      queryParams = this.$_filterNullCondition(queryParams)
      return this.Mixins_GetFinalQueryParams(queryParams)
    },
    // 查询按钮
    Mixins_$Search() {
      this.Mixins_$PageObj.page = 1
      this.Mixins_$Init()
    },
    // 分页长度改变
    Mixins_$SizeChange(val) {
      this.Mixins_$PageObj.limit = val
      this.Mixins_$Search()
    },
    // 分页页码改变
    Mixins_$CurrentChange(val) {
      this.Mixins_$PageObj.page = val
      this.Mixins_$Init()
    },
    // 导出
    Mixins_$ExportExcel() {
      this.Mixins_ExportApi.call(this.ApiObject, this.Mixins_$GetQueryParams())
    },
    // 排序默认设置为1
    Mixins_AddBeforeAspect() {
      if (this.DialogForm.hasOwnProperty('sortNum')) {
        this.DialogForm.sortNum = 1
      }
    },
    // 新增
    Mixins_$Add() {
      this.Mixins_AddBeforeAspect()
      this.Mixins_AddBefore()
      this.Mixins_$DialogVisible = true
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.ADD)
      this.Mixins_AddAfter()
    },
    Mixins_$SetDialogOperate(type) {
      this.$set(this.DialogForm, '_operate', type)
    },
    // 查看
    async Mixins_$Show(obj) {
      await this.Mixins_$Edit(obj)
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.SHOW)
    },
    // 编辑
    async Mixins_$Edit(obj) {
      this.Mixins_EditBefore()
      const res = this.Mixins_QueryItemByRequest ? await this.Mixins_GetApi.call(this.ApiObject, obj.id) : { data: obj }
      const data = res.data
      const finalEditParams = this.Mixins_GetFinalEditParams(data)
      this.DialogForm = { ...this.DialogForm, ...finalEditParams }
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.EDIT)
      this.Mixins_$DialogVisible = true
      this.Mixins_EditAfter(res, finalEditParams)
      return true
    },
    // 提交
    async Mixins_$Submit() {
      if (!this.Mixins_$SubmitBeforeValidator()) {
        return
      }
      this.Mixins_$SubmitBefore()
      const data = this.Mixins_$GetDialogParams()
      delete data['_operate']
      const result = this.Mixins_$IsEdit
        ? await this.Mixins_UpdateApi.call(this.ApiObject, data)
        : await this.Mixins_AddApi.call(this.ApiObject, data)
      this.$message.success(result.message)
      this.Mixins_$DialogVisible = false
      this.SubmitSuccessCallback(result, data)
    },
    SubmitSuccessCallback(result, data) {
      this.Mixins_$SubmitAfter(result, data)
      this.Mixins_$Init()
    },
    // 获取提交参数
    Mixins_$GetDialogParams() {
      const data = this.$_parseRangeField({ ...this.DialogForm })
      return this.Mixins_GetFinalDialogParams(data)
    },
    // 删除
    async Mixins_$Del(obj, message = '删除') {
      await this.$confirm(`确认${message}?`, message)
      const result = await this.Mixins_DelApi.call(this.ApiObject, obj.id)
      this.Mixins_$Search()
      this.$message.success(result.message)
    },
    Mixins_$Reset_QueryParams() {
      this.QueryParams = this.$utils.reset(this.QueryParams)
      this.Mixins_$Reset_QueryParamsAfter()
    },
    Mixins_$Reset_QueryParamsAfter() {},
    /* 表单重置 */
    Mixins_$Reset() {
      this.DialogForm.id = undefined
      this.DialogForm = this.$utils.reset(this.DialogForm)
      this.Mixins_$ClearFormValidate()
      this.Mixins_ResetAfter()
    },
    Mixins_$ClearFormValidate() {
      const form = this.$refs['form']
      form && form.resetFields()
    },
    /* 扩展方法begin */
    // 和获取表格数据一起执行的方法
    Mixins_$InitExtra() {},
    // 获取table数据后，一般对处理请求成功后的数据
    Mixins_GetTableDataAfter() {},
    // 初始化之前调用方法，一般用于初始化下拉列表
    Mixins_InitBefore() { },
    // 校验查询条件
    Mixins_Validate_SearchParams() { return true },
    // 获取最终查询条件
    Mixins_GetFinalQueryParams(data) { return data },
    // 新增弹窗显示之前的回调
    Mixins_AddBefore() {},
    // 新增弹窗显示之后的回调
    Mixins_AddAfter() {},
    // 获取最终的编辑参数
    Mixins_GetFinalEditParams(data) { return { ...data } },
    // 编辑之前的回调
    Mixins_EditBefore() {},
    // 编辑之后的回调
    Mixins_EditAfter(res, finalEditParams) {},
    // 提交表单之前的自定义校验
    Mixins_$SubmitBeforeValidator() { return true },
    // 提交表单之前的回调
    Mixins_$SubmitBefore() { },
    // 提交表单之后的回调
    Mixins_$SubmitAfter() { },
    // 获取最终的提交参数
    Mixins_GetFinalDialogParams(data) { return data },
    // 重置弹窗之后的回调
    Mixins_ResetAfter() {}
    /* 扩展方法end */
  }
}
