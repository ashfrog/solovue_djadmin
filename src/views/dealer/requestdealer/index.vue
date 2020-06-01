<template>
  <div>
    <div class="document">
      <el-row>
        <el-col :span="8">
          <el-upload action="/prod-api/upload/uploadidentityfront" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :auto-upload="true" :limit="1" :with-credentials="true" :class="{hide:hideUpload}">
            <div style="font-size:10px;color:red;">上传身份证正面</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload action="/prod-api/upload/uploadidentityback" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :auto-upload="true" :limit="1" :with-credentials="true">
            <div style="font-size:10px;color:red;">上传身份证反面</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload action="/prod-api/upload/uploadbusinesslicense" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :auto-upload="true" :limit="1" :with-credentials="true">
            <div style="font-size:10px;color:red;">上传营业执照</div>
          </el-upload>
        </el-col>
      </el-row>



      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <el-form ref="form" :model="userdealer" label-width="80px">
        <el-form-item label="经销区域">
          <PositionSelector v-model="userdealer.agencyarea_code"></PositionSelector>
        </el-form-item>
        <el-form-item label="法人代表">
          <el-input size="mini" v-model="userdealer.legalperson"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input size="mini" v-model="userdealer.companyname"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <PositionSelector v-model="userdealer.companyaddress_areacode"></PositionSelector>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input size="mini" v-model="userdealer.companyaddressdetail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import PositionSelector from '@/components/PositionSelector'
  import {
    requestdealer
  } from '@/api/userdealer.js'

  export default {
    components: {
      PositionSelector
    },
    mounted() {

    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: false,
        userdealer: {
          agencyarea_code: '',
          legalperson: '',
          companyname: '',
          companyaddress_areacode: '',
          companyaddressdetail: ''
        },
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      onSubmit() {
        console.log(this.userdealer)
        requestdealer(this.userdealer).then(result => {
          if (result.status === 'success') {
            this.$notify({
              title: '通知消息',
              message: '提交成功',
              type: 'success'
            })
          }
          console.log("申请成功", result)
        })
      },
      agencyAreacodeChange(areacode) {
        console.log('地区:::', this.userdealer)
      },
    }
  }
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }


  .document {
    width: 60%;
    margin: 0 auto;
    border: 1px dashed #6EB6FF;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
