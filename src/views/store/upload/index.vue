<template>
  <div class="components-container">
    <div class="editor-container">
      <dropzone
        id="myVueDropzone"
        ref="dropzonefun"
        url="http://117.78.27.73:8083/upload/upload"
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
// getFilenameBymd5
} from '@/api/storeitem'
import {
  getsuffix
  // readText
} from '@/utils/fileutils'
import Dropzone from '@/components/Dropzone'
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
      count: 0
    }
  },
  created() {

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
        // var that = this
        // readText(file).then(function(text) {
        //   console.log(text)
        //   console.log(file.name, that.count++)
        // })
      }

      // bmf.md5(
      //   file,
      //   (err, md5) => {
      //     if (err) {
      //       this.$message({
      //         message: 'MD5校验出错' + 'err:' + err,
      //         type: 'error'
      //       })
      //     }
      //     // dropzonecomp.removeFile(file)
      //     // getFilenameBymd5().then(response => {
      //     //   var server_filename = response.data.data
      //     //   if (server_filename == null) {
      //     //     console.log('新文件', response)
      //     //     file.filename = '新文件'
      //     //   } else {
      //     //     console.log('已存在文件', response)
      //     //     file.filename = server_filename
      //     //   }
      //     // })
      //     // console.log('md5 string:', md5)
      //     // console.log('file.md5', file.md5)
      //   },
      //   progress => {
      //     // console.log('progress number:', progress)
      //   },
      // )
      this.$message({
        message: 'Addfile success',
        type: 'success'
      })
    },
    dropzoneS(file) {
      // console.log('dropzoneS', file)
      this.$message({
        message: 'Upload success',
        type: 'success'
      })
    },
    dropzoneSend(file, xhr, formData) {
      // console.log('dropzoneSending', xhr)
    },
    dropzoneSuccessmultiple(file, error, xhr) {
      this.processQueue()
    },
    dropzoneR(file) {
      // console.log('dropzoneR', file)
      this.$message({
        message: 'Delete success',
        type: 'success'
      })
    },
    removeAllFiles() {
      dropzonecomp.dropzone.removeAllFiles(true)
      this.countarr.splice(0, this.countarr.length)
    },
    processQueue() {
      dropzonecomp.resetparallelUploads(this.countarr[0])
      console.log('剩余上传数量:', this.countarr.length)
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
