<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="userBindOrderS"
      element-loading-text="Loading"
      fit
      height="840"
      stripe
      highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="授权编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户id">
              <span>{{ props.row.userid }}</span>
            </el-form-item>
            <el-form-item label="绑定手机号">
              <span>{{ props.row.userphone }}</span>
            </el-form-item>
            <el-form-item label="购买数量">
              <span>{{ props.row.count }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.bindcode }}</span>
            </el-form-item>
            <el-form-item label="下单时间">
              <span>{{ props.row.createtime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="id" label="订单编号" width="195">
        <template slot-scope="scope">
          {{ scope.row.orderno }}
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
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
          >删除授权</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listBindOrder,
  deleteBindOrder
} from '@/api/userbindorder'


import {listauthoriseorder} from '@/api/userbindorder'

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
      listLoading: true,
      userBindOrderS: [],
      pageSize: 10000,
      pageStart: 0,
      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      listauthoriseorder(this.pageStart, this.pageSize).then(response => {
        this.userBindOrderS = response.data
        console.log(response)
        this.listLoading = false
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
