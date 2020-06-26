<template>
  <div>
    <div class="label">注: 红色*为必填</div>
    <div class="title">
      <label>经销商信息</label>
    </div>
    <div class="divborder">
      <el-row>
        <el-col :span="8" class="uploadimg">
          <ElUpload :uploadurl="fronturl" text="上传身份证正面"></ElUpload>
        </el-col>
        <el-col :span="8" class="uploadimg">
          <ElUpload :uploadurl="backurl" text="上传身份证反面"></ElUpload>
        </el-col>
        <el-col :span="8" class="uploadimg">
          <ElUpload :uploadurl="busilesslicenseurl" text="上传营业执照"></ElUpload>
        </el-col>
      </el-row>
      <el-form :label-position="labelPosition" ref="userdealer" :rules="validrules" :model="userdealer" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="经销范围" prop="agencyarea_code">
              <PositionSelector v-model="userdealer.agencyarea_code"></PositionSelector>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人代表" prop="legalperson">
              <el-input class="input" size="mini" v-model="userdealer.legalperson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称" prop="companyname">
              <el-input class="input" size="mini" v-model="userdealer.companyname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司地址" prop="companyaddress_areacode">
              <el-row>
                <el-col :span="8"><PositionSelector v-model="userdealer.companyaddress_areacode"></PositionSelector></el-col>
                <el-col :span="6" ><el-input class="input" size="mini" placeholder="详细地址" v-model="userdealer.companyaddressdetail"></el-input></el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <label>发票信息</label>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号" prop="taxcode">
              <el-input class="input" size="mini" v-model="userdealer.taxcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行全称" prop="bankname">
              <el-input class="input" size="mini" v-model="userdealer.bankname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行账号" prop="bankaccount">
              <el-input class="input" size="mini" v-model="userdealer.bankaccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行地址" prop="bankaddr">
              <el-input class="input" size="mini" v-model="userdealer.bankaddr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="companytel">
              <el-input class="input" size="mini" v-model="userdealer.companytel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <UserAgreement v-if="showagreement" @accept="accept" @refuse="refuse"></UserAgreement> -->
  </div>
</template>

<script>
  import PositionSelector from '@/components/PositionSelector'
  import UserAgreement from '@/components/UserAgreement'
  import ElUpload from '@/components/ELUpload'
  import {
    requestdealer
  } from '@/api/userdealer.js'
  export default {
    components: {
      PositionSelector,
      UserAgreement,
      ElUpload
    },
    mounted() {},
    data() {
      return {
        hideadd:false,
        labelPosition: 'right',
        fronturl: process.env.VUE_APP_BASE_API + '/upload/uploadidentityfront',
        backurl: process.env.VUE_APP_BASE_API + '/upload/uploadidentityback',
        busilesslicenseurl: process.env.VUE_APP_BASE_API + '/upload/uploadbusinesslicense',
        userdealer: {
          agencyarea_code: '',
          legalperson: '',
          companyname: '',
          companyaddress_areacode: '',
          companyaddressdetail: '',
          taxcode: '',
          bankname: '',
          bankaccount: '',
          bankaddr: '',
          companytel: '',
        },
        showagreement: true,
        validrules: {
          agencyarea_code: [{
            required: true,
            message: '请选择经销区域',
            trigger: 'change'
          }],
          legalperson: [{
            required: true,
            message: '请填写法人代表',
            trigger: 'change'
          }],
          companyname: [{
            required: true,
            message: '请填写公司名称',
            trigger: 'change'
          }],
          companyaddress_areacode: [{
            required: true,
            message: '请选择公司地址',
            trigger: 'change'
          }],
          bankaddr: [{
            required: true,
            message: '请填写开户行地址',
            trigger: 'change'
          }],
          taxcode: [{
            required: true,
            message: '请填写纳税人识别号',
            trigger: 'change'
          }],
          bankname: [{
            required: true,
            message: '请填写开户行名称',
            trigger: 'change'
          }],
          bankaccount: [{
            required: true,
            message: '请填写开户行账户',
            trigger: 'change'
          }],
          companytel: [{
            required: true,
            message: '请填写电话',
            trigger: 'change'
          }],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['userdealer'].validate((valid) => {
          if (valid) {
            requestdealer(this.userdealer).then(result => {
              if (result.status === 'success') {
                this.$notify({
                  title: '通知消息',
                  message: '提交成功',
                  type: 'success'
                })
              }
              console.log("提交成功", result)
            })
          } else {
            return false;
          }
        });
      },
      accept() {
        console.log("accept")
        this.showagreement = false
      },
      refuse() {
        this.showagreement = false
        this.$router.push({
          path: '/dashboard'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .uoloadSty .el-upload--picture-card {
    width: 110px;
    height: 110px;
    line-height: 110px;
  }

  .disUoloadSty .el-upload--picture-card {
    display: none;
    /* 上传按钮隐藏 */
  }

  .label {
    font-family: "Arial"; //,Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: red;
    font-size: 10px;
  }

  .divborder {
    border: 1px solid #ECECEC;
  }

  .title {
    background: #F5F7F6;
    color: #4975C0;
    border-left: 5px solid #4975C0;
    text-indent: 2px;
    font-size: 14px;
    padding: 6px;
    font-weight: lighter;
  }

  .uploadimg {
    display: flex;
    justify-content: center;
  }
</style>
