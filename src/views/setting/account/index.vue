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
          <el-form-item label="用户名：">
            <base-input v-model="QueryParams.account" placeholder="请输入用户账号" />
          </el-form-item>
          <el-form-item label="角色：">
            <base-select v-model="QueryParams.roles" placeholder="请选择用户角色" />
          </el-form-item>
          <el-form-item label="联系方式：">
            <base-input v-model="QueryParams.mobile" placeholder="请输入联系方式" />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
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
        <el-button type="danger" @click.stop="showPasswordFormDialog(scope.row)">
          重置密码
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
        <template #password>
          <el-form-item v-if="!DialogForm['id']" label="设置密码：" prop="password">
            <base-input
              v-model="DialogForm.password"
              type="password"
              autocomplete="new-password"
              placeholder="请输入密码,6-15位"
            />
          </el-form-item>
        </template>
        <template #confirmPassword>
          <el-form-item v-if="!DialogForm['id']" label="确认密码：" prop="confirmPassword">
            <base-input
              v-model="DialogForm.confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="请输入密码,6-15位"
            />
          </el-form-item>
        </template>
        <template #deptId>
          <el-form-item label="所属部门：" prop="deptId">
            <dept-select v-model="DialogForm.deptId" />
          </el-form-item>
        </template>
        <template #roles>
          <el-form-item label="选择角色：" prop="roles">
            <role-checkbox v-model="DialogForm.roles" />
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
    <base-dialog
      title="重置密码"
      :visible.sync="PasswordFormVisible"
      center
      @closed="resetPasswordForm"
    >
      <base-form
        ref="resetForm"
        :model="PasswordForm"
        :rules="PasswordFormRules"
        label-width="120px"
        @submit="resetPassword"
        @cancel="PasswordFormVisible = false"
      >
        <el-form-item label="设置密码：" prop="password">
          <base-input
            v-model="PasswordForm.password"
            type="password"
            autocomplete="new-password"
            placeholder="长度6-15位"
          />
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <base-input
            v-model="PasswordForm.confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="长度6-15位"
          />
        </el-form-item>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import RoleCheckbox from '../../components/CheckBox/RoleCheckbox'
import { validateUsername, validatePassword, validatePhoneOrNull } from '../../../utils/validate/validate-element'
import ApiObject from '../../../api/module/account/AccountSysUserApi'
import { STATUS as ACCOUNT_STATUS, SEX_CONSTANTS } from '../../../constants/module/AccountConstant'
import DeptSelect from '../../components/Select/DeptSelect'

export default {
  name: 'Account',
  components: { RoleCheckbox, DeptSelect },
  mixins: [Mixins],
  props: {},
  data() {
    const confirmPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.DialogForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const confirmResetPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.PasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
        { label: '登录账号', prop: 'account', placeholder: '请输入账号,6-15位' },
        { label: '设置密码', slot: 'password' },
        { label: '确认密码', slot: 'confirmPassword' },
        { label: '姓名', prop: 'name', placeholder: '请输入姓名' },
        { label: '手机号', prop: 'mobile', maxlength: 11, placeholder: '请输入手机号' },
        { label: '邮箱', prop: 'email', placeholder: '请输入邮箱' },
        { label: '性别', prop: 'sex', type: 'radio', options: this.$utils.toOptions(SEX_CONSTANTS) },
        { label: '选择角色', slot: 'roles' },
        { label: '是否启用', prop: 'status', type: 'radio', options: this.$utils.toOptions(ACCOUNT_STATUS) },
        { label: '备注', prop: 'remarks', maxlength: 200, type: 'textarea', placeholder: '请输入备注' }
      ],
      DialogForm: {
        account: '',
        password: '',
        name: '',
        mobile: '',
        email: '',
        birthday: '',
        sex: '',
        deptId: [],
        empCode: '',
        roles: [],
        titleCode: '',
        status: '1',
        titleName: ''
      },
      PasswordFormRules: {
        password: [
          { required: true, message: '6-15位', validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, validator: confirmResetPasswordRule }
        ]
      },
      DialogFormRules: {
        account: [
          { required: true, validator: validateUsername }
        ],
        deptId: [
          { required: true, message: '请选择所属部门' }
        ],
        password: [
          { required: true, message: '6-15位', validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, validator: confirmPasswordRule }
        ],
        name: [
          { required: true, message: '请输入姓名' }
        ],
        mobile: [{ validator: validatePhoneOrNull }],
        roles: [{ required: true, type: 'array', message: '请选择角色' }],
        status: [{ required: true, message: '请选择是否启用' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '用户账号', prop: 'account' },
        { label: '用户姓名', prop: 'name' },
        { label: '性别', prop: 'sex' },
        { label: '手机号', prop: 'mobile', maxlength: 11, placeholder: '请输入手机号' },
        { label: '角色', slot: 'roles' },
        { label: '邮箱', prop: 'email', placeholder: '请输入邮箱' },
        { label: '添加时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 240 }
      ],
      QueryParams: {
        account: '',
        name: '',
        deptName: ''
      }
    }
  },
  methods: {
    showPasswordFormDialog({ id }) {
      this.PasswordForm.id = id
      this.PasswordFormVisible = true
    },
    async resetPassword() {
      const data = this.PasswordForm
      delete data.confirmPassword
      const result = await ApiObject.resetPassword(data)
      this.PasswordFormVisible = false
      this.Mixins_$Init()
      this.$message.success(result.message)
    },
    resetPasswordForm() {
      this.PasswordForm = this.$utils.reset(this.PasswordForm)
      this.$nextTick(_ => {
        this.$refs['resetForm'].resetFields()
      })
    },
    Mixins_ResetAfter() {
      this.DialogForm.status = '1'
    },
    Mixins_GetFinalEditParams(data) {
      if (data.deptIds) {
        data.deptId = data.deptIds.split(',').map(String)
      } else {
        data.deptId = []
      }
      if (!data.roles) {
        data.roles = []
      }
      return data
    },
    Mixins_GetFinalDialogParams(data) {
      delete data.confirmPassword
      data.id && delete data.password
      data.deptIds = data.deptId.join(',')
      data.deptId = data.deptId.pop()
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
