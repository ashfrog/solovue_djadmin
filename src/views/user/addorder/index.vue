<template>
  <div class="app-container">
    <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">用户手机号:</el-tag>
      <el-input v-model="telphone" size="mini" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">购买数量:</el-tag>
      <el-input v-model="count" size="mini" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">备注:</el-tag>
      <el-input v-model="bindcode" size="mini" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-button class="midbtn" size="medium" type="primary" @click="addOrder">提交</el-button>
    </div>
  </div>
</template>

<script>
import {
  addBindOrder
} from '@/api/user'

export default {
  data() {
    return {
      telphone: '',
      count: 1,
      bindcode: 0
    }
  },
  created() {

  },
  methods: {
    addOrder() {
      addBindOrder(this.telphone, this.count, this.bindcode).then(response => {
        this.$message({
          message: response,
          type: 'success'
        })
      })
    },
    changedata(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tbrow {
    display: flex;
    flex-direction: column;
    margin: 10px;
    justify-content: center;
    align-items: center;
  }

  .tbtag {
    width: 100%;
  }

  .app-container {
    width: 500px;
    margin: auto;
  }

  .midbtn{
   width: 100%;
  }
</style>
