<template>
  <div class="selectorgroup">
    <el-row style="display: flex;flex-direction: row;">
      <el-col :span="24">
        <el-select v-model="provinceid" class="selecter" filterable placeholder="省" size="mini" @change="Listcities(provinceid)">
          <el-option v-for="item in provinces" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
            <span style="float: left">{{ item.areaName }}</span>
          </el-option>
        </el-select>
        <span class="space" />
        <el-select v-model="cityid" class="selecter" filterable no-match-text="" placeholder="市" size="mini" @change="Listareas(cityid)">
          <el-option v-for="item in cities" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
            <span style="float: left;">{{ item.areaName }}</span>
          </el-option>
        </el-select>
        <span class="space" />
        <el-select v-model="selectcode" class="selecter" filterable placeholder="区" size="mini" @change="areacodeChange">
          <el-option v-for="item in areas" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
            <span style="float: left">{{ item.areaName }}</span>
          </el-option>
        </el-select>
        <span class="space" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  listposition
} from '@/api/area'
export default {
  name: 'PositionSelector',
  model: {
    prop: 'areacode',
    event: 'acc'
  },
  props: {
    // areacode: {
    //   default: 0
    // },
    areatext: {
      type: String,
      default: '地址'
    },
    areadetail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      provinces: [],
      cities: [],
      areas: [],
      provinceid: '',
      cityid: '',
      selectcode: '',
      editmode: true
    }
  },
  created() {
    this.Listprovince()
  },
  methods: {
    Listprovince() {
      listposition(100000, 1).then(result => { // 100000对应中国area_code
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
    },
    clear() {
      Object.assign(this.$data, this.$options.data()) // 初始化数据
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/orderstyle.scss";

  .selecter {
    width: 80px;
  }

  .space {
    margin: 0 1px;
  }

  .input {
    width: 60px;
  }
</style>
