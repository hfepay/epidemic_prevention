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
          <el-form-item label="旅客姓名：">
            <base-input v-model="QueryParams.account" placeholder="请输入旅客姓名"/>
          </el-form-item>
          <el-form-item label="航班号：">
            <base-input v-model="QueryParams.account" placeholder="请输入航班号"/>
          </el-form-item>
          <el-form-item label="证件号：">
            <base-input v-model="QueryParams.account" placeholder="请输入证件号"/>
          </el-form-item>
          <el-form-item label="测量时间：">
            <base-date-picker type="daterange"></base-date-picker>
          </el-form-item>
          <el-form-item label="测量位置：">
            <base-select v-model="QueryParams.roles" placeholder="请选择测量位置"/>
          </el-form-item>
          <el-form-item label="体温状态：">
            <base-select v-model="QueryParams.roles" placeholder="请选择体温状态"/>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <div class="operate-icon">
          <img class="iconImg" :src="icons.blue" alt="">
          总人数：100
        </div>
        <div class="operate-icon">
          <img class="iconImg" :src="icons.green" alt="">
          正常：80
        </div>
        <div class="operate-icon">
          <img class="iconImg" :src="icons.red" alt="">
          异常：20
        </div>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" @click="Mixins_$Add">
          导出
        </el-button>
      </template>
      <template slot="status" slot-scope="{scope}">
        <span :class="{'font-warn': +scope.row.status===0, 'font-success': +scope.row.status===1}">{{tempStatus[scope.row.status]}}</span>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          详情
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
import { tempStatus } from '@/constants/module/status.constans'

export default {
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
        { label: '旅客姓名', prop: 'account', type: 'text' },
        { label: '证件类别', prop: 'account', type: 'text' },
        { label: '证件号', prop: 'account', type: 'text' },
        { label: '航班号', prop: 'account', type: 'text' },
        { label: '测量位置', prop: 'account', type: 'text' },
        { label: '测量体温', prop: 'account', type: 'text' },
        { label: '体温状态', prop: 'status', type: 'text' },
        { label: '测量时间', prop: 'createTime', type: 'text' }
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
        { label: '旅客姓名', prop: 'account' },
        { label: '证件类别', prop: 'account' },
        { label: '证件号', prop: 'account' },
        { label: '航班号', prop: 'account' },
        { label: '测量位置', prop: 'account' },
        { label: '测量体温', prop: 'account' },
        { label: '体温状态', slot: 'status' },
        { label: '测量时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 120 }
      ],
      QueryParams: {}
    }
  },
  computed: {
    icons() {
      return {
        red, green, blue
      }
    },
    tempStatus: () => tempStatus
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

  .font-success {
    color: rgba(28, 155, 7, 1);
  }

  .font-warn {
    color: #D60000;
  }

  /deep/ .max-width {
    max-width: 800px;
  }
</style>
