<template>
  <div class="app-container">
    <el-button @click="createEditorData">新建模板</el-button>
    <el-table v-loading="listLoading" :data="editorlist" element-loading-text="Loading" fit stripe highlight-current-row :default-sort="{ prop: 'count', order: 'descending' }">
      <el-table-column align="center" sortable prop="id" label="ID" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="缩略图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.thumbimg" width="80" height="50">
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="name" label="名称" width="195">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{
          new Date(scope.row.updatetime).toLocaleString()
        }}</template>
      </el-table-column>
      <el-table-column label="公开" sortable prop="publicdata" width="80" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.publicdata" @change="e => publicdatachange(e, scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable prop="publicdata" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="false">{{ scope.row }}</span>
          <span>
            <el-button type="text" @click="e => editwallitem(e, scope.row)">编辑</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="删除" sortable prop="publicdata" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="false">{{ scope.row }}</span>
          <span>
            <el-button type="text" @click="e => deletewallitem(e, scope.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {
  listself,
  getwallitemdata,
  createeditor,
  updateeditor,
  deleteeditor
} from '@/api/editor'
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
    listself(0, 10).then((res) => {
      console.log('editordata', res)
      this.editorlist = res.data
      this.listLoading = false
    })
  },
  methods: {
    createEditorData() {
      createeditor().then((res) => {
        console.log(res)
        listself(0, 10).then((res) => {
          console.log('editordata', res)
          this.editorlist = res.data
        })
      })
    },
    editwallitem(e, wallitem) {
      console.log('wallitem', wallitem)

      getwallitemdata(wallitem.id).then((res) => {
        console.log('wallitemdata', res)
      })
      this.$router.push({ name: 'editwall', query: { wallitem: JSON.stringify(wallitem) }})
    },
    publicdatachange(e, editordata) {
      console.log('wallitem', editordata, e)
      updateeditor(editordata).then((res) => {
        console.log(res)
      })
    },
    deletewallitem(e, editordata) {
      this.$confirm('此操作将解绑设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteeditor(editordata).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            listself(0, 10).then((res) => {
              console.log('editordata', res)
              this.editorlist = res.data
            })
          })
        })
        .catch(() => {})
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
