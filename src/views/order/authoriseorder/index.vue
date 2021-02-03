<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="itemorderlist"
      element-loading-text="Loading"
      fit
      stripe
      highlight-current-row
	  height="100vh"
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="orderno" label="订单号" width="95">
        <template slot-scope="scope">{{ scope.row.orderno }}</template>
      </el-table-column>
      <el-table-column align="center" sortable prop="project" label="项目" width="95">
        <template slot-scope="scope">{{ scope.row.project }}</template>
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
        <template slot-scope="scope">{{ new Date(scope.row.createtime).toLocaleString() }}</template>
      </el-table-column>
      <el-table-column label="采购/分发数量" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="采购数量"
            :open-delay="delayms"
            placement="top-end"
          >
            <el-tag :type="scope.row.state=='审核通过' ? 'primary':'danger' ">{{ scope.row.itemcount }}</el-tag>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="已分发数量"
            :open-delay="delayms"
            placement="top-start"
          >
            <el-tag
              :type="scope.row.state=='审核通过' ? 'warning':'danger' "
            >{{ scope.row.authorisedcount }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state=='审核通过' ? 'success':'danger' ">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分发设备" align="center">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.state=='审核通过'"
            :disabled="scope.row.itemcount == scope.row.authorisedcount"
            type="text"
            @click="prepareBindOrder(scope.row.orderno,scope.row.itemid)"
          >{{ scope.row.itemcount == scope.row.authorisedcount?'授权已满':'授权用户' }}</el-button>
          <el-button
            v-show="scope.row.state!='审核通过' "
            disabled
            type="text"
            style="color:#F56C6C"
          >待审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog customClass="customWidth"  center title="授权用户" :visible.sync="dialogVisible" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-form  label-width="100px" :model="bindorder">
          <el-input v-model="bindorder.telphone" placeholder="请输入用户微信绑定的手机号">
            <template slot="prepend">用户:</template>
          </el-input>
          <div style="margin: 20px;" />
          <el-input v-model="bindorder.count" placeholder="请指定设备数量">
            <template slot="prepend">数量:</template>
          </el-input>
          <div style="margin: 20px;" />
          <el-input v-model="bindorder.bindcode" placeholder="备注信息">
            <template slot="prepend">备注:</template>
          </el-input>
          <div style="margin: 20px;" />
        </el-form>
        <el-row>
          <el-col :span="12">
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="addOrder">确 定</el-button>
          </el-col>
        </el-row>


      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listitem } from '@/api/item'
import { listauthoriseorderbydealer, deleteitemorder } from '@/api/itemorder'
import { addBindOrder } from '@/api/userbindorder'

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
    prepareBindOrder(orderno, itemid) {
      this.dialogVisible = true
      this.bindorder.orderno = orderno
      this.bindorder.itemid = itemid
    },
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
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    deleteItemorder(orderno) {
      this.$confirm('此操作将删除与该订单关联的项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteitemorder(orderno).then((response) => {
            this.itemorderlist = this.itemorderlist.filter((itemorder) => {
              return itemorder.orderno !== orderno
            })
          })
        })
        .catch(() => {})
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
    addOrder() {
      this.dialogVisible = false
      addBindOrder(
        this.bindorder.telphone,
        this.bindorder.count,
        this.bindorder.orderno,
        this.bindorder.itemid,
        this.bindorder.bindcode
      ).then((response) => {
        if (response.status === 'success') {
          var index = this.itemorderlist.findIndex(
            (itemorder) =>
              itemorder.itemid === response.data.itemid &&
              itemorder.orderno === response.data.orderno
          )
          this.itemorderlist[index].authorisedcount =
            response.data.authorisedcount
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    },
    listItemOrder() {
      listauthoriseorderbydealer().then((response) => {
        this.itemorderlist = response.data
        this.listLoading = false
        console.log(this.itemorderlist)
      })
    }
  }
}
</script>

<style lang="scss">
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
