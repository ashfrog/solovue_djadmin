<template>
  <div class="grid-content">
    <div v-if="!showagreement" class="grid-content">
      <div class="title">申请材料</div>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <ElUpload :uploadurl="fronturl" text="上传身份证正面"></ElUpload>
        </el-col>
        <el-col :span="8">
          <ElUpload :uploadurl="backurl" text="上传身份证反面"></ElUpload>
        </el-col>
        <el-col :span="8">
          <ElUpload :uploadurl="busilesslicenseurl" text="上传营业执照"></ElUpload>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="downloadFile(confidentialurl,'保密承诺函.docx')" size="mini" type="text">下载协议</el-button>
      </el-row>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <ElUpload :uploadurl="securecyurl" text="上传协议"></ElUpload>
        </el-col>
      </el-row>
      <div class="title">经销商信息</div>
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
          <el-col :span="8">
            <el-form-item label="联系人" prop="legalperson">
              <el-input class="input" size="mini" v-model="userdealer.dealername"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="legalperson">
              <el-input class="input" size="mini" v-model="userdealer.telphone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公司地址" prop="companyaddress_areacode">
              <el-row>
                <el-col class="selectorgroup">
                  <PositionSelector v-model="userdealer.companyaddress_areacode"></PositionSelector>
                </el-col>
                <el-col :span="6">
                  <el-input class="input" size="mini" placeholder="详细地址" v-model="userdealer.companyaddressdetail"></el-input>
                </el-col>
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
    <UserAgreement v-if="showagreement" @accept="accept" @refuse="refuse"></UserAgreement>
  </div>
</template>

<script>
  import PositionSelector from '@/components/PositionSelector'
  import UserAgreement from '@/components/UserAgreement'
  import ElUpload from '@/components/ELUpload'
  import {downloadfile} from '@/utils/file'
  const ipconfig = require('@/ipconfig.js')
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
        confidentialurl: ipconfig.host + '/const/doc/保密承诺函.docx',
        hideadd: false,
        labelPosition: 'right',
        fronturl: process.env.VUE_APP_BASE_API + '/upload/uploadidentityfront',
        backurl: process.env.VUE_APP_BASE_API + '/upload/uploadidentityback',
        busilesslicenseurl: process.env.VUE_APP_BASE_API + '/upload/uploadbusinesslicense',
        securecyurl:process.env.VUE_APP_BASE_API+'/upload/uploadsecret',
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
      downloadFile(src,fileName){
        downloadfile(src,fileName)
      },
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
  @import "@/styles/orderstyle.scss";

  .uploadimg {
    display: flex;
    justify-content: center;
  }
</style>
