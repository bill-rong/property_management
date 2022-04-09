<template>  
  <el-tabs type="border-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>小区信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>停车位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width:100%;text-align:right;margin-bottom:6px">
      <el-button 
        type="primary" 
        @click="centerDialogVisible = true"
        style="width: 100px">
        添加
      </el-button>
    </div>
    <!-- <el-tab-pane label="停车位管理" class="tab-pane" style="height: 700px !important;"> -->
      <el-scrollbar >
        <Parking v-for="item in data" :parkingInfo="item" :key="item.id"></Parking>
      </el-scrollbar>
    <!-- </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import Parking from './Parking.vue'
export default {
  components: {
    Parking
  },
  data() {
    return {
      data: [{
        id: 1,
        name: 'P1001',
        riId: 1,
        riName: 'Bill',
        license: '粤P 53F25'
      },{
        id: 2,
        name: 'P1002',
        riId: 1,
        riName: '廖弼镕',
        license: '粤P 565R4'
      },{
        id: 3,
        name: 'P1003',
        riId: 1,
        riName: '马熙然',
        license: '粤B LK546'
      },{
        id: 4,
        name: 'P1004',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1005',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 6,
        name: 'P1006',
        riId: 6,
        riName: 'sofia',
        license: '粤A Q2646'
      },{
        id: 5,
        name: 'P1007',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1008',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1009',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1010',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1011',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1012',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1013',
        riId: '',
        riName: '',
        license: ''
      },{
        id: 5,
        name: 'P1014',
        riId: '',
        riName: '',
        license: ''
      }]
    }
  }

}
</script>

<style>

</style>