<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="itemorderlist"
      element-loading-text="Loading"
      fit
      stripe
      highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="运单号">
              <span><el-input v-model="props.row.expressnumber" size="mini" placeholder="请输入运单号" />
                <el-button
                  size="mini"
                  type="danger"
                  @click="UpdateExpressNumberbyOrderno(props.row)"
                >确认</el-button></span>
            </el-form-item>
            <el-form-item label="客户单位">
              <span>{{ props.row.custorg }}</span>
            </el-form-item>
            <el-form-item label="项目名称">
              <span>{{ props.row.project }}</span>
            </el-form-item>
            <el-form-item label="客户负责人">
              <span>{{ props.row.custmanager }} 手机号:{{ props.row.custmanagertel }}</span>
            </el-form-item>
            <el-form-item label="负责人">
              <span>{{ props.row.manager }} 手机号:{{ props.row.managertel }}</span>
            </el-form-item>
            <el-form-item label="经销区域">
              <span>{{ props.row.areaFullName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="orderno" label="订单号" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderno }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.project }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="195">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="100" height="50">
        </template>
      </el-table-column>
      <el-table-column label="单价" sortable prop="unitprice" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime }}
        </template>
      </el-table-column>
      <el-table-column label="采购数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.itemcount }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="审批" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="UpdateStatebyOrderno(scope.row, 'ProcessComplete')"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="UpdateStatebyOrderno(scope.row, 'ProcessFail')"
          >驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listitem
} from '@/api/item'
import {
  listitemorder,
  updateStatebyOrderno,
  updateExpressNumberbyOrderno
} from '@/api/itemorder'
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
      listLoading: true,
      itemlist: [],
      shopcar: [],
      itemorderlist: [],
      itemvos: [],
      totalprice: 0,
      dialogVisible: false
    }
  },
  created() {
    this.listItemOrder()
  },
  methods: {
    addShopcar(id, row) {
      if (this.shopcar.indexOf(row) === -1) {
        this.shopcar.push(row)
      } else if (row.purchasecount === 0) {
        this.shopcar.pop(row)
      }
      this.calcTotalPrice(this.shopcar)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    confirmorder() {
      this.dialogVisible = false
    },
    cancelorder() {
      this.dialogVisible = false
    },
    calcTotalPrice(shopcar) {
      this.totalprice = 0
      for (let i = 0; i < this.shopcar.length; i++) {
        var itemVO = this.shopcar[i]
        this.totalprice += itemVO.price * itemVO.purchasecount
      }
    },
    listItem() {
      listitem().then((response) => {
        this.itemlist = response.data
        this.listLoading = false
      })
    },
    listItemOrder() {
      listitemorder(0, 1000).then((response) => {
        this.itemorderlist = response.data
        this.listLoading = false
        console.log(this.itemorderlist)
      })
    },
    UpdateStatebyOrderno(itemorder, state) {
      updateStatebyOrderno(itemorder.orderno, itemorder.itemid, state).then((response) => {
        if (response.status === 'success') {
          itemorder.state = response.data
        }
        console.log(response)
      })
    },
    UpdateExpressNumberbyOrderno(itemorder) {
      updateExpressNumberbyOrderno(itemorder.orderno, itemorder.itemid, itemorder.expressnumber).then((response) => {
        if (response.status === 'success') {
          console.log(response)
        }
        console.log(response)
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
