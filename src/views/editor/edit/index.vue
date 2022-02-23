<template>
  <div class="app-container">

    <el-row :gutter="20">
      <el-col :span="1"><div class="grid-content bg-purple" /><el-tag size="small" type="success">名称</el-tag></el-col>
      <el-col :span="6"><div class="grid-content bg-purple" /><el-input v-model="editordata.name" size="mini" @change="updateEditordata()" /></el-col>
      <el-col :span="1"><div class="grid-content bg-purple" /><el-tag size="small" type="success">关键字</el-tag></el-col>
      <el-col :span="6"><div class="grid-content bg-purple" /><el-input v-model="editordata.keywords" size="mini" @change="updateEditordata()" /></el-col>
    </el-row>
    <ElUpload :uploadurl="uploadimgurl" :objdata="editordata" text="上传缩略图" />
    <el-button type="text" @click="saveEditorData(editordata,wallitemdata)">保存模板</el-button>
    <el-button type="text" @click="pageBack()">返回</el-button>
  </div>
</template>

<script>
import { listself, getwallitemdata, updateeditor, save, createeditor, updateeditordata } from '@/api/editor'
import ElUpload from '@/components/ELUpload'
// import { weather_mini } from '@/api/weather'
// import { formatTime } from '../../../utils'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { ElUpload },
  data() {
    return {
      uploadimgurl: process.env.VUE_APP_BASE_API + '/itemdatastorage/upload', // 上传缩略图
      // uploadimgurl: 'http://localhost:8085' + '/itemdatastorage/upload', // 上传缩略图
      editordata: { // 模板列表项
        id: 33,
        jsonpath: '202202149992aa35a00d4668972917365dad3418.json',
        keywords: null,
        name: null,
        publicdata: true,
        state: 0,
        thumbimg: null,
        updatetime: '2022-02-14T03:27:28.000+0000',
        userid: 58
      },
      wallitemdata: {
        'wallsize': {
          'width': 1920,
          'height': 1080
        },
        'itemdatas': [
          {
            'id': 0,
            'size': {
              'left': 1420,
              'top': 580,
              'width': 500,
              'height': 500,
              'background': '#ffffff',
              'color': '#000000'
            },
            'title': [
              {
                'left': 0,
                'top': 0,
                'width': 500,
                'height': 50,
                'background': '#000000',
                'color': '#ffffff'
              },
              {
                'left': 0,
                'top': 50,
                'width': 500,
                'height': 50,
                'background': '#000000',
                'color': '#ffffff'
              }
            ],
            'img': [
              {
                'left': 0,
                'top': 50,
                'width': 500,
                'height': 200
              },
              {
                'left': 0,
                'top': 250,
                'width': 500,
                'height': 200
              }
            ],
            'web': [
              {
                'left': 0,
                'top': 250,
                'width': 500,
                'height': 250
              },
              {
                'left': 0,
                'top': 250,
                'width': 500,
                'height': 250
              }
            ],
            'litpng': [
              {
                'left': 0,
                'top': 80,
                'width': 5,
                'height': 5,
                'src': 'abc.png'
              }
            ]
          },
          {
            'id': 1,
            'size': {
              'left': 600,
              'top': 100,
              'width': 500,
              'height': 500,
              'background': '#ffffff',
              'color': '#000000'
            },
            'title': [
              {
                'left': 0,
                'top': 0,
                'width': 500,
                'height': 50,
                'background': '#000000',
                'color': '#ffffff'
              }
            ],
            'img': [
              {
                'left': 0,
                'top': 50,
                'width': 500,
                'height': 200
              }
            ],
            'web': [
              {
                'left': 0,
                'top': 250,
                'width': 500,
                'height': 250
              }
            ],
            'litpng': [
              {
                'left': 0,
                'top': 80,
                'width': 5,
                'height': 5,
                'src': 'abc.png'
              }
            ]
          }
        ]
      },
      editorlist: [// 模板列表
        {
          id: 20,
          jsonpath: '202202088dfa6ed227e7472ea091bcb975b44553.json',
          keywords: null,
          name: null,
          publicdata: 1,
          state: 1,
          thumbimg: null,
          updatetime: '2022-02-10T05:39:46.000+0000',
          userid: 58
        }
      ]
    }
  },
  created() {
    if (this.$route.query && this.$route.query.wallitem) {
      this.editordata = JSON.parse(this.$route.query.wallitem)
      getwallitemdata(this.editordata.id).then((res) => {
        console.log('wallitemdata', res)
      })
    }
  },
  methods: {
    createEditorData() {
      createeditor().then((res) => {
        console.log(res)
      })
    },
    saveEditorData(editordata, wallitemdata) {
      save(editordata.id, wallitemdata).then((res) => {
        console.log(res)
      })
      // weather_mini({ city: '深圳' }).then(response => {
      //   console.log(response)
      // })
    },
    updateEditordata() {
      updateeditordata(this.editordata).then((res) => {
        console.log(res)
      })
    },
    pageBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.tbrow {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.tbtag {
  width: 100px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 90%;
}

.el-row {
  margin-bottom: 0px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
.grid-content{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
