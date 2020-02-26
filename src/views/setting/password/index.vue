<template>
  <base-form :model="form" :show-cancel="false" :rules="formRules" label-width="120px" style="width: 600px" @submit="submit">
    <el-form-item label="登录账号：">
      {{ userInfo.account }}
    </el-form-item>
    <el-form-item label="原密码：" prop="oldPassword">
      <base-input v-model="form.oldPassword" type="password" placeholder="请输入原密码" />
    </el-form-item>
    <el-form-item label="新密码：" prop="newPassword">
      <base-input v-model="form.newPassword" type="password" placeholder="请输入新密码" autocomplete="new-password" />
    </el-form-item>
    <el-form-item label="确认密码：" prop="confirmPassword">
      <base-input v-model="form.confirmPassword" type="password" placeholder="请输入新密码" autocomplete="new-password" />
    </el-form-item>
  </base-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatePassword } from '../../../utils/validate/validate-element'
import ApiObject from '../../../api/module/account/AccountSysUserApi'
export default {
  name: 'Password',
  data() {
    const confirmPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ApiObject: ApiObject,
      formRules: {
        oldPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: confirmPasswordRule, trigger: 'blur' }]
      },
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async submit() {
      const { oldPassword, newPassword } = this.form
      this.result = await this.ApiObject.updatePassword({ oldPassword, newPassword })
      this.$confirm(
        '修改密码成功',
        '修改密码',
        {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        }
      ).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
