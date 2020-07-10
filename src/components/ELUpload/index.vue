<template>
  <div>
    <div style="display:flex;flex-direction:row">
      <el-upload  :class="{disUoloadSty:hideadd}"  :action="uploadurl" list-type="picture" :on-preview="handlePictureCardPreview"
        :on-change="handleChange" :on-remove="handleRemove" :auto-upload="true" :limit="1" :with-credentials="true">
        <el-button size="small" type="text">{{text}}</el-button>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ELUpload',
    props: {
      uploadurl: {
        type: String,
      },
      text: {
        type: String,
        default: '点击上传'
      },
      imgsrc: {
        type: String
      }
    },
    created() {},
    data() {
      return {
        hideadd: false,
        dialogVisible: false,
        dialogImageUrl: ''
      }
    },
    methods: {
      UploadUrl: function() {
        return this.uploadurl;
      },
      handleRemove(file, fileList) {
        console.log('remove', file, fileList.length)
        if (fileList.length == 0) {
          this.hideadd = false
        }
      },
      handleChange(file, fileList) {
        console.log('change', file, fileList.length)
        if (fileList.length > 0) {
          this.hideadd = true
          console.log("hidden")
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
    }
  }
</script>

<style>
  .disUoloadSty .el-upload--picture-card {
    display: none;
    /* 上传按钮隐藏 */
  }
</style>
