<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="所有项目" name="allproject">
        <el-table
          v-loading="listLoading"
          :data="userBindOrderS.filter(data => !search ||
            data.id.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.userid.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.bindcode.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          height="840"
          stripe
          highlight-current-row
          :default-sort="{prop: 'count', order: 'descending'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客户单位">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="项目名称">
                  <span>{{ props.row.userid }}</span>
                </el-form-item>
                <el-form-item label="客户负责人">
                  <span>{{ props.row.userphone }}</span>
                </el-form-item>
                <el-form-item label="产品型号">
                  <span>{{ props.row.count }}</span>
                </el-form-item>
                <el-form-item label="产品数量">
                  <span>{{ props.row.bindcode }}</span>
                </el-form-item>
                <el-form-item label="项目单价">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="项目总价">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="开始时间">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="到期">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="负责人">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="id" label="客户单位" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="项目名称" sortable prop="userid" width="95">
            <template slot-scope="scope">
              {{ scope.row.userid }}
            </template>
          </el-table-column>
          <el-table-column label="客户负责人" sortable prop="count" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品型号" align="center">
            <template slot-scope="scope">
              {{ scope.row.bindcode }}
            </template>
          </el-table-column>
          <el-table-column label="产品数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.bindcode }}
            </template>
          </el-table-column>
          <el-table-column label="项目单价" align="center">
            <template slot-scope="scope">
              {{ scope.row.bindcode }}
            </template>
          </el-table-column>
          <el-table-column label="项目总价" align="center">
            <template slot-scope="scope">
              {{ scope.row.bindcode }}
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="createtime" label="开始时间" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="createtime" label="到期" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="createtime" label="负责人" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="createtime" label="状态" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我的项目" name="myproject">
        <el-table
          v-loading="listLoading"
          :data="userBindOrderS.filter(data => !search ||
            data.id.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.userid.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.bindcode.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          height="840"
          stripe
          highlight-current-row
          :default-sort="{prop: 'count', order: 'descending'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客户单位">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="项目名称">
                  <span>{{ props.row.userid }}</span>
                </el-form-item>
                <el-form-item label="客户负责人">
                  <span>{{ props.row.userphone }}</span>
                </el-form-item>
                <el-form-item label="产品型号">
                  <span>{{ props.row.count }}</span>
                </el-form-item>
                <el-form-item label="产品数量">
                  <span>{{ props.row.bindcode }}</span>
                </el-form-item>
                <el-form-item label="项目单价">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="项目总价">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="开始时间">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="到期">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="负责人">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.createtime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="id" label="ID" width="195">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="用户id" sortable prop="userid" width="95">
            <template slot-scope="scope">
              {{ scope.row.userid }}
            </template>
          </el-table-column>
          <el-table-column label="购买数量" sortable prop="count" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              {{ scope.row.bindcode }}
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="createtime" label="下单时间" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="客户" name="user">客户</el-tab-pane>
      <el-tab-pane label="经销商" name="dealer">
        经销商
        <el-table
          v-loading="listLoading"
          :data="dealers.filter(data => !search ||
            data.id.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.dealername.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.telphone.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          height="840"
          stripe
          highlight-current-row
          :default-sort="{prop: 'count', order: 'descending'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="上级经销商ID">
                  <span>{{ props.row.dealerparentid }}</span>
                </el-form-item>
                <el-form-item label="经销商Level">
                  <span>{{ props.row.dealerlevel }}</span>
                </el-form-item>
                <el-form-item label="经销商名称">
                  <span>{{ props.row.dealername }}</span>
                </el-form-item>
                <el-form-item label="身份证正面">
                  <span>{{ props.row.identityfront }}</span>
                </el-form-item>
                <el-form-item label="身份证背面">
                  <span>{{ props.row.identityback }}</span>
                </el-form-item>
                <el-form-item label="营业执照">
                  <span>{{ props.row.businesslicense }}</span>
                </el-form-item>
                <el-form-item label="认证">
                  <span>{{ props.row.verified }}</span>
                </el-form-item>
                <el-form-item label="账号">
                  <span>{{ props.row.account }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.telphone }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="id" label="ID" width="195">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="经销商名称" sortable prop="dealername" width="95">
            <template slot-scope="scope">
              {{ scope.row.dealername }}
            </template>
          </el-table-column>
          <el-table-column label="认证" sortable prop="verified" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.verified }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号" align="center">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="telphone" label="手机号" width="200">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time" /> -->
              <span>{{ scope.row.telphone }}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审批" name="approval">审批</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {
  listBindOrder,
  deleteBindOrder
} from '@/api/user'
import {
  listdealer
} from '@/api/userdealer'
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
      activeName: 'allproject',
      list: null,
      listLoading: true,
      userBindOrderS: [],
      dealers: [],
      pageSize: 10000,
      pageStart: 0,
      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event, tab.name, tab.index)
    },
    fetchData() {
      this.listLoading = true
      listBindOrder(this.pageStart, this.pageSize).then(response => {
        this.userBindOrderS = response.data
        console.log(response)
        this.listLoading = false
      })
      listdealer(store.getters.token).then((response) => {
        this.dealers = response.data
        console.log('dealers', this.dealers)
      })
    },

    handleDelete(index, rowdata) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var itemindex = this.userBindOrderS.findIndex((item) => item.id === rowdata.id)
        deleteBindOrder(rowdata.id).then(response => {
          if (response.data === 1) {
            this.userBindOrderS.splice(itemindex, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.listLoading = false
        })
      }).catch(() => {
        console.log('已取消删除')
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
    width: 50%;
  }
</style>
