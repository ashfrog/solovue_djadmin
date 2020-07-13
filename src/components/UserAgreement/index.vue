<template>
  <div >
    <div class="document" >
      <pdf v-for="i in numPages" :key="i" :src="src" :page="i" style="display: inline-block; width: 100%"></pdf>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="centerconcent">
          <el-checkbox v-model="checked">已阅读并同意接受上述协议</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <div style="display:flex;justify-content: center;align-items:center">
      <el-button type="primary" @click="accept">接受</el-button>
      <el-button type="primary" @click="refuse">拒绝</el-button>
    </div>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  import {
    Loading
  } from 'element-ui';
  const ipconfig = require('@/ipconfig.js')
  console.log('import')
  let loadingTask;
  export default {
    components: {
      pdf
    },
    name: 'UserAgreement',
    model: {},
    created() {
      console.log('created')
    },
    data() {
      return {
        src: loadingTask,
        dialogVisible: true,
        numPages: undefined,
        checked: false
      }
    },
    mounted() {
      let loadingInstance1 = Loading.service({
        fullscreen: true
      });
      setTimeout(() => {
        loadingInstance1.close()
      }, 500);
      loadingTask = pdf.createLoadingTask({
        url: ipconfig.host + '/document/pdf/用户协议.pdf',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      this.src = loadingTask
      console.log('mounted')
      this.src.promise.then(pdf => {
        console.log('pdf:' + pdf.numPages)
        this.numPages = pdf.numPages;
        loadingInstance1.close()
      });
    },
    methods: {
      accept() {
        if (this.checked) {
          this.$emit('accept')
        } else {
          this.$alert('请先勾选协议', '警告', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        }
      },
      refuse() {
        this.$emit('refuse')
      }
    },

  }
</script>

<style scoped>
  .document {
    height:800px;
    margin: 0 auto;
    border: 1px dashed #6EB6FF;
    overflow-y:scroll
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

  .centerconcent {
    display: flex;
    justify-content: center;
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

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
