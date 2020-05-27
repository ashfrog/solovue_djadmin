<template>
  <div>
    <el-upload
      ref="upload"
      action="http://localhost:8083/upload/uploadidentityfront"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="true"
      :limit="1"
      :with-credentials="true"
    >
      <div style="font-size:10px;color:red;">上传身份证正面</div>
    </el-upload>

    <el-upload
      ref="upload"
      action="http://localhost:8083/upload/uploadidentityback"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="true"
      :limit="1"
      :with-credentials="true"
    >
      <div style="font-size:10px;color:red;">上传身份证反面</div>
    </el-upload>

    <el-upload
      ref="upload"
      action="http://localhost:8083/upload/uploadbusinesslicense"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="true"
      :limit="1"
      :with-credentials="true"
    >
      <div style="font-size:10px;color:red;">上传营业执照</div>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
