<template>
  <div>
    <base-table-layout
      ref="table"
      :key="tableKey"
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      row-key="id"
      :load="load"
      lazy
      :tree-props="{hasChildren: 'hasChildren'}"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-search">
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item label="一级部门简称：">
            <base-input v-model="QueryParams.simpleName" placeholder="一级部门简称" />
          </el-form-item>
          <el-form-item label="一级部门全称：">
            <base-input v-model="QueryParams.fullName" placeholder="一级部门全称" />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增一级部门
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="AddChild(scope.row)">
          新增下级部门
        </el-button>
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
      width="530px"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        ref="form"
        :model="DialogForm"
        :rules="DialogFormRules"
        :form-headers="DialogFormHeaders"
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template v-if="isChildren" slot="ParentName">
          <el-form-item label="上级部门简称：" prop="ParentName">
            <base-input v-model="DialogForm.ParentName" disabled />
          </el-form-item>
        </template>
        <template slot="sortNum">
          <el-form-item label="部门排序号：" prop="sortNum">
            <base-input v-model="DialogForm.sortNum" type="number" />
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysDeptApi'
import { menuStatus, zeroOrOneStatus } from '@/constants/module/status.constans'

export default {
  mixins: [Mixins],
  data() {
    return {
      tableKey: 0,
      ApiObject,
      Mixins_$TableData: [],
      // 是否是新增子节点
      isChildren: false,
      DialogForm: {
        simpleName: '',
        fullName: '',
        sortNum: ''
      },
      DialogFormRules: {
        simpleName: [
          { required: true, trigger: 'blur', message: '请输入部门简称' }
        ],
        fullName: [
          { required: true, message: '请输入部门全称' }
        ],
        sortNum: [
          { required: true, message: '请输入排序号' }
        ]
      },
      describle: '',
      DialogFormHeaders: [
        { label: '上级部门简称', slot: 'ParentName' },
        { label: '简称', prop: 'simpleName' },
        { label: '全称', prop: 'fullName' },
        { label: '部门排序号', slot: 'sortNum' },
        { label: '备注', prop: 'describle', type: 'textarea', maxlength: 200 }
      ],
      Headers: [
        // { type: 'index', label: '序号' },
        { label: '简称', prop: 'simpleName', align: 'left' },
        { label: '全称', prop: 'fullName' },
        { label: '排序', prop: 'sortNum' },
        { label: '备注', prop: 'describle' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 300 }
      ]
    }
  },
  computed: {
    menuStatus() {
      return menuStatus
    },
    zeroOrOneStatus() {
      return zeroOrOneStatus
    }
  },
  methods: {
    Mixins_GetTableDataAfter(data) {
      this.tableKey++
    },
    Mixins_ResetAfter() {
      this.isChildren = false
    },
    // 添加下级部门
    AddChild(row) {
      this.isChildren = true
      this.DialogForm.ParentName = row.simpleName
      this.DialogForm.pid = row.id
      this.Mixins_AddBefore()
      this.Mixins_$DialogVisible = true
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.ADD)
      this.Mixins_AddAfter()
    },
    // 加载展开节点的数据
    async load(tree, treeNode, resolve) {
      const res = await ApiObject.customize_get(`/findListByPid/${tree.id}`)
      resolve(res.data)
    }
  }
}
</script>
