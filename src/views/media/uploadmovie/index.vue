<template>
  <div class="components-container">
    <div class="editor-container">
      <dropzone
        id="myVueDropzone"
        ref="dropzonefun"
        :url="uploadurl"
        @dropzone-fileAdded="dropzoneA"
        @dropzone-removedFile="dropzoneR"
        @dropzone-success="dropzoneS"
        @dropzone-sending="dropzoneSend"
        @dropzone-successmultiple="dropzoneSuccessmultiple"
      />
    </div>
    <div class="btn-row">
      <div>
        <el-button type="primary" @click="processQueue">确认上传</el-button>
      </div>
      <div style="width:2%" />
      <div>
        <el-button type="primary" @click="removeAllFiles">清空文件</el-button>
      </div>
    </div>
  </div>
</template>
<script>

import {
  getsuffix
  // readText
} from '@/utils/fileutils'
import Dropzone from '@/components/Dropzone'
const ipconfig = require('@/ipconfig.js')
// import BMF from 'browser-md5-file'
// const bmf = new BMF()
var dropzonecomp
export default {
  name: 'DropzoneDemo',
  components: {
    Dropzone
  },
  data: function() {
    return {
      countarr: [],
      count: 0,
      uploadurl: process.env.VUE_APP_BASE_API + '/uploadad/upload'
    }
  },
  created() {
    console.log('uploadurl:', this.uploadurl)
  },
  mounted() {
    dropzonecomp = this.$refs.dropzonefun
  },
  methods: {
    dropzoneA(file) {
      if (file.name === 'Thumbs.db') {
        dropzonecomp.removeFile(file)
      }
      var suffix = getsuffix(file.name)
      this.count++
      if (suffix === 'json') {
        this.countarr.push(this.count)
        this.count = 0
        console.log(this.countarr)
      }
    },
    dropzoneS(file) {
      // console.log('dropzoneS', file)

    },
    dropzoneSend(file, xhr, formData) {
      // console.log('dropzoneSending', xhr)
    },
    dropzoneSuccessmultiple(file, error, xhr) {
      this.processQueue()
      this.$notify({
        title: '通知消息',
        message: '上传成功',
        type: 'success'
      })
    },
    dropzoneR(file) {
      // console.log('dropzoneR', file)
    },
    removeAllFiles() {
      dropzonecomp.dropzone.removeAllFiles(true)
      this.countarr.splice(0, this.countarr.length)
    },
    processQueue() {
      dropzonecomp.resetparallelUploads(this.countarr[0])
      console.log('剩余上传数量:', this.countarr.length)
      this.$message({
        message: '剩余上传数量:' + this.countarr.length,
        type: 'success'
      })
      this.countarr.splice(0, 1)
      dropzonecomp.dropzone.processQueue()
    }

  }
}
</script>

<style scoped>
  .btn-row{
    display:flex;
    flex-direction: row;
    justify-content: center;
  }

  .btnstyle {
    width:100px;
    height:30px;
    line-height: 30px;
  }
</style>
