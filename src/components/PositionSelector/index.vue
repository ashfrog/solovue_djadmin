<template>
  <div>
    <el-select v-model="provinceid" placeholder="请选择省" size="mini" @change="Listcities(provinceid)">
      <el-option v-for="item in provinces" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left">{{ item.areaName }}</span>
      </el-option>
    </el-select>

    <el-select v-model="cityid" placeholder="请选择市" size="mini" style="margin:0 10px" @change="Listareas(cityid)">
      <el-option v-for="item in cities" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left">{{ item.areaName }}</span>
      </el-option>
    </el-select>

    <el-select v-model="areacode" placeholder="请选择区县" size="mini" @change="areacodeChange">
      <el-option v-for="item in areas" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
        <span style="float: left">{{ item.areaName }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {
    listposition
  } from '@/api/area'
  export default {
    name: 'PositionSelector',
    props: {
    },
    created() {
      this.Listprovince()
    },
    data() {
      return {
        provinces: [],
        cities: [],
        areas: [],
        provinceid: '',
        cityid: '',
        areacode: ''
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
      },
      Listareas(cityid) {
        listposition(cityid, 3).then(result => {
          this.areas = result.data
        })
      },
      areacodeChange() {
        this.$emit('areacodeChange', this.areacode)
      },
    },

  }
</script>

<style>
</style>
