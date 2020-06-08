<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="itemlist" element-loading-text="Loading" fit stripe highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
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
      <el-table-column align="center" sortable prop="title" label="商品" width="95">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="图片" sortable prop="img_url" width="195">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="200" height="100">
        </template>
      </el-table-column>
      <el-table-column label="单价" sortable prop="price" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品介绍" align="center">
        <template slot-scope="scope">
          {{ scope.row.商品介绍 }}
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
      <el-table-column label="采购数量" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.purchasecount" :min="0" :max="10000" label="描述文字" @change="addShopcar(scope.row.id,scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <div style="width:300px;float:right;display:flex;flex-direction:row;">
        <div style="line-height: 50px;margin-right:0px;color:gray;width:80px;">总价￥:</div>
        <div style="line-height: 50px;margin-right:0px;color:red;width:100px;">{{ totalprice }}</div>
        <el-button type="warning" @click="showOrderDetail()">采购下单</el-button>
      </div>
    </div>
    <el-dialog title="填写订单" :visible.sync="dialogVisible" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="itemorderdetail" label-width="150px">
          <el-form-item label="客户单位">
            <el-input v-model="itemorderdetail.custorg" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="itemorderdetail.project" />
          </el-form-item>
          <el-form-item label="客户负责人">
            <el-input v-model="itemorderdetail.custmanager" />
          </el-form-item>
          <el-form-item label="客户负责人手机号">
            <el-input v-model="itemorderdetail.custmanagertel" />
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="itemorderdetail.manager" />
          </el-form-item>
          <el-form-item label="负责人手机号">
            <el-input v-model="itemorderdetail.managertel" />
          </el-form-item>
          <el-form-item label="经销区域">
            <PositionSelector v-model='itemorderdetail.areacode'></PositionSelector>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="itemorderdetail.areadetail" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideOrderDetailPanel">取 消</el-button>
        <el-button type="primary" @click="confirmorder">提交订单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listitem
  } from '@/api/item'
  import {
    additemorder
  } from '@/api/itemorder'
  import {
    listposition
  } from '@/api/area'
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
        activeName: 'allproject',
        listLoading: true,
        itemlist: [],
        shopcar: [],
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
        dialogVisible: false,
      }
    },
    created() {
      this.listItem()
    },
    methods: {
      areacodeChange(areacode) {
        this.itemorderdetail.areacode = areacode
        console.log('itemorderdetail', this.itemorderdetail)
      },

      addShopcar(id, row) {
        var index = this.shopcar.findIndex(item => item.itemid === row.id)
        var shopcaritem = this.shopcar.find(item => item.itemid === row.id)
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
        this.dialogVisible = true
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },

      confirmorder() {
        additemorder(this.shopcar, this.itemorderdetail).then((response) => {
          if (response.status === 'success') {
            this.$notify({
              title: '通知消息',
              message: '订单已提交',
              type: 'success'
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
