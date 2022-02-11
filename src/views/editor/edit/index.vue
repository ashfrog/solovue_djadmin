<template>
  <div class="app-container" />
</template>

<script>
import { listauthoriseorderlog, deleteBindMachine } from '@/api/userbindorder'

import { deletebindorder } from '@/api/userbindorder'
import { listself, getwallitemdata, updateeditor, save } from '@/api/editor'
// import { formatTime } from '../../../utils'
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
      },
      editorlist: [
        {
          id: 20,
          jsonpath: '202202088dfa6ed227e7472ea091bcb975b44553.json',
          keywords: null,
          name: null,
          publicdata: 1,
          state: 1,
          thumbimg: null,
          updatetime: '2022-02-10T05:39:46.000+0000',
          userid: 58
        }
      ]
    }
  },
  created() {
    this.listItemOrder()
    listself(0, 10).then((res) => {
      console.log('editordata', res)
      this.editorlist = res.data
    })
  },
  methods: {

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
  width: 90%;
}

.el-row {
  margin-bottom: 0px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
</style>
