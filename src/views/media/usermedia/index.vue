<template>
  <div class="app-container">
    <div id="app" class="container">
      <div class="tab-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="width:10%">
                <el-button size="mini" type="info">视频</el-button>
              </th>
              <th style="width:10%">
                <el-button size="mini" type="info">名称</el-button>
              </th>
              <th style="width:10%">
                <el-button size="mini" type="info">创建时间</el-button>
              </th>
              <th style="width:5%">
                <el-tag type="success">操作</el-tag>
              </th>
              <th style="width:5%">
                <el-tag type="success">删除</el-tag>
              </th>
            </tr>
          </thead>
          <tbody id="container">
            <tr v-for="(itemVO,index) in usermedias" :key="itemVO.iId" align="center">
              <td><img class="img-thumbnail" :src="itemVO.imgpath"></td>
              <td>
                <el-input v-model="itemVO.moviename" size="mini" @change="changedata" @blur="(e)=>{onNameInputBlur(e,itemVO)}" />
              </td>
              <td>
                <el-tag size="medium" type="info">{{ new Date(itemVO.updatetime).toLocaleString() }}</el-tag>
              </td>
              <td>
                <el-button size="mini" type="text" circle :data-itemid="itemVO.id" @click="(e)=>{playmovie(e,itemVO)}">预览</el-button>
              </td>
              <td>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="(e)=>{deleteitem(e,index,itemVO.id)}" />
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog customClass="customWidth" :title="movtitle" :visible.sync="dialogVisible" center>
          <video ref="video" width="100%" height="100%" controls="controls" autoplay>
            <source src="" type="video/mp4" />
          </video>
<!--          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    listbylogin,
    getuseradset,
    deletemediabyid,
    updatename,
  } from '@/api/userad'
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
        list: null,
        movtitle:'视频',
        listLoading: true,
        storeitems: [],
        categorys: [],
        totalItemCount: 0,
        pageSize: 12,
        currentPage: 0,
        dataChange: false,
        desc: true,
        columnName: 'createTime',
        play: false,
        dialogVisible: false,
        usermedias: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      playmovie(e, itemvo) {
        this.dialogVisible = true;
        this.movtitle = itemvo.moviename;
        this.$nextTick(() => {
          this.$refs.video.src = itemvo.moviepath;
        })
      },
      fetchData() {
        listbylogin().then(response => {
          console.log("response", response)
          this.usermedias = response.data;
        })
        // getuseradset("a").then((res) => {
        //   console.log("res", res)
        // })
      },
      changedata: function() {
        this.dataChange = true
      },
      deleteitem: function(e, index, itemid) {
        console.log("index")
        console.log("index", index)

        var delitem = this.usermedias.findIndex(item => item.id === itemid)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("id", itemid)
          deletemediabyid(itemid).then(data => {
            if (data.status === 'success') {
              this.usermedias.splice(index, 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
        }).catch(() => {})
      },
      onNameInputBlur: function(e, item) {
        if (this.dataChange) {
          updatename(item.id, item.moviename).then(data => {
            if (data.status === 'success') {
              console.log(data)
              this.dataChange = false
            }
          })
        }
      },
      orderBy: function(e, columnName) {
        if (this.columnName !== columnName) {
          this.columnName = columnName
          this.desc = true
        } else {
          this.desc = !this.desc
        }
        getListByPage(this.pageSize, 0, this.columnName, this.desc).then(response => {
          this.storeitems = response.data
          this.currentPage = 1
          console.log(this.currentPage)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  table {
    border-collapse: collapse;
  }

  .el-dialog__body {
    padding: 0px !important;
  }

  tr {
    border-bottom: 1px solid #F0F0F0;
    color: #0074D9;
    font-size: 12px;
  }

  .img-thumbnail {
    width: 100px;
    height: 60px;
    border-radius: 4px;
    display: block;
    margin: auto;
  }

  .block {
    bottom: 20px;
    right: 20px;
  }

  .container {
    overflow: auto;
  }
</style>
