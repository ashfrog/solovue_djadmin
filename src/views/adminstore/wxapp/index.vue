<template>
  <div class="components-container">
    <el-form ref="form" :model="codeparam" label-width="80px">
      <el-form-item label="path">
        <el-input v-model="codeparam.path" size="mini" />
      </el-form-item>
      <el-form-item label="scene">
        <el-input v-model="codeparam.scene" size="mini" />
      </el-form-item>
      <el-form-item label="platform">
        <el-select v-model="codeparam.platform" filterable placeholder="请选择小程序" size="mini">
          <el-option v-for="appinfo in appinfos" :key="appinfo.id" :label="appinfo.info" :value="appinfo.platform">
            <span style="float: left">{{ appinfo.info }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onGenerate">生成小程序码</el-button>
      </el-form-item>
    </el-form>
    <img v-show="showimg" :src="base64img" class="codeimg">
  </div>
</template>
<script>
import {
  getwxacodeunlimit,
  listappinfo
} from '@/api/wxapp'
// import PositionSelector from '@/components/PositionSelector'
// import {
//   requestdealer
// } from '@/api/userdealer.js'

export default {
  data: function() {
    return {
      base64img: '',
      showimg: false,
      appinfos: [],
      codeparam: {
        scene: '&mac=',
        path: 'pages/store/store',
        platform: 'wx_crazysolo'
      }
    }
  },
  async created() {
    this.getappinfos()
  },

  mounted() {

  },
  methods: {
    onGenerate() {
      this.getwxcode()
    },
    async getappinfos() {
      const res = await listappinfo()
      this.appinfos = res.data
      console.log(this.appinfos)
    },

    async getwxcode() {
      this.showimg = false

      const res2 = await getwxacodeunlimit(this.codeparam.scene, this.codeparam.path, this.codeparam.platform)
      this.base64img = 'data:image/jpeg;base64,' + res2
      this.showimg = true
    }
  }
}
</script>

<style scoped>
  .btn-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .btnstyle {
    width: 100px;
    height: 30px;
    line-height: 30px;
  }

  .codeimg {
    width: 200px;
    height: 200px;
  }
</style>
