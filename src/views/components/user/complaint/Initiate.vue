<template>

  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" 
      style="margin-bottom: 30px;">
      <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>报修</el-breadcrumb-item>
      <el-breadcrumb-item>上报</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-position="right" label-width="100px" style="width:400px; height: 96% !important;margin:0 auto;">
      <el-form-item label="联系人：">
        <el-input  placeholder="" v-model="data.contacts" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input  placeholder="" v-model="data.tel" disabled></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" placeholder="" v-model="data.describe"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" :plain="true" @click="submit()">上 报</el-button>
      </el-form-item>
    </el-form>
  </el-tabs>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { addRepair } from '@/api/complaintApi'
import { getUser } from '@/api/userApi'
export default {
  data() {
    return {
      water: 5,
      elec: 0.67,
      options: [{
        value: '水电维修',
        label: '水电维修'
      },{
        value: '堵塞',
        label: '堵塞'
      },{
        value: '家具门窗',
        label: '家具门窗'
      },{
        value: '消防设备',
        label: '消防设备'
      },{
        value: '清洁消毒',
        label: '清洁消毒'
      }],
      data: {
        contacts: '',
        tel: '',
        describe: ''
      },
      restaurants: [],
    }
  },
  updated() {
  },
  
  methods: {
    submit() {
      addRepair(this.data).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      })

    },
    
  },
  created() {
    this.data.contacts = getUserInfo().name;
    this.data.tel = getUserInfo().tel;
  }
}
</script>

<style>

</style>