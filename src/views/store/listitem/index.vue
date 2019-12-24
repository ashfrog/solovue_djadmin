<template>
  <div class="app-container">
    <div id="app" class="container">
      <div class="tab-responsive">
        <table v-show="!editmod" class="table">
          <thead>
            <tr class="tr-text">
              <th style="width:10%">图片</th>
              <th style="width:10%">名称</th>
              <th style="width:8%">分类</th>
              <th style="width:5%">价格</th>
              <th style="width:10%">创建时间</th>
              <th style="width:5%">ID</th>
              <th style="width:5%">下载次数</th>
              <th style="width:5%">删除</th>
              <th style="width:5%">上线</th>
            </tr>
          </thead>
          <tbody id="container">
            <tr v-for="(itemVO,index) in storeitems" :key="itemVO.iId" class="tr-text" align="center">
              <td><img class="img-thumbnail" :src="itemVO.imagepath"></td>
              <td>
                <el-input v-model="itemVO.itemname" size="mini" @change="changedata" @blur="(e)=>{onNameInputBlur(e,itemVO)}" />
              </td>
              <td>
                <el-select v-model="itemVO.categoryid" calue-key="id" size="mini" :data-itemid="itemVO.iId" @change="updateItemCategory($event,itemVO.iId)">
                  <el-option
                    v-for="category in categorys"
                    :key="category.categoryid"
                    size="mini"
                    :value="category.categoryid"
                    :label="category.description"
                  />
                </el-select>
              </td>
              <td>
                <el-input v-model="itemVO.itemprice" size="mini" @change="changedata" @blur="(e)=>{onPriceInputBlur(e,itemVO)}" />
              </td>
              <td>{{ new Date(itemVO.createtime).toLocaleString() }}</td>

              <td>{{ itemVO.iId }}</td>
              <td>{{ itemVO.itemprice }}</td>
              <td>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle :data-itemid="itemVO.iId" @click="(e)=>{deleteitem(e,itemVO.iId)}" />
              </td>
              <td>
                <el-switch v-model="itemVO.putaway" :active-value="1" :inactive-value="0" @change="(e)=>{putAway(e, index, itemVO.iId, itemVO.putaway)}" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="totalItemCount" :page-size="pageSize" @current-change="pageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  updateCategory,
  getListByPage,
  putAwayItem,
  deleteitem,
  updatePrice,
  updateName,
  selectCount
} from '@/api/storeitem'
import {
  getCategorys
} from '@/api/categorys'
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
      list: null,
      listLoading: true,
      storeitems: [],
      categorys: [],
      editmod: false,
      totalItemCount: 0,
      pageSize: 8,
      dataChange: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getListByPage(this.pageSize, 0).then(response => {
        this.storeitems = response.data
        this.listLoading = false
      })
      getCategorys().then(response => {
        console.log('categorys:', response)
        this.categorys = response.data
      })
      selectCount().then(response => {
        this.totalItemCount = response.data
      })
    },
    changedata: function() {
      this.dataChange = true
    },
    updateItemCategory: function(category_id, event_itemid) {
      console.log(event_itemid, category_id)
      var categoryid = category_id
      var itemid = event_itemid
      updateCategory(itemid, categoryid)
    },
    putAway: function(e, index, itemid, on) {
      console.log(index, itemid, on)
      var putaway = on ? 1 : 0
      putAwayItem(itemid, putaway).then(data => {
        if (data.status === 'success') {
          // this.storeitems[index].putaway = on
        }
      })
    },
    editItem: function(e) {
      var itemid = Number(e.srcElement.dataset.itemid)
      console.log(itemid)
      this.editmod = true
    },
    deleteitem: function(e, itemid) {
      var delitem = this.storeitems.findIndex(item => item.iId === itemid)
      console.log(itemid, delitem, typeof this.storeitems[0].iId, typeof itemid)

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteitem(itemid).then(data => {
          if (data.status === 'success') {
            this.storeitems.splice(this.storeitems.findIndex((item) => item.iId === itemid), 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        console.log('已取消删除')
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    onPriceInputBlur: function(e, item) {
      if (this.dataChange) {
        updatePrice(item.iId, item.itemprice).then(data => {
          if (data.status === 'success') {
            console.log(data)
            this.dataChange = false
          }
        })
      }
    },
    onNameInputBlur: function(e, item) {
      if (this.dataChange) {
        updateName(item.iId, item.itemname).then(data => {
          if (data.status === 'success') {
            console.log(data)
            this.dataChange = false
          }
        })
      }
    },
    confirmUpdate: function(e) {
      console.log(e)
      this.editmod = false
    },
    cancelUpdate: function(e) {
      this.editmod = false
    },
    pageChange: function(e) {
      var pageindex = e
      getListByPage(this.pageSize, (pageindex - 1) * this.pageSize).then(response => {
        this.storeitems = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
  table {
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #F0F0F0;
  }

  .img-thumbnail {
    width: 100px;
    height: 60px;
    border-radius: 4px;
    display: block;
    margin: auto;
  }

  .tr-text {
    color: #0074D9;
    font-size: 12px;
  }
</style>
