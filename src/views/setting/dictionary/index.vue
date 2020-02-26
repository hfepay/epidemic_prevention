<template>
  <div>
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
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
        :model="DialogForm"
        :form-headers="DialogFormHeader"
        :rules="DialogFormRules"
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeConstantApi'

export default {
  name: 'Constant',
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '常量Key', prop: 'itemKey' },
        { label: '常量值', prop: 'itemValue' },
        { label: '描叙', prop: 'description', type: 'textarea' }
      ],
      DialogForm: {},
      DialogFormRules: {
        itemKey: [{ required: true, message: '必填值不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '常量Key', prop: 'itemKey' },
        { label: '常量值', prop: 'itemValue' },
        { label: '描叙', prop: 'description' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 180 }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
