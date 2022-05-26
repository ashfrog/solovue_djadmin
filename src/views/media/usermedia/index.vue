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
              <th style="width:30%">
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
            <tr
              v-for="(itemVO, index) in usermedias"
              :key="itemVO.iId"
              align="center"
            >
              <td><img class="img-thumbnail" :src="itemVO.imgpath"></td>
              <td>
                <el-input
                  v-model="itemVO.moviename"
                  size="mini"
                  @change="changedata"
                  @blur="
                    e => {
                      onNameInputBlur(e, itemVO)
                    }
                  "
                />
              </td>
              <td>
                <el-tag size="medium" type="info">{{
                  new Date(itemVO.updatetime).toLocaleString()
                }}</el-tag>
              </td>
              <td>
                <el-button
                  size="mini"
                  type="text"
                  circle
                  :data-itemid="itemVO.id"
                  @click="
                    e => {
                      playmovie(e, itemVO)
                    }
                  "
                >预览</el-button>
              </td>
              <td>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="
                    e => {
                      deleteitem(e, index, itemVO.id)
                    }
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>

        <!--        <div :class="{'video-modal':true,'show':showvideo}" @click.stop="showvideo=false">
          <div :class="{'modal-body':true}" @click.stop="">
            <video ref="video" class="video" controls="controls" autoplay>
              <source :src="src" type="video/mp4" />
            </video>
            <div class="close" @click="showvideo=false">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconguanbi"></use>
              </svg>
            </div>
          </div>
        </div> -->

        <MVideo :src="src" :show="showvideo" @close="showvideo = false" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  listbylogin,
  // getuseradset,
  deletemediabyid,
  updatename
} from '@/api/userad'

import MVideo from '@/components/MVideo'

export default {
  components: {
    MVideo
  },
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
      movtitle: '视频',
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
      usermedias: [],
      src: '',
      showvideo: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    playmovie(e, itemvo) {
      this.dialogVisible = true
      this.showvideo = true
      this.movtitle = itemvo.moviename

      this.src = itemvo.moviepath
      // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行
      // this.$nextTick(() => {
      //   this.$refs.video.src = itemvo.moviepath;
      // })
    },
    fetchData() {
      listbylogin().then(response => {
        console.log('response', response)
        this.usermedias = response.data
      })
      // getuseradset("a").then((res) => {
      //   console.log("res", res)
      // })
    },
    changedata: function() {
      this.dataChange = true
    },
    deleteitem: function(e, index, itemid) {
      console.log('index')
      console.log('index', index)

      // var delitem = this.usermedias.findIndex(item => item.id === itemid)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('id', itemid)
          deletemediabyid(itemid).then(data => {
            if (data.status === 'success') {
              this.usermedias.splice(index, 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {})
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
      // getListByPage(this.pageSize, 0, this.columnName, this.desc).then(response => {
      //   this.storeitems = response.data
      //   this.currentPage = 1
      //   console.log(this.currentPage)
      // })
    },
    closemovie() {
      this.showvideo = false
    }
  }
}
</script>

<style lang="scss" scoped>
div,
ul,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote {
  margin: 0;
  padding: 0;
}

table {
  border-collapse: collapse;
}

.el-dialog__body {
  padding: 0px !important;
}

th {
  min-width: 100px;
}

tr {
  border-bottom: 1px solid #f0f0f0;
  color: #0074d9;
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

.modal-body {
  position: absolute;
  width: 57.29%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
}

.video-modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  color: #fff;
}

.modal-body .video {
  width: 100%;
}

.show {
  display: block;
}

.modal-body .close {
  position: absolute;
  right: 16px;
  top: 10px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}

.video {
  outline: none;
}

audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}

@media (max-width: 1200px) {
  .modal-body {
    width: 88%;
  }
}
</style>
