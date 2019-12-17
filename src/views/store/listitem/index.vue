<template>
  <div class="app-container">
    <div id="app" class="container">
      <div class="tab-responsive">
        <table v-show="!editmod" class="table">
          <thead>
            <tr>
              <th style="width:10%">名称</th>
              <th style="width:20%">图片</th>
              <th style="width:10%">分类</th>
              <th style="width:20%">创建时间</th>
              <th style="width:5%">价格</th>
              <th style="width:5%">ID</th>
              <th style="width:5%">下载次数</th>
              <th style="width:5%">修改</th>
              <th style="width:5%">删除</th>
              <th style="width:5%">管理</th>
              <th style="width:5%">管理</th>
            </tr>
          </thead>
          <tbody id="container">
            <tr v-for="(itemVO,index) in storeitems" :key="itemVO.iId" align="center">
              <td> <span class="label label-info">{{ itemVO.itemname }}</span></td>
              <td><img class="img-thumbnail" :src="itemVO.imagepath" style="width:200px;"></td>
              <td>
                <select v-model="itemVO.categoryid" :data-itemid="itemVO.iId" @change="updateItemCategory($event)">
                  <option v-for="x in categorys" :key="x.categoryid" :value="x.categoryid">{{ x.description }}</option>
                </select>
              </td>

              <td>{{ new Date(itemVO.createtime).toLocaleString() }}</td>
              <td>{{ itemVO.itemprice }}</td>
              <td>{{ itemVO.iId }}</td>
              <td>{{ itemVO.itemprice }}</td>
              <td><button type="button" class="btn btn-sm btn-warning" :data-itemid="itemVO.iId" @click="editItem($event)">编辑</button></td>
              <td><button type="button" class="btn btn-sm btn-danger" :data-itemid="itemVO.iId" @click="deleteitem($event)">删除</button></td>
              <td><button
                v-if="itemVO.putaway==0"
                type="button"
                class="btn btn-sm btn-success"
                :data-itemid="itemVO.iId"
                :data-index="index"
                :data-putaway="1"
                @click="putAway($event)"
              >上架</button></td>
              <td><button
                v-if="itemVO.putaway==1"
                type="button"
                class="btn btn-sm btn-info"
                :data-itemid="itemVO.iId"
                :data-index="index"
                :data-putaway="0"
                @click="putAway($event)"
              >下架</button></td>
            </tr>
          </tbody>
        </table>
        <div v-show="editmod">
          <div class="text-center">
            <h3>资源修改</h3>
            <div class="form-group">
              <span class="btn-upload btn-file">
                展示图片
                <input id="pic" type="file" name="pic">
              </span>
            </div>
            <div class="form-group">
              <span class="btn-upload btn-file">
                展示视屏
                <input id="mov" type="file" multiple="multiple" name="mov">
              </span>
            </div>
            <div class="form-group">
              <span class="btn-upload btn-file">
                预览视屏
                <input id="previewVideo" type="file" multiple="multiple" name="previewVideo">
              </span>
            </div>

            <div class="form-group">
              <span class="btn-upload btn-file">
                勾边视频
                <input id="outlineMov" type="file" multiple="multiple" name="outlineMov">
              </span>
            </div>

            <div class="form-group">
              <span class="btn-upload btn-file">
                背景视屏
                <input id="backgroundMov" type="file" multiple="multiple" name="backgroundMov">
              </span>
            </div>

            <div class="form-group">
              <span class="btn-upload btn-file">
                粒子特效
                <input id="particleEffectAndroid" type="file" multiple="multiple" name="particleEffectAndroid">
              </span>
            </div>

            <div class="form-group">
              <span class="btn-upload btn-file">
                备用粒子
                <input id="particleEffectWin64" type="file" multiple="multiple" name="particleEffectWin64">
              </span>
            </div>

            <div class="form-group">
              <label id="movname">资源名称</label>
              <div>
                <input id="title" class="form-control" style="width:300px;height:20px;color:red;" type="text" name="title">
              </div>
            </div>

            <button id="upload" style="width:300px;height:50px;margin-top:20px;border-radius:30px;" class="button" @click="confirmUpdate">确认更新</button>
            <button id="upload" style="width:300px;height:50px;margin-top:20px;border-radius:30px;" class="button" @click="cancelUpdate">取消更新</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

import {
  updateCategory,
  getList,
  putAwayItem,
  deleteitem
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
      editmod: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.storeitems = response.data
        this.listLoading = false
      })
      getCategorys().then(response => {
        console.log('categorys:', response)
        this.categorys = response.data
      })
    },
    updateItemCategory: function(e) {
      var categoryid = e.currentTarget.value
      var itemid = e.srcElement.dataset.itemid
      console.log(categoryid, itemid)
      updateCategory(itemid, categoryid)
    },
    putAway: function(e) {
      var itemid = e.srcElement.dataset.itemid
      var putaway = e.srcElement.dataset.putaway
      var index = e.srcElement.dataset.index
      putAwayItem(itemid, putaway).then(data => {
        if (data.status === 'success') {
          this.storeitems[index].putaway = putaway
        }
      })
    },
    editItem: function(e) {
      var itemid = Number(e.srcElement.dataset.itemid)
      console.log(itemid)
      this.editmod = true
    },
    deleteitem: function(e) {
      var itemid = Number(e.srcElement.dataset.itemid)
      var delitem = this.storeitems.findIndex(item => item.iId === itemid)
      console.log(itemid, delitem, typeof this.storeitems[0].iId, typeof itemid)
      deleteitem(itemid).then(data => {
        if (data.status === 'success') {
          this.storeitems.splice(this.storeitems.findIndex((item) => item.iId === itemid), 1)
          this.$message({ message: '删除成功', type: 'success' })
        }
      })
    },
    confirmUpdate: function(e) {
      console.log(e)
      this.editmod = false
    },
    cancelUpdate: function(e) {
      this.editmod = false
    }

  }
}
</script>

<style>

</style>
