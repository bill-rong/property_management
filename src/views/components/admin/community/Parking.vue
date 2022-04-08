<template>
  <el-card shadow="always" class="park-card">
    <!-- <el-empty :image-size="100">
      <el-button type="primary">按钮</el-button>
    </el-empty> -->
    <div class="park-name">A1111
      <hr color="#409EFF">
    </div>
    
    <el-image
      style="width: 100px;"
      :src="imgSrc"
      fit="cover">
    </el-image>
    <div class="park-name"><span>{{this.parkingInfo.license}}</span></div>
    <div class="park-name"><span>{{this.parkingInfo.riName}}</span></div>
    <el-button type="danger" round size="small" v-if="isBing">解绑</el-button>
    <el-button type="success" round size="small" v-if="!isBing">绑定</el-button>
  </el-card>
</template>

<script>
export default {
  props: {
    parkingInfo: {
      type: Object,
      default: {
        id: 1,
        name: 'P1001',
        riId: 1,
        riName: 'Bill',
        license: '粤P 53F25'
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isBing() {
      return Object.keys(this.parkingInfo).length > 0
    },
    imgSrc() {
      if (this.isBing) {
        return require('../../../../assets/img/bind_resident.png');
      } else {
        return require('../../../../assets/img/unbind_resident.png');
      }
    }
  }

}
</script>

<style>
.park-name {
  font-weight:bold;
  font-size: 16px;
  margin-bottom: 6px;
}
.park-card {
  width: 170px;
  display: inline-block;
  background-color: #fafafa;
  border: 1px solid #409EFF;
  margin: 5px 10px;
}
</style>