<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="itemlist"
      element-loading-text="Loading"
      border
      fit
      height="600"
      stripe
      highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="">
              <span>
                <img :src="props.row.imgUrl" width="200" height="100">
              </span>
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
        <el-button type="warning" @click="orderitem()">确定申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {
  listitem,
  additemorder
} from '@/api/item'

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
      itemvos: [],
      totalprice: 0
    }
  },
  created() {
    this.listItem()
  },
  methods: {
    addShopcar(id, row) {
      console.log('添加购物车', id, row)
      if (this.shopcar.indexOf(row) === -1) {
        this.shopcar.push(row)
      } else if (row.purchasecount === 0) {
        this.shopcar.pop(row)
      }
      this.calcTotalPrice(this.shopcar)
    },
    orderitem() {
      additemorder(this.shopcar).then((response) => {
        console.log('result', response)
      })
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
        console.log(this.itemlist)
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
