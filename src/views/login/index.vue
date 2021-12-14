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
        <h3 class="title">CrazySOLO系统登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!--        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
      </el-form-item>

      <div style="float:left;">
        <el-checkbox v-model="loginForm.remenberme" label="记住我" />
        <span style="color:gray;font-size: 10px;line-height: 19px;margin:0px 10px;text-indent: 2px;">不是自己电脑不要勾选此项</span>
      </div>

      <div class="underlinetext" style="float:right;">
        <span style="margin:5px;" @click="handleRegister()">注册账号</span>
        <span @click="handleFindPassword()">忘记密码?</span>
      </div>
      <el-button :loading="loading" style="float:left;width:100%;margin-top:20px;" type="primary" @click.native.prevent="handleLogin">登录</el-button>
      <!-- <el-button type="warning" style="float:right;width:48%" @click.native.prevent="handleRegister">注册</el-button> -->

    </el-form>
    <Vcode :show="isShow" @success="success" @close="close" />

    <div class="footer_content_copyright">Copyright©2012-2022 重庆物鲸数字科技有限公司版权所有
      <a href="https://beian.miit.gov.cn/#/Integrated/index" rel="nofollow" target="_blank">备案号： 渝ICP备19011486号-1</a></div>
  </div>
</template>

<script>
import {
  validUsername
} from '@/utils/validate'
import Vcode from 'vue-puzzle-vcode'
// const ipconfig = require('../../ipconfig.js')
// const defaultSettings = require('../../settings.js')
export default {
  name: 'Login',
  components: {
    Vcode
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的手机号'))
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
        username: '',
        password: '',
        remenberme: true
      },
      loginRules: {
        username: [{
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
      this.$router.push({
        path: '/register'
      })
    },
    handleFindPassword() {
      this.$router.push({
        path: '/findpassword'
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isShow = true
        }
      })
    },
    // 服务器验证
    login() {
      console.log('this.redirect ', this.redirect)
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        console.log('登录成功')
        this.$router.push({
          path: this.redirect || '/'
        })
        this.loading = false
      }).catch((e) => {
        this.loading = false
        console.log('登录失败', e)
      })
    },
    // 通过验证
    success() {
      this.isShow = false
      this.login()
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

  $bg:#283443;
  $light_gray:#f0f0f0;
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
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  $bg:#000000;
  $dark_gray:#889aa4;
  $light_gray:#00A0D8;

  .underlinetext {
    color: #00A0D8;
    text-decoration: underline;
  }

  .underlinetext:hover {
    cursor: pointer;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px;
      margin: 0 auto;
      overflow: hidden;
      min-height: 95vh;
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
      line-height: 50px;
      position: absolute;
      font-size: 20px;
      padding: 0px 10px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .footer_content_copyright {
    display: flex;
    justify-content: center;
    color: gray;
    font-size: 10px;
    width: 80vw;
    margin: auto;
  }
</style>
