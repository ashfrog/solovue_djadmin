<template>
  <div class="app-container">
    <div v-show="!dialogVisible" class="grid-content">
      <div class="title">订单信息</div>
      <el-table size="mini" v-loading="listLoading" :data="itemorderlist" element-loading-text="Loading" fit stripe
        highlight-current-row :default-sort="{prop: 'count', order: 'descending'}">
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form size="mini" label-position="left" inline class="demo-table-expand">
              <el-form-item label="运单号">
                <span>{{ props.row.expressnumber }}</span>
              </el-form-item>
              <el-form-item label="最终用户">
                <span>{{ props.row.custorg }}</span>
              </el-form-item>
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
        </el-table-column> -->
        <el-table-column align="center" prop="orderno" label="订单号">
          <template slot-scope="scope">
            {{ scope.row.orderno }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="project" label="最终用户">
          <template slot-scope="scope">
            {{ scope.row.project }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="project" label="经销商业务联系人">
          <template slot-scope="scope">
            {{ scope.row.project }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            {{new Date(scope.row.createtime).toLocaleString()  }}
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
      <div class="grid-content">
        <el-form :disabled="!editmode" size="mini" ref="itemorderdetail" :model="itemorderdetail" label-width="140px">
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
                <el-input size="mini" v-model="itemorderdetail.manager" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话" prop="managertel">
                <el-input size="mini" v-model="itemorderdetail.managertel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item v-if="editmode" label="收货地址" prop="receive_areacode">
                <el-col class="selectorgroup">
                  <PositionSelector size="mini" v-model='itemorderdetail.receive_areacode'></PositionSelector>
                </el-col>
                <el-col :span="6">
                  <el-input size="mini" placeholder="详细地址" v-model="itemorderdetail.receive_detail" />
                </el-col>
              </el-form-item>
              <el-form-item v-else label="收货地址" prop="receive_areatext">
                <el-input size="mini" placeholder="详细地址" v-model="itemorderdetail.receive_areatext" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人" prop="dealername">
                <el-input disabled size="mini" v-model="itemorderdetail.dealername" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="telphone">
                <el-input disabled size="mini" v-model="itemorderdetail.telphone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="经销商地址" prop="dealeraddress">
                <el-input disabled size="mini" v-model="itemorderdetail.dealeraddress" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="录单人" prop="recorder">
                <el-input size="mini" v-model="itemorderdetail.recorder" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="录单人电话" prop="recordertel">
                <el-input size="mini" v-model="itemorderdetail.recordertel" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">订购商品信息</div>
          <el-table v-loading="listLoading" :data="itemorderdetail.itemOrderItemVOS" element-loading-text="Loading" fit
            stripe :default-sort="{prop: 'count', order: 'descending'}" style="width: 100%">
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
                <el-input-number size="mini" v-model="scope.row.itemcount" :min="0" :max="10000" label="描述文字" @change="addShopcar(scope.row.id,scope.row)" />
              </template>
            </el-table-column>
          </el-table>
          <div class="title">最终用户信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="最终用户全称" prop="custorg">
                <el-input size="mini" v-model="itemorderdetail.custorg" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="project">
                <el-input size="mini" v-model="itemorderdetail.project" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户负责人" prop="custmanager">
                <el-input size="mini" v-model="itemorderdetail.custmanager" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户负责人手机号" prop="custmanagertel">
                <el-input size="mini" v-model="itemorderdetail.custmanagertel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="采购联系人" prop="buyer">
                <el-input size="mini" v-model="itemorderdetail.buyer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移动电话" prop="buyertel">
                <el-input size="mini" v-model="itemorderdetail.buyertel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="最终用户地址" prop="areaFullName">
                <el-row v-if="editmode">
                  <el-col class="selectorgroup">
                    <PositionSelector size="mini" :areatext="itemorderdetail.areaFullName" v-model='itemorderdetail.areacode'></PositionSelector>
                  </el-col>
                  <el-col :span="8">
                    <el-input size="mini" placeholder="详细地址" v-model="itemorderdetail.areadetail" />
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-input size="mini" v-model="itemorderdetail.areaFullName" />
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">发票信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="税号">
                <el-input disabled size="mini" v-model="itemorderdetail.taxcode" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行">
                <el-input disabled size="mini" v-model="itemorderdetail.bankname" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行账号">
                <el-input disabled size="mini" v-model="itemorderdetail.bankaccount" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户行地址">
                <el-input disabled size="mini" v-model="itemorderdetail.bankaddr" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址">
                <el-input disabled size="mini" v-model="itemorderdetail.bankaddr" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input disabled size="mini" v-model="itemorderdetail.telphone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发票收件人">
                <el-input size="mini" v-model="itemorderdetail.invoice_receiver" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票收件人电话">
                <el-input size="mini" v-model="itemorderdetail.invoice_receiver_tel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="发票收件人地址" prop="invoice_receiver_areatext">
                <el-row v-if="editmode">
                  <el-col class="selectorgroup">
                    <PositionSelector size="mini" :areatext="itemorderdetail.invoice_receiver_areatext" v-model='itemorderdetail.invoice_receiver_areacode'></PositionSelector>
                  </el-col>
                  <el-col :span="8">
                    <el-input size="mini" placeholder="详细地址" v-model="itemorderdetail.invoice_receiver_areadetail" />
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-input size="mini" placeholder="" v-model="itemorderdetail.invoice_receiver_areatext" />
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input size="mini" placeholder="备注" v-model="itemorderdetail.note" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="width:100%;justify-content:center;display:flex;flex-direction:row;margin:20px 20px;">
        <el-button v-if="editmode" @click="updateItemOrder(itemorderdetail)" type="primary">确定</el-button>
        <el-button @click="hideOrderDetailPanel" type="primary">返回</el-button>
        <el-button v-if="editmode" @click="deleteItemorder(itemorderdetail.orderno)" type="danger">删除</el-button>
      </span>
    </div>

  </div>
</template>

<script>
  import {
    listitem
  } from '@/api/item'
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
          areaFullName:'',
        },
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
      updateItemOrder(itemorderdetail){
        updateitemorder(itemorderdetail).then((res)=>{
          console.log(res)
          if(res.status == 'success'){
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
          this.itemorderdetail.areaFullName=this.itemorderdetail.areaFullName
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
              return itemorder.orderno != orderno
            })
            this.dialogVisible = false
            this.$notify({
              title: '通知消息',
              message: '删除成功!',
              type: 'success'
            })
          })
        }).catch(() => {})
      },
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
</style>
