<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">CrazySOLO注册</h3>
      </div>

      <el-form-item prop="telphone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="telphone"
          v-model="loginForm.telphone"
          placeholder="请输入手机号"
          name="telphone"
          type="text"
          tabindex="1"
          auto-complete="on"
          style="width:65%;display:inline-block"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="smscode"
          v-model="loginForm.smscode"
          placeholder="输入短信验证码"
          name="smscode"
          type="text"
          tabindex="1"
          auto-complete="on"
          style="width:65%;display:inline-block"
        />
        <el-button :disabled="count>0" type="warning" round size="mini" style="position:absolute;display:inline-block;right:0;top:10px;" @click.native.prevent="requestsmscode">{{count>0?count+'秒后获取':'点击获取'}}</el-button>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="输入6-18位数字或字母为密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="underlinetext" style="float:right;" @click="toLogin()">去登录?</div>
      <el-button :loading="loading" style="width:100%;margin-top:20px;" type="warning" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import {
  validUsername
} from '@/utils/validate'
import {
  register,
  requestsmscode
} from '@/api/userdealer.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        telphone: '',
        password: '',
        smscode: ''
      },
      loginRules: {
        telphone: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      count: '',
      show: true,
      timer: null
    }
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          register(this.loginForm.telphone, this.loginForm.password, this.loginForm.smscode, 'register').then((result) => {
            this.$router.push({
              path: '/login'
            })
            this.$message({
              type: 'success',
              message: result.data
            })
          })
        }
      })
    },
    requestsmscode() {
      requestsmscode(this.loginForm.telphone, 'register').then((result) => {
        this.$message({
          type: 'success',
          message: result.data
        })
        this.countdown()
      })
    },

    countdown() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            this.count = ''
          }
        }, 1000)
      }
    },
    toLogin() {
      this.$router.push({
        path: '/login'
      })
    }
    // handleRegister() {
    //   this.$refs.loginForm.validate(valid => {
    //     // if (true) {
    //     console.log('this.redirect ', this.redirect)
    //     this.loading = true
    //     this.$store.dispatch('user/login', this.loginForm).then(() => {
    //       console.log('登录')
    //       this.$router.push({
    //         path: this.redirect || '/'
    //       })
    //       this.loading = false
    //     }).catch((e) => {
    //       this.loading = false
    //       console.log('登录失败', e)
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .underlinetext {
      color: #E6A23C;
      text-decoration: underline;
    }

    .underlinetext:hover {
      cursor: pointer;
    }
  }
</style>
