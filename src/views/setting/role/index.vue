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
      <template #layout-search>
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item label="角色名称：">
            <base-input v-model="QueryParams.name" placeholder="角色名称" />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template #layout-operate>
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
          删除
        </el-button>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysRoleApi'
import AESUtils from '../../../utils/security/AESUtils'

export default {
  name: 'Role',
  mixins: [Mixins],
  props: {},
  data() {
    return {
      QueryParamsHeaders: [
        { label: '角色名称', prop: 'roleName' }
      ],
      ApiObject: ApiObject,
      checkedKeys: [],
      treeOption: [],
      RoleDialogVisible: false,
      DialogFormRules: {
        name: [{ required: true, message: '必填项不能为空' }],
        authorityList: [
          {
            required: true, trigger: 'change', validator: (rule, value, callback) => {
              callback(this.getCheckedKeys().length > 0 ? '' : new Error('必填项不能为空'))
            }
          }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '角色名称', prop: 'name' },
        { label: '角色描述', prop: 'describle' },
        { label: '添加时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 180 }
      ],
      QueryParams: {
        roleName: ''
      }
    }
  },
  methods: {
    Mixins_$Add() {
      this.$router.push('/setting/add-role')
    },
    Mixins_$Edit(row) {
      this.$router.push(`/setting/edit-role/${AESUtils.encrypt(row.id)}`)
    }
  }
}
</script>
<style lang="scss">
  #hfRoles .el-tree-node__children .el-tree-node__children {
    display: flex;
    flex-wrap: wrap;
  }
</style>
