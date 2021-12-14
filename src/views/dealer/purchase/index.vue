<template>
  <div>
    <div class="grid-content">
      <div v-show="!dialogVisible">
        <div class="title">商品列表</div>
        <el-table
          v-loading="listLoading"
          :data="itemlist"
          element-loading-text="Loading"
          fit
          stripe
          highlight-current-row
          :default-sort="{prop: 'count', order: 'descending'}"
          class="content"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form size="mini" label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品">
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item label="单价">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品介绍">
                  <span>{{ props.row.descript }}</span>
                </el-form-item>
                <el-form-item label="销量">
                  <span>{{ props.row.sales }}</span>
                </el-form-item>
                <el-form-item label="库存">
                  <span>{{ props.row.stock }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable prop="title" label="商品">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="图片" sortable prop="img_url">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="80px" height="45px">
            </template>
          </el-table-column>
          <el-table-column label="单价" sortable prop="price" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品介绍" align="center">
            <template slot-scope="scope">
              {{ scope.row.descript }}
            </template>
          </el-table-column>
          <el-table-column label="销量" align="center">
            <template slot-scope="scope">
              {{ scope.row.sales }}
            </template>
          </el-table-column>
          <el-table-column label="库存" align="center">
            <template slot-scope="scope">
              {{ scope.row.stock }}
            </template>
          </el-table-column>
          <el-table-column label="采购数量" align="center" width="160">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.purchasecount" size="mini" :min="0" :max="999" label="描述文字" @change="addShopcar(scope.row.id,scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <div style="width:300px;display:flex;flex-direction:row;position:absolute;right:10px;margin-top:30px;">
            <div style="line-height: 50px;color:gray;width:80px;">总价￥:</div>
            <div style="line-height: 50px;color:red;width:100px;">{{ totalprice }}</div>
            <el-button type="warning" @click="showOrderDetail()">开始报备</el-button>
          </div>
        </div>
      </div>

      <div v-show="dialogVisible">
        <el-form ref="itemorderdetail" size="mini" :model="itemorderdetail" label-width="140px" class="content">
          <div class="title">经销商信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="产品类">
                <el-input disabled size="mini" value="SOLO互动盒子" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="收件人" prop="custorg">
                <el-input v-model="itemorderdetail.manager" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话" prop="manager">
                <el-input v-model="itemorderdetail.managertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="收货地址" prop="receive_areacode">
                <el-col class="selectorgroup">
                  <PositionSelector v-model="itemorderdetail.receive_areacode" size="mini" />
                </el-col>
                <el-col :span="6">
                  <el-input v-model="itemorderdetail.receive_detail" size="mini" placeholder="详细地址" />
                </el-col>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人" prop="dealername">
                <el-input v-model="userdealer.dealername" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="telphone">
                <el-input v-model="userdealer.telphone" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="经销商地址" prop="companyaddress">
                <el-input v-model="userdealer.companyaddress" disabled size="mini" />
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
          <div class="title">订购商品信息</div>
          <el-table v-loading="listLoading" class="content" :data="itemlistvo" element-loading-text="Loading" fit stripe :default-sort="{prop: 'count', order: 'descending'}">
            <el-table-column align="center" sortable prop="title" label="商品" width="195">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="图片" sortable prop="img_url" width="105">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" width="50" height="30">
              </template>
            </el-table-column>
            <el-table-column label="单价" sortable prop="price" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品介绍" align="center">
              <template slot-scope="scope">
                {{ scope.row.descript }}
              </template>
            </el-table-column>
            <el-table-column label="采购数量" align="center" width="400">
              <template slot-scope="scope">
                {{ scope.row.purchasecount }}
              </template>
            </el-table-column>
          </el-table>
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
              <el-form-item label="采购联系人" prop="manager">
                <el-input v-model="itemorderdetail.buyer" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移动电话" prop="managertel">
                <el-input v-model="itemorderdetail.buyertel" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="最终用户地址" prop="areacode">
                <el-row>
                  <el-col class="selectorgroup">
                    <PositionSelector v-model="itemorderdetail.areacode" size="mini" />
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="itemorderdetail.areadetail" size="mini" placeholder="详细地址" />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">发票信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="税号">
                <el-input v-model="userdealer.taxcode" size="mini" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行">
                <el-input v-model="userdealer.bankname" size="mini" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行账号">
                <el-input v-model="userdealer.bankaccount" size="mini" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户行地址">
                <el-input v-model="userdealer.bankaddr" size="mini" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址">
                <el-input v-model="userdealer.bankaddr" size="mini" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="userdealer.telphone" size="mini" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发票收件人">
                <el-input v-model="itemorderdetail.invoice_receiver" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="发票收件人电话">
                <el-row>
                  <el-col :span="6">
                    <el-input v-model="itemorderdetail.invoice_receiver_tel" size="mini" />
                  </el-col>
                  <el-col :span="10">
                    <div style="color:red;">请优先提供手机号; 如是座机请加区号</div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="发票收件人地址" prop="invoice_receiver_areacode">
                <el-row>
                  <el-col class="selectorgroup">
                    <PositionSelector v-model="itemorderdetail.invoice_receiver_areacode" size="mini" />
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="itemorderdetail.invoice_receiver_areadetail" size="mini" placeholder="详细地址" />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="备注">
                <el-input v-model="itemorderdetail.note" size="mini" placeholder="备注" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;justify-content:center;display:flex;flex-direction:row;margin:20px 20px;">
          <el-button @click="hideOrderDetailPanel">取 消</el-button>
          <el-button type="primary" @click="confirmorder">提交</el-button>
        </span>
      </div>

      <!-- </el-dialog> -->
    </div>
  </div>
</template>

<script>
import {
  listitem
} from '@/api/item'
import {
  additemorder
} from '@/api/itemorder'
// import {
//   listposition
// } from '@/api/area'
import {
  getdealerinvoice
} from '@/api/userdealer'
import PositionSelector from '@/components/PositionSelector'

// import store from '@/store'
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
      listLoading: true,
      itemlist: [],
      itemlistvo: [],
      shopcar: [],
      userdealer: [],
      itemorderdetail: {
        custorg: '',
        project: '',
        custmanager: '',
        custmanagertel: '',
        manager: '',
        managertel: '',
        areacode: '',
        areadetail: ''
      },
      itemorderlist: [],
      itemvos: [],
      totalprice: 0,
      dialogVisible: false
    }
  },
  created() {
    this.listItem()
    getdealerinvoice().then((res) => {
      console.log('userdealer', res.data)
      this.userdealer = res.data
    })
  },
  methods: {
    addShopcar(id, row) {
      var index = this.shopcar.findIndex(item => item.itemid === row.id)
      var shopcaritem = this.shopcar.find(item => item.itemid === row.id)
      if (row.purchasecount === undefined) {
        row.purchasecount = 0
      }
      if (index === -1) {
        this.shopcar.push({
          'itemid': row.id,
          'itemcount': row.purchasecount,
          'itemprice': row.price
        })
      } else {
        shopcaritem.itemcount = row.purchasecount
      }
      if (row.purchasecount === 0) {
        this.shopcar.pop(shopcaritem)
      }
      this.calcTotalPrice(this.shopcar)
    },

    showOrderDetail() {
      this.itemlistvo = this.itemlist.filter((item) => {
        return item.purchasecount > 0
      })
      if (this.itemlistvo.length > 0) {
        this.dialogVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '采购数量不能为0'
        })
      }
      console.log(this.itemlistvo)
    },

    confirmorder() {
      additemorder(this.shopcar, this.itemorderdetail).then((response) => {
        if (response.status === 'success') {
          this.$notify({
            title: '通知消息',
            message: '订单已提交',
            type: 'success'
          })
          this.$router.push({
            path: '/dealer/purchaseorder'
          })
        }
      })
      this.dialogVisible = false
    },

    hideOrderDetailPanel() {
      this.dialogVisible = false
    },

    calcTotalPrice(shopcar) {
      this.totalprice = 0
      for (let i = 0; i < this.shopcar.length; i++) {
        var shopcaritem = this.shopcar[i]
        this.totalprice += shopcaritem.itemprice * shopcaritem.itemcount
      }
    },

    listItem() {
      listitem().then((response) => {
        this.itemlist = response.data
        console.log(response.data)
        this.listLoading = false
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/orderstyle.scss";

.grid-content{
  overflow: auto;
}

.content{
  overflow: auto;
  // min-width: 40rem;
}
</style>
