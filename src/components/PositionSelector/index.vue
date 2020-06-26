<template>
  <div>
    <el-select class="selecter" filterable v-model="provinceid" placeholder="请选择省" size="mini" @change="Listcities(provinceid)">
      <el-option v-for="item in provinces" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left">{{ item.areaName }}</span>
      </el-option>
    </el-select>
    <span class="space"></span>
    <el-select class="selecter" filterable no-match-text="" v-model="cityid" placeholder="请选择市" size="mini" @change="Listareas(cityid)">
      <el-option v-for="item in cities" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left;">{{ item.areaName }}</span>
      </el-option>
    </el-select>
    <span class="space"> </span>
    <el-select class="selecter" filterable v-model="selectcode" placeholder="请选择区县" size="mini" @change="areacodeChange">
      <el-option v-for="item in areas" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left">{{ item.areaName }}</span>
      </el-option>
    </el-select>
    <span class="space"> </span>
  </div>
</template>

<script>
  import {
    listposition
  } from '@/api/area'
  export default {
    name: 'PositionSelector',
    props: ['areacode'],
    model: {
      prop: 'areacode',
      event: 'acc'
    },
    created() {
      console.log("创建自定义控件")
      this.Listprovince()
    },
    data() {
      return {
        provinces: [],
        cities: [],
        areas: [],
        provinceid: '',
        cityid: '',
        selectcode: ''
      }
    },
    methods: {
      Listprovince() {
        listposition(100000, 1).then(result => { //100000对应中国area_code
          this.provinces = result.data
        })
      },
      Listcities(provinceid) {
        listposition(provinceid, 2).then(result => {
          this.cities = result.data
        })
        this.cityid = ''
      },
      Listareas(cityid) {
        listposition(cityid, 3).then(result => {
          this.areas = result.data
        })
        this.selectcode = ''
      },
      areacodeChange() {
        this.$emit('acc', this.selectcode)
        // this.$emit('areacodeChange', this.areacode)
      },
      clear() {
        Object.assign(this.$data, this.$options.data()) //初始化数据
      },
    },

  }
</script>

<style scoped>
  .selecter {
    width: 120px;
  }

  .space {
    margin:0 2px;
  }

  .input{
    width:60px;
  }
</style>
