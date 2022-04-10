<template>
  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" 
      style="margin-bottom: 30px;">
      <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>物业缴费</el-breadcrumb-item>
      <el-breadcrumb-item>缴费</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <MyTabel :tableColumn="column" :tableData="data" :deleteShow="false" :editShow="false" :payShow="true"></MyTabel>
    </div>
  </el-tabs>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import {getUnPayByRoom} from '@/api/paymentApi'
import {getUser} from '@/api/userApi'
import { getUserInfo } from '@/utils/auth'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      column:[{
        prop: 'type',
        label: '类型',
        sortable: true
      },{
        prop: 'room',
        label: '房号',
        sortable: true
      },{
        prop: 'current',
        label: '数值'
      },{
        prop: 'curryear',
        label: '年',
        sortable: true
      },{
        prop: 'currmonth',
        label: '月',
        sortable: true
      },{
        prop: 'amount',
        label: '金额'
      }],
      data: [{

      }],
      room: ''
    }
  },
  created() {
    getUser(getUserInfo().tel).then(res => {
      this.room = res.data.room
      console.log("room1", this.room);
      getUnPayByRoom(this.room).then(res => {
        this.data = res.data
        console.log("data", this.data);
      })
    })
    
  }
  
}
</script>

<style>

</style>