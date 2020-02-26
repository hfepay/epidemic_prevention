// template.js
module.exports = {
  vueTemplate: ({ apiDir, apiName, name, Headers = '[]', DialogFormHeaders = '[]', DialogForm = '{}', QueryParamsHeaders = '[]' }) => {
    return `<template>
    <div class="hf-container">
      <!--table模板-->
      <base-table-layout
        :pageObj="Mixins_$PageObj"
        :headers="Headers"
        :data="Mixins_$TableData"
        @sizeChange="Mixins_$SizeChange"
        @currentChange="Mixins_$CurrentChange">
         <template #layout-search>
            <base-form
              :inline="true"
              :show-label="false"
              placeholder-type="search"
              :model.sync="QueryParams"
              :form-headers="QueryParamsHeaders"
              :show-default-foot="false"
            >
              <el-button  type="primary" @click="Mixins_$Search">
                查询
              </el-button>
            </base-form>
          </template>
          <template #layout-operate>
            <el-button  type="primary" @click="Mixins_$Add">新增</el-button>
          </template>
          <!--操作-->
          <template #operator="{scope}">
            <el-button  type="primary" @click.stop="Mixins_$Edit(scope.row)">编辑</el-button>
            <el-button  type="danger" @click.stop="Mixins_$Del(scope.row)">删除</el-button>
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
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false">
        </base-form>
    </base-dialog>
    </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '@/api/module/${apiDir}/${apiName}'
export default {
  name: '${name}',
  mixins: [Mixins],
  data() {
    return {
      /* 搜索条件表单表头 */
      QueryParamsHeaders: ${QueryParamsHeaders},
      /* 搜索条件 */
      QueryParams: {
        id: '',
        timeRange: '',
        status: ''
      },
      ApiObject: ApiObject,
      /* 弹窗表头 */
      DialogFormHeaders: ${DialogFormHeaders},
      /* 弹窗对象 */
      DialogForm: ${DialogForm},
      /* 校验规则 */
      dialogFormRules: {
        a: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: ${Headers}
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
`
  }
}
