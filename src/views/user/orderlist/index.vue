<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="userBindOrderS"
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
      <el-table-column label="购买数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.bindcode }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="下单时间" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ new Date(scope.row.createtime).toLocaleString() }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listBindOrder
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
      userBindOrderS: [],
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
      listBindOrder(this.pageStart, this.pageSize).then(response => {
        this.userBindOrderS = response.data
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
