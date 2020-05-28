<template>
  <div>
    <div class="document">
      <el-row>
        <el-col :span="8">
          <el-upload ref="upload" action="http://localhost:8083/upload/uploadidentityfront" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="true" :limit="1"
            :with-credentials="true" :class="{hide:hideUpload}">
            <div style="font-size:10px;color:red;">上传身份证正面</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload ref="upload" action="http://localhost:8083/upload/uploadidentityback" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="true" :limit="1"
            :with-credentials="true">
            <div style="font-size:10px;color:red;">上传身份证反面</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload ref="upload" action="http://localhost:8083/upload/uploadbusinesslicense" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="true" :limit="1"
            :with-credentials="true">
            <div style="font-size:10px;color:red;">上传营业执照</div>
          </el-upload>
        </el-col>
      </el-row>

      <PositionSelector>1234</PositionSelector>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="经销区域">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法人代表">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
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
  export default {
    components: {
      PositionSelector
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
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
        console.log('submit!');
      }
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
