<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="userdealers"
      element-loading-text="Loading"
      fit
      stripe
	  height="100vh"
      highlight-current-row
      :default-sort="{prop: 'count', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="身份证正面">
              <span>
                <el-image :src="props.row.identityfront" :fit="fit" />
              </span>
            </el-form-item>
            <el-form-item label="身份证反面">
              <el-image :src="props.row.identityback" :fit="fit" />
            </el-form-item>
            <el-form-item label="营业执照">
              <el-image :src="props.row.businesslicense" :fit="fit" />
            </el-form-item>
            <el-form-item label="协议书">
              <el-image :src="props.row.secrecy_agreement" :fit="fit" />
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
              <span>{{ props.row.agencyarea }}</span>
            </el-form-item>
            <el-form-item label="公司地址">
              <span>{{ props.row.companyaddress }}</span>
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
      <el-table-column label="公司地址" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyaddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" sortable prop="rights" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rights }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.verified == 0">
            <el-tag type="warning">待审核</el-tag>
          </div>
          <div v-if="scope.row.verified == 1">
            <el-tag type="warning">已审核</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审批" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.rights==1 && scope.row.verified == 0">
            <el-button size="mini" type="text" @click="setRights(scope.row, 3)">通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  listdealer,
  setrights
} from '@/api/userdealer'
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
      listLoading: false
    }
  },
  created() {
    this.listDealer()
  },
  methods: {
    listDealer() {
      console.log('管理')
      listdealer().then(result => {
        console.log('经销商管理:', result)
        this.userdealers = result.data
      })
    },
    setRights(rowdata, rights) {
      setrights(rowdata.dealerid, rights).then(result => {
        if (result.status === 'success') {
          rowdata.verified = result.data.verified
          rowdata.rights = result.data.rights
          console.log(rowdata)
          this.$notify({
            title: '通知消息',
            message: '授权成功',
            type: 'success'
          })
        }
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
