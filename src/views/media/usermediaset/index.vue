<template>
  <div class="app-container">
    <svg
      class="icon"
      aria-hidden="true"
      :hidden="!showMediaSet"
      @click="ClickReturn()"
    >
      <use xlink:href="#iconfanhui" />
    </svg>
    <div id="app" :hidden="showMediaSet" class="container">
      <el-table
        v-loading="listLoading"
        :data="userBindMachineS"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户id" width="95">
          <template slot-scope="scope">
            {{ scope.row.userid }}
          </template>
        </el-table-column>
        <el-table-column label="订单授权id" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bindOrderid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机器码" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.machineid }}
          </template>
        </el-table-column>
        <el-table-column label="设备名" align="center" width="200">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.devicename"
              size="mini"
              @change="changedata"
              @blur="
                e => {
                  onDeviceNameInputBlur(e, scope.row)
                }
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="绑定时间"
          width="200"
        >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time" /> -->
            <span>{{ new Date(scope.row.bindtime).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="ShowMediaSet(scope.$index, scope.row)"
            >配置广告列表</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="PushMediaSets(scope.$index, scope.row)"
            >立即推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div :hidden="!showMediaSet">
      <div class="tab-responsive">
        <div v-for="(setsitem, setsindex) in usermediasets" :key="setsindex">
          <el-card size="mini" shadow="hover" :body-style="{ padding: '0px' }">
            <el-time-picker
              v-model="setsitem.playTime"
              value-format="timestamp"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="播放时间"
              @change="playtimeChange"
            />
            <el-dropdown
              trigger="click"
              style="margin:0px 10px;"
              @command="handleCommand"
            >
              <el-button
                type="text"
                :style="{ color: setsitem.moviePath == '' ? 'red' : '#0DBADC' }"
              >
                {{ setsitem.movieName
                }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(mediaitem, mediaindex) in usermedias"
                  :key="mediaindex"
                  :command="
                    dropdownCommand(setsindex, mediaindex, setsitem, mediaitem)
                  "
                >{{ mediaitem.moviename }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              style="float:right;margin:6px;"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="
                e => {
                  deletemediaset(e, setsindex)
                }
              "
            />
          </el-card>
        </div>
        <div style="margin:0px 0px;">
          <el-button type="text" @click="addMediaSets">添加一项</el-button>
          <el-button type="text" @click="saveUseradSet">保存</el-button>
          <!--          <el-button @click="sortByTimeup" type="primary" size="medium">升序</el-button>
          <el-button @click="sortByTimedown" type="primary" size="medium">降序</el-button> -->
          <!-- <el-button type="text" @click="ReloadUseradSet" size="medium">重置</el-button> -->
          <el-button
            type="text"
            size="medium"
            @click="ClearUseradSet"
          >清空</el-button>
          <el-button
            type="text"
            size="medium"
            @click="ClickReturn"
          >返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listbylogin,
  saveuseradset,
  getuseradset,
  deletemediabyid,
  // getusermediasetsbyuserid,
  sendadsets
} from '@/api/userad'
import { listBindMachinebyuserid, renamedevice } from '@/api/userbindorder'
import store from '@/store'
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
      showMediaSet: false,
      playtime: new Date(),
      machineid: '',
      search: '',
      userBindMachineS: [],
      activeName: 'second',
      list: null,
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
      usermedias: [], // 广告视频列表
      usermediasets: [
        {
          movieName: '广告视频',
          moviePath: 'a.mp4',
          playTime: '1608533346201'
        },
        {
          movieName: '广告视频2',
          moviePath: 'a2.mp4',
          playTime: '1608533347201'
        },
        {
          movieName: '广告视频3',
          moviePath: 'a3.mp4',
          playTime: '1608533348201'
        }
      ], // 单个设备广告配置策略
      usermediasetslog: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    ClickReturn() {
      const changed =
        JSON.stringify(this.usermediasets) !==
        JSON.stringify(this.usermediasetslog)
      if (changed) {
        this.$confirm('当前配置未保存,确定丢弃当前修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.showMediaSet = false
          })
          .catch(() => {})
      } else {
        this.showMediaSet = false
      }
    },
    ReloadUseradSet() {
      this.usermediasets = JSON.parse(JSON.stringify(this.usermediasetslog))
      console.log(this.usermediasetslog)
    },
    ClearUseradSet() {
      this.usermediasets = []
      console.log(this.usermediasetslog)
    },
    dropdownCommand(setsindex, mediaindex, setsitem, mediaitem) {
      return {
        setsindex,
        mediaindex,
        setsitem,
        mediaitem
      }
    },
    playtimeChange(e) {
      console.log('playtimeChange', e)
      this.usermediasets.sort((a, b) => {
        return this.SortByDaySeconds(a, b)
      })
    },
    handleCommand(command) {
      command.setsitem.movieName = command.mediaitem.moviename
      command.setsitem.moviePath = command.mediaitem.moviepath
      command.setsitem.mediaID = command.mediaitem.id
      console.log('cmd', command)
    },
    sortByTimeup() {
      this.usermediasets.sort((a, b) => {
        return this.SortByDaySeconds(a, b)
      })
    },
    sortByTimedown() {
      this.usermediasets.sort((a, b) => {
        return this.SortByDaySeconds(b, a)
      })
    },
    SortByDaySeconds(a, b) {
      const timea = new Date(a.playTime)
      const timeb = new Date(b.playTime)
      const seconda =
        timea.getHours() * 60 * 60 +
        timea.getMinutes() * 60 +
        timea.getSeconds()
      const secondb =
        timeb.getHours() * 60 * 60 +
        timeb.getMinutes() * 60 +
        timeb.getSeconds()
      return seconda - secondb
    },
    addMediaSets() {
      const mediaset = {
        movieName: '请选择视频',
        moviePath: '',
        playTime: new Date().getTime()
      }
      this.usermediasets.push(mediaset)
    },
    saveUseradSet() {
      for (let i = 0; i < this.usermediasets.length; i++) {
        console.log(this.usermediasets[i].moviePath)
        if (this.usermediasets[i].moviePath === '') {
          this.$notify({
            title: '通知消息',
            message: '有视频未选择!',
            type: 'error'
          })
          return
        }
      }
      saveuseradset(this.machineid, JSON.stringify(this.usermediasets)).then(
        res => {
          console.log('res', res)
          this.$notify({
            title: '通知消息',
            message: res.data,
            type: res.status
          })
          this.usermediasetslog = JSON.parse(JSON.stringify(this.usermediasets))
        }
      )
    },
    ShowMediaSet(index, row) {
      console.log(index, row)
      getuseradset(row.machineid).then(res => {
        if (res.data == null) {
          res.data = []
        }
        this.usermediasets = res.data
        this.usermediasetslog = JSON.parse(JSON.stringify(this.usermediasets))
        this.showMediaSet = true
        this.machineid = row.machineid
      })
    },
    PushMediaSets(index, row) {
      sendadsets(row.machineid).then(res => {
        this.$notify({
          title: '通知消息',
          message: res.data,
          type: 'success'
        })
      })
    },
    playmovie(e, url) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.video.src = url
      })
    },
    fetchData() {
      listBindMachinebyuserid(0, 1000, store.getters.token).then(response => {
        this.userBindMachineS = response.data
        console.log(response)
        this.listLoading = false
      })
      // getusermediasetsbyuserid().then((res) => {
      //   console.log("获取设备", res)
      //   console.log("getusermediasetsbyloginuserid", res)
      // })
      listbylogin().then(res => {
        this.usermedias = res.data
        console.log('视频列表:', this.usermedias)
      })
    },
    changedata: function() {
      this.dataChange = true
    },
    onDeviceNameInputBlur(e, item) {
      renamedevice(item.machineid, item.devicename)
    },
    deletemediaset(e, setsindex) {
      this.usermediasets.splice(setsindex, 1)
    },
    deleteitem: function(e, itemid) {
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
              // this.storeitems.splice(this.storeitems.findIndex((item) => item.iId === itemid), 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: gray;
}

.icon:active {
  color: #0dbadc;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

table {
  border-collapse: collapse;
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

.app-container {
}

.tab-responsive {
  overflow: auto;
}
</style>
