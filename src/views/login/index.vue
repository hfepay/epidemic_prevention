<template>
  <div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" size="large" class="login-form">
        <div class="login-logo"></div>
        <div class="title" style="font-weight: bold">WELCOME</div>
        <div class="title">欢迎您，<br>使用黔易订订餐管理系统</div>
        <br>
        <el-form-item label="" prop="account">
          <base-input v-model.trim="loginForm.account" placeholder="账号" prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item label="" prop="password">
          <base-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-s-cooperation"
            @keyup.enter.native="handleLogin"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            round
            size="medium"
            style="margin: 0 5%; width: 90%"
            @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      verifyCodeSrc: process.env.VUE_APP_BASE_API + '/verify/code/admin/bean/',
      loginForm: {
        account: '',
        password: '',
        code_token: this.getRandom(),
        code_token_value: ''
      },
      loginRules: {
        account: [{ required: true, message: '账号不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        code_token_value: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['projectName'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCode() {
      this.loginForm.code_token = this.getRandom()
    },
    getRandom() {
      return Math.random().toString(32).slice(2, 8)
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            await this.$store.dispatch('Login', this.loginForm)
            await this.$store.dispatch('GetMenu', this.loginForm)
            this.loading = false
            this.$router.push({ path: '/' })
          } catch (e) {
            this.getCode()
            this.loginForm.code_token_value = ''
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $font-color: #1A99FF;
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    display: flex;
    align-items: center;
    position: fixed;
    height: 100%;
    width: 100%;

    .login-left, .login-right {
      position: relative;
      height: 100vh;
    }

    .login-left {
      width: 65vw;
      background-size: 60% auto;
      background: rgba(247, 223, 198, 1) url("./../../assets/image/loginL.png") no-repeat center;
    }

    .login-right {
      width: 35vw;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .login-logo {
        height: 133px;
        background: url("./../../assets/image/logo.png") no-repeat left;
        margin-bottom: 60px;
        background-size: auto 100%;
      }
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 550px;
      max-width: 100%;
      padding: 0 40px;
      margin: 0 auto;
      background-color: white;
      border-radius: 10px;
    }

    .title {
      font-size: 35px;
      margin: 0;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 50px;
    }
  }
</style>
