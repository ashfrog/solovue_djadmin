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
        <el-input
          ref="telphone"
          v-model="loginForm.telphone"
          placeholder="请输入手机号"
          name="telphone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          ref="smscode"
          v-model="loginForm.smscode"
          placeholder="输入短信验证码"
          name="smscode"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
        <el-button
          :disabled="count>0"
          type="primary"
          round
          size="mini"
          style="position:absolute;display:inline-block;right:2px;top:6px;"
          @click.native.prevent="requestsmscode"
        >{{ count>0?count+'秒后获取':'点击获取' }}</el-button>
      </el-form-item>

      <el-form-item prop="password">
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
      </el-form-item>
      <div class="underlinetext" style="float:right;" @click="toLogin()">已有账号，直接登录></div>
      <el-button :loading="loading" style="width:100%;margin-top:20px;" type="primary" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>
    <Vcode :show="isShow" @success="success" @close="close" />
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
import Vcode from 'vue-puzzle-vcode'
export default {
  name: 'Login',
  components: {
    Vcode
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码至少8位'))
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
      timer: null,
      isShow: false // 验证码模态框是否出现
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
          register(this.loginForm.telphone, this.loginForm.password, this.loginForm.smscode, 'RegisterCode').then(
            (result) => {
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
      this.isShow = true
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
    },
    // 通过验证
    success() {
      this.isShow = false
      requestsmscode(this.loginForm.telphone, 'RegisterCode').then((result) => {
        this.$message({
          type: 'success',
          message: result.data
        })
        this.countdown()
      })
    },
    // 关闭模态框
    close() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#000;
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

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;

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

  $dark_gray:#889aa4;
  $light_gray:#00A0D8;

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
      color: #00A0D8;
      // text-decoration: underline;
    }

    .underlinetext:hover {
      cursor: pointer;
    }
  }
</style>
