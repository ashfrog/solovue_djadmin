<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="itemorderlist"
      element-loading-text="Loading"
      fit
      stripe
      height="100vh"
      highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="项目名称">
              <span>{{ props.row.project }}</span>
            </el-form-item>
            <el-form-item label="客户负责人">
              <span>{{ props.row.custmanager }} 手机号:{{ props.row.custmanagertel }}</span>
            </el-form-item>
            <el-form-item label="负责人">
              <span>{{ props.row.manager }} 手机号: {{ props.row.managertel }}</span>
            </el-form-item>
            <el-form-item label="经销区域">
              <span>{{ props.row.areaFullName }}</span>
            </el-form-item>
            <el-form-item label="绑定记录">
              <el-timeline style="margin-top:50px;">
                <el-timeline-item
                  v-for="(userbind, index) in props.row.userBindModels"
                  :key="index"
                  style="width: 100%;"
                  :timestamp="userbind.bindtime"
                >
                  绑定时间: {{ new Date(userbind.bindtime).toLocaleString() }}
                  <el-card shadow="hover">
                    <el-row :gutter="100">
                      <el-col :span="10">
                        <div class="grid-content bg-purple">机器码: {{ userbind.machineid }}</div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple">绑定编号: {{ userbind.bindOrderid }}</div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple">绑定ID: {{ userbind.id }}</div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <el-button
                            type="text"
                            class="button"
                            @click="handleDelete(userbind,props.row.userBindModels)"
                          >解绑</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="orderno" label="订单号" width="95">
        <template slot-scope="scope">{{ scope.row.orderno }}</template>
      </el-table-column>
      <el-table-column align="center" sortable prop="project" label="项目" width="95">
        <template slot-scope="scope">{{ scope.row.project }}</template>
      </el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="80" height="50">
        </template>
      </el-table-column>
      <el-table-column label="单价" sortable prop="unitprice" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">{{ new Date(scope.row.ordertime).toLocaleString() }}</template>
      </el-table-column>
      <el-table-column label="分发时间" align="center">
        <template slot-scope="scope">{{ new Date(scope.row.createtime).toLocaleString() }}</template>
      </el-table-column>

      <el-table-column label="用户手机号" align="center" width="110">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="用户手机号码"
            :open-delay="delayms"
            placement="top-end"
          >
            <el-tag type="warning">{{ scope.row.userphone }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="分发|绑定数量" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="分发数量"
            :open-delay="delayms"
            placement="top-end"
          >
            <el-tag type="primary">{{ scope.row.count }}</el-tag>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="已绑定数量"
            :open-delay="delayms"
            placement="top-start"
          >
            <el-tag type="warning">{{ scope.row.bindedcount }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state=='ProcessComplete' ? 'success':'danger' ">已生效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bindcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteBindOrder(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listauthoriseorderlog, deleteBindMachine } from '@/api/userbindorder'

import { deletebindorder } from '@/api/userbindorder'

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
      }
    }
  },
  created() {
    this.listItemOrder()
  },
  methods: {
    handleDelete(rowdata, userBindModels) {
      this.$confirm('此操作将解绑设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var itemindex = userBindModels.findIndex(
            item => item.id === rowdata.id
          )

          deleteBindMachine(rowdata.id).then(response => {
            console.log('确定', response)
            if (response.data === 1) {
              userBindModels.splice(itemindex, 1)
            }
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.listLoading = false
          })
        })
        .catch(() => {})
    },
    listItemOrder() {
      listauthoriseorderlog(0, 1000).then(response => {
        this.itemorderlist = response.data
        this.listLoading = false
        console.log(this.itemorderlist)
      })
    },
    deleteBindOrder(rowdata) {
      this.$confirm('此操作将删除分发给用户的订单权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletebindorder(rowdata.id).then(response => {
            if (response.status === 'success') {
              this.itemorderlist = this.itemorderlist.filter(itemorder => {
                return itemorder.id !== rowdata.id
              })
              this.$notify({
                title: '通知消息',
                message: '删除成功!',
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
