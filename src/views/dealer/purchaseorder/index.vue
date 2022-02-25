<template>
  <div class="app-container">
    <div v-show="!dialogVisible">
      <div class="title">报备信息</div>
      <el-table
        v-loading="listLoading"
        size="mini"
        :data="itemorderlist"
        element-loading-text="Loading"
        fit
        stripe
        highlight-current-row
        height="100vh"
        :default-sort="{prop: 'count', order: 'descending'}"
      >
        <el-table-column align="center" prop="orderno" label="订单号">
          <template slot-scope="scope">
            {{ scope.row.orderno }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="project" label="项目名称">
          <template slot-scope="scope">
            {{ scope.row.project }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="project" label="最终用户">
          <template slot-scope="scope">
            {{ scope.row.custorg }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            {{ new Date(scope.row.createtime).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="订单金额(元)" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalprice }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="info">
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发货时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createtime }}
          </template>
        </el-table-column>
        <el-table-column label="快递单号" align="center">
          <template slot-scope="scope">
            {{ scope.row.expressnumber }}
          </template>
        </el-table-column>
        <el-table-column label="快递公司" align="center">
          <template slot-scope="scope">
            {{ scope.row.expressnumber }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showOrderDetail(scope.row.orderno)">查看</el-button>
            <el-button v-if="scope.row.state!='审核通过'" size="mini" type="text" @click="editOrderDetail(scope.row.orderno)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div v-show="dialogVisible">
      <div>
        <el-form
          ref="itemorderdetail"
          class="grid-content"
          :disabled="!editmode"
          size="mini"
          :model="itemorderdetail"
          label-width="140px"
        >
          <div class="title">经销商信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="产品类">
                <el-input size="mini" value="SOLO互动盒子" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="收件人" prop="manager">
                <el-input v-model="itemorderdetail.manager" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话" prop="managertel">
                <el-input v-model="itemorderdetail.managertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item v-if="editmode" label="收货地址" prop="receive_areacode">
                <el-col class="selectorgroup">
                  <PositionSelector v-model="itemorderdetail.receive_areacode" size="mini" />
                </el-col>
                <el-col :span="6">
                  <el-input v-model="itemorderdetail.receive_detail" size="mini" placeholder="详细地址" />
                </el-col>
              </el-form-item>
              <el-form-item v-else label="收货地址" prop="receive_areatext">
                <el-input v-model="itemorderdetail.receive_areatext" size="mini" placeholder="详细地址" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人" prop="dealername">
                <el-input v-model="itemorderdetail.dealername" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="telphone">
                <el-input v-model="itemorderdetail.telphone" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="经销商地址" prop="dealeraddress">
                <el-input v-model="itemorderdetail.dealeraddress" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="录单人" prop="recorder">
                <el-input v-model="itemorderdetail.recorder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="录单人电话" prop="recordertel">
                <el-input v-model="itemorderdetail.recordertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <div class="title">订购商品信息</div>
          <el-table
            v-loading="listLoading"
            class="grid-content"
            :data="itemorderdetail.itemOrderItemVOS"
            element-loading-text="Loading"
            fit
            stripe
            :default-sort="{prop: 'count', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column align="center" sortable prop="title" label="商品">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="图片" sortable prop="img_url">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" height="30">
              </template>
            </el-table-column>
            <el-table-column label="单价" sortable prop="price" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.unitprice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品介绍" align="center">
              <template slot-scope="scope">
                {{ scope.row.descript }}
              </template>
            </el-table-column>
            <el-table-column label="采购数量" align="center">
              <template slot-scope="scope">
                {{ scope.row.itemcount }}
              </template>
            </el-table-column>
          </el-table> -->
          <div class="title">最终用户信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="最终用户全称" prop="custorg">
                <el-input v-model="itemorderdetail.custorg" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="project">
                <el-input v-model="itemorderdetail.project" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户负责人" prop="custmanager">
                <el-input v-model="itemorderdetail.custmanager" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户负责人手机号" prop="custmanagertel">
                <el-input v-model="itemorderdetail.custmanagertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="采购联系人" prop="buyer">
                <el-input v-model="itemorderdetail.buyer" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移动电话" prop="buyertel">
                <el-input v-model="itemorderdetail.buyertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="最终用户地址" prop="areaFullName">
                <el-row v-if="editmode">
                  <el-col class="selectorgroup">
                    <PositionSelector v-model="itemorderdetail.areacode" size="mini" :areatext="itemorderdetail.areaFullName" />
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="itemorderdetail.areadetail" size="mini" placeholder="详细地址" />
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-input v-model="itemorderdetail.areaFullName" size="mini" />
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">发票信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="税号">
                <el-input v-model="itemorderdetail.taxcode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行">
                <el-input v-model="itemorderdetail.bankname" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行账号">
                <el-input v-model="itemorderdetail.bankaccount" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户行地址">
                <el-input v-model="itemorderdetail.bankaddr" size="mini" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="地址">
                <el-input v-model="itemorderdetail.bankaddr" size="mini" />
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="itemorderdetail.telphone" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发票收件人">
                <el-input v-model="itemorderdetail.invoice_receiver" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票收件人电话">
                <el-input v-model="itemorderdetail.invoice_receiver_tel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="发票收件人地址" prop="invoice_receiver_areatext">
                <el-row v-if="editmode">
                  <el-col class="selectorgroup">
                    <PositionSelector v-model="itemorderdetail.invoice_receiver_areacode" size="mini" :areatext="itemorderdetail.invoice_receiver_areatext" />
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="itemorderdetail.invoice_receiver_areadetail" size="mini" placeholder="详细地址" />
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-input v-model="itemorderdetail.invoice_receiver_areatext" size="mini" placeholder="" />
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input v-model="itemorderdetail.note" size="mini" placeholder="备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="width:100%;justify-content:center;display:flex;flex-direction:row;margin:20px 20px;">
        <el-button v-if="editmode" type="primary" @click="updateItemOrder(itemorderdetail)">确定</el-button>
        <el-button type="primary" @click="hideOrderDetailPanel">返回</el-button>
        <el-button v-if="editmode" type="danger" @click="deleteItemorder(itemorderdetail.orderno)">删除</el-button>
      </span>
    </div>
  </div>
</template>

<script>
// import {
//   listitem
// } from '@/api/item'
import {
  listitemorderbydealer,
  getitemorderbyorderno,
  deleteitemorder,
  updateitemorder
} from '@/api/itemorder'
import PositionSelector from '@/components/PositionSelector'
export default {
  components: {
    PositionSelector
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
      activeName: 'allproject',
      listLoading: true,
      itemlist: [],
      shopcar: [],
      itemorderlist: [],
      itemvos: [],
      totalprice: 0,
      dialogVisible: false,
      editmode: false,

      itemlistvo: [],
      userdealer: [],
      itemorderdetail: {
        custorg: '',
        project: '',
        custmanager: '',
        custmanagertel: '',
        manager: '',
        managertel: '',
        areacode: '',
        areadetail: '',
        areaFullName: ''
      }
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
    updateItemOrder(itemorderdetail) {
      updateitemorder(itemorderdetail).then((res) => {
        console.log(res)
        if (res.status === 'success') {
          this.dialogVisible = false
          this.$notify({
            title: '通知消息',
            message: '修改成功!',
            type: 'success'
          })
        }
      })
    },
    showOrderDetail(orderno) {
      getitemorderbyorderno(orderno).then((res) => {
        console.log(res.data)
        this.editmode = false
        this.dialogVisible = true
        this.itemorderdetail = res.data
      })
    },
    editOrderDetail(orderno) {
      getitemorderbyorderno(orderno).then((res) => {
        console.log(res.data)
        this.editmode = true
        this.dialogVisible = true
        this.itemorderdetail = res.data
        this.itemorderdetail.areaFullName = this.itemorderdetail.areaFullName
      })
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
    listItemOrder() {
      listitemorderbydealer().then((response) => {
        this.itemorderlist = response.data
        this.listLoading = false
        console.log(this.itemorderlist)
      })
    },

    hideOrderDetailPanel() {
      this.dialogVisible = false
    },
    deleteItemorder(orderno) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteitemorder(orderno).then(response => {
          this.itemorderlist = this.itemorderlist.filter((itemorder) => {
            return itemorder.orderno !== orderno
          })
          this.dialogVisible = false
          this.$notify({
            title: '通知消息',
            message: '删除成功!',
            type: 'success'
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/orderstyle.scss";

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

  .grid-content {
    min-width: 60rem;
  }

  .app-container {
    overflow: auto;
  }
</style>
