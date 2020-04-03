<template>
  <div class="app-container">
    <!-- <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">用户手机号:</el-tag>
      <el-input v-model="telphone" size="medium" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">购买数量:</el-tag>
      <el-input v-model="count" size="medium" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-tag class="tbtag" size="medium" type="info">备注:</el-tag>
      <el-input v-model="bindcode" size="medium" @change="changedata" />
    </div>
    <div class="tbrow">
      <el-button class="midbtn" size="medium" type="primary" @click="addOrder">提交</el-button>
    </div> -->

    <el-form  label-width="100px" :model="bindorder">
      <el-input v-model="bindorder.telphone" label-width="100px" placeholder="请输入用户的手机号">
        <template slot="prepend">用户:</template>
      </el-input>
      <div style="margin: 20px;" />
      <el-input v-model="bindorder.count" placeholder="请输入购买数量">
        <template slot="prepend">数量:</template>
      </el-input>
      <div style="margin: 20px;" />
      <el-input v-model="bindorder.bindcode" placeholder="请输入内容">
        <template slot="prepend">备注:</template>
      </el-input>
      <div style="margin: 20px;" />
      <el-button class="midbtn" size="medium" type="primary" @click="addOrder">提交</el-button>
    </el-form>
    <!-- <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;" />
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <el-form-item label="用户手机号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="购买数量">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
      <el-form-item label="">
        <el-button class="midbtn" size="medium" type="success" plain @click="addOrder">提交</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import {
  addBindOrder
} from '@/api/user'

export default {
  data() {
    return {
      bindorder: {
        telphone: '',
        count: '',
        bindcode: ''
      }
    }
  },
  created() {

  },
  methods: {
    addOrder() {
      addBindOrder(this.bindorder.telphone, this.bindorder.count, this.bindorder.bindcode).then(response => {
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
    margin: 1px 0
  }

  .app-container {
    width: 500px;
    margin: auto;
  }

  .midbtn {
    width: 100%;
  }
</style>
