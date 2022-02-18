<template>
  <div class="app-container">
    <el-input v-model="editordata.name" @change="updateEditordata()" />
    <el-input v-model="editordata.keywords" @change="updateEditordata()" />

    <el-button @click="saveEditorData(editordata,wallitemdata)">保存模板</el-button>
  </div>
</template>

<script>
import { listself, getwallitemdata, updateeditor, save, createeditor, updateeditordata } from '@/api/editor'
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
  data() {
    return {
      editordata: {
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
      delayms: 300,
      activeName: 'allproject',
      listLoading: true,
      itemlist: [],
      shopcar: [],
      itemorderlist: [],
      itemvos: [],
      totalprice: 0,
      dialogVisible: false,
      bindorder: {
        telphone: '',
        count: '',
        orderno: '',
        itemid: '',
        bindcode: ''
      },
      editorlist: [
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
    // listself(0, 10).then((res) => {
    //   console.log('editordata', res)
    //   this.editorlist = res.data
    // })
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
    },
    updateEditordata() {
      updateeditordata(this.editordata).then((res) => {
        console.log(res)
      })
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
</style>
