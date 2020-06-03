<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="userdealers" element-loading-text="Loading" fit stripe
      highlight-current-row :default-sort="{prop: 'count', order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="身份证正面">
              <span>
                <el-image :src="props.row.identityfront" :fit="fit"></el-image>
              </span>
            </el-form-item>
            <el-form-item label="身份证反面">
              <el-image :src="props.row.identityback"  :fit="fit"></el-image>
            </el-form-item>
            <el-form-item label="营业执照">
              <el-image :src="props.row.businesslicense" :fit="fit"></el-image>
            </el-form-item>
            <el-form-item label="telphone">
              <span>{{ props.row.custmanager }} 手机号:{{ props.row.telphone }}</span>
            </el-form-item>
            <el-form-item label="法人代表">
              <span>{{ props.row.legalperson }} 手机号:{{ props.row.managertel }}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{ props.row.companyname }}</span>
            </el-form-item>
            <el-form-item label="经销区域">
              <span>{{ props.row.agencyarea_code }}</span>
            </el-form-item>
            <el-form-item label="公司地址">
              <span>{{ props.row.companyaddress_areacode }}</span>
            </el-form-item>
            <el-form-item label="公司详细地址">
              <span>{{ props.row.companyaddressdetail }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="orderno" label="经销商名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.dealername }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="95">
        <template slot-scope="scope">
          {{ scope.row.telphone }}
        </template>
      </el-table-column>
      <el-table-column label="经销区域" width="195">
        <template slot-scope="scope">
          {{ scope.row.agencyarea }}
        </template>
      </el-table-column>
      <el-table-column label="法人代表" sortable prop="legalperson" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.legalperson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" sortable prop="legalperson" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyaddress }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审批" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="setRights(scope.row.dealerid, 4)">通过</el-button>
          <el-button size="mini" type="danger" @click="setRights(scope.row.dealerid, 1)">驳回</el-button>
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
    listdealer,
    setrights
  } from '@/api/userdealer'
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
        fit: 'contain',
        userdealers: [],
        userdealer: {
          account: '',
          agencyarea_code: '',
          businesslicense: '',
          companyaddress_areacode: '',
          companyaddressdetail: '',
          companyname: '',
          dealerid: '',
          dealerlevel: '',
          dealername: '',
          dealerparentid: '',
          identityback: '',
          identityfront: '',
          legalperson: '',
          rights: '',
          telphone: '',
          verified: ''
        },

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
      console.log("创建")
      this.listItemOrder()
      this.listDealer()
    },
    methods: {
      listDealer() {
        console.log("管理")
        listdealer("").then(result => {
          console.log("经销商管理:", result)
          this.userdealers = result.data
        })
      },
      setRights(dealerid, rights) {
        setrights(dealerid, rights).then(result => {
          if (result.status === 'success') {
            this.$notify({
              title: '通知消息',
              message: '授权成功',
              type: 'success'
            })
          }
        })
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
