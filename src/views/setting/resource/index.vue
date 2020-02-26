<template>
  <div class="hf-container">
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      row-key="id"
      :pagination="Mixins_Pagination"
      :data="Mixins_$TableData"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template #layout-operate>
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <!--操作-->
      <template #operator="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" @click.stop="Mixins_$Del(scope.row)">
          删除
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      :title="DialogForm['id']?'修改':'新增'"
      :visible.sync="Mixins_$DialogVisible"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        ref="form"
        :model.sync="DialogForm"
        :form-headers="DialogFormHeaders"
        :rules="dialogFormRules"
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      />
    </base-dialog>
  </div>
</template>

<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/beAccount/BeAccountAuthorityApi'
import toTreeData from '../../../utils/tree'
export default {
  name: 'Resource',
  mixins: [Mixins],
  data() {
    return {
      Mixins_Pagination: false,
      /* 搜索条件表单表头 */
      QueryParamsHeaders: [],
      /* 搜索条件 */
      QueryParams: {},
      ApiObject: ApiObject,
      /* 弹窗表头 */
      DialogFormHeaders: [
        { label: 'id', prop: 'id' },
        { label: '父id', prop: 'pid' },
        { label: '名称', prop: 'name' },
        { label: '类型', prop: 'type', type: 'select', options: [
          { label: '按钮', value: 'button' },
          { label: '页面', value: 'link' }
        ] },
        { label: '排序', prop: 'orderNum' },
        { label: '请求方式', prop: 'method', type: 'select', options: [
          { label: 'get', value: 'get' },
          { label: 'post', value: 'post' },
          { label: 'delete', value: 'delete' },
          { label: 'put', value: 'put' }
        ] },
        { label: '路径', prop: 'url' },
        { label: '路由', prop: 'router' }
      ],
      /* 弹窗对象 */
      DialogForm: {
        id: '',
        pid: '',
        name: '',
        orderNum: '',
        url: '',
        method: '',
        router: ''
      },
      /* 校验规则 */
      dialogFormRules: {
        id: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        name: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        orderNum: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        url: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        method: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        router: [{ required: true, message: '必填项不能为空', trigger: 'change' }]
      },
      Headers: [
        { label: 'id', prop: 'id' },
        { label: '名称', prop: 'name' },
        { label: '类型', prop: 'type' },
        { label: '路径', prop: 'url' },
        { label: '请求方式', prop: 'method' },
        { label: '路由', prop: 'router' },
        { label: '排序', prop: 'orderNum' },
        { label: '操作', slot: 'operator' }
      ]
    }
  },
  computed: {
    Mixins_ListApi() { return this.ApiObject.getMenu }
  },
  methods: {
    Mixins_GetFinalTableData(data) {
      return toTreeData(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
