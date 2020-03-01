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
      <template slot="layout-search">
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item label="摄像头名称：">
            <base-input v-model="QueryParams.account" placeholder="请输入摄像头名称"/>
          </el-form-item>
          <el-form-item label="摄像头状态：">
            <base-select v-model="QueryParams.roles" placeholder="请选择摄像头状态"/>
          </el-form-item>
          <el-form-item label="添加时间：">
            <base-date-picker type="daterange"></base-date-picker>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <div class="operate-icon">
          <img class="iconImg" :src="icons.blue" alt="">
          总设备：4
        </div>
        <div class="operate-icon">
          <img class="iconImg" :src="icons.green" alt="">
          在线：4
        </div>
        <div class="operate-icon">
          <img class="iconImg" :src="icons.red" alt="">
          离线：0
        </div>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" @click="Mixins_$Add">
          新增摄像头
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
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
      custom-class="max-width"
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
import ApiObject from '../../../api/module/account/AccountSysUserApi'
import { blue, red, green } from '@/constants/module/imgaesConstants'

export default {
  name: 'Account',
  mixins: [Mixins],
  props: {},
  data() {
    return {
      ApiObject: ApiObject,
      organizationOptions: [],
      PasswordFormVisible: false,
      RoleDialogVisible: false,
      PasswordForm: {
        id: '',
        password: '',
        confirmPassword: ''
      },
      DialogFormHeader: [
        { label: '摄像头名称', prop: 'account' },
        { label: '安装位置', prop: 'account' },
        { label: '摄像头地址', prop: 'account' },
        { label: '备注', prop: 'remarks', rows: 5, maxlength: 200, type: 'textarea', placeholder: '请输入备注' }
      ],
      DialogForm: {
        account: ''
      },
      DialogFormRules: {
        account: [
          { required: true, message: '必填项不能为空' }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '摄像头名称', prop: 'account' },
        { label: '安装位置', prop: 'account' },
        { label: '摄像头地址', prop: 'account' },
        { label: '摄像头状态', prop: 'account' },
        { label: '添加时间', prop: 'account' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 240 }
      ],
      QueryParams: {}
    }
  },
  computed: {
    icons() {
      return {
        red, green, blue
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  $lineHeight: 25px;
  .operate-icon {
    display: flex;
    line-height: $lineHeight;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin: 0 10px;

    .iconImg {
      width: $lineHeight;
      height: $lineHeight;
      margin-right: 10px;
    }
  }
  /deep/ .max-width {
    max-width: 800px;
  }
</style>
