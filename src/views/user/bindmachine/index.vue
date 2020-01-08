<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="userBindMachineS"
      element-loading-text="Loading"
      border
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
      <el-table-column label="订单id" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bindOrderid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机器码" align="center">
        <template slot-scope="scope">
          {{ scope.row.machineid }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="绑定时间" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ new Date(scope.row.bindtime).toLocaleString() }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listBindMachine
} from '@/api/user'

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
      userBindMachineS: [],
      pageSize: 10000,
      pageStart: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      listBindMachine(this.pageStart, this.pageSize).then(response => {
        this.userBindMachineS = response.data
        console.log(response)
        this.listLoading = false
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
</style>
