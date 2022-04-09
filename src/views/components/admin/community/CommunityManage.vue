<template>
  <el-tabs type="border-card" style="height: 100% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" 
    style="margin-bottom: 30px;">
      <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>小区信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-tab-pane label="小区基本信息" class="tab-pane" style="padding: 30px"> -->
      <el-form label-position="right" label-width="100px" style="width:400px; height: 96% !important;margin:0 auto;">
        <el-form-item label="小区名：">
          <el-input  placeholder="" v-model="community.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="community.describe">
          </el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input  placeholder="" v-model="community.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input  placeholder="" v-model="community.phone"></el-input>
        </el-form-item>
        <el-form-item label="建立时间：">
          <el-date-picker
            v-model="community.created"
            type="date"
            placeholder="选择日期"
            style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :plain="true" @click="submit()">确认修改</el-button>
        </el-form-item>
      </el-form>
    <!-- </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import { getCommunity, updateCommunity } from '@/api/communityApi'
export default {
  data() {
    return {
      community: {
        name: '',
        created: '',
        describe: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {
    getCommunity().then(res => {
      this.community = res.data;
    })
  },
  methods: {
    submit(){
      updateCommunity(this.community).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      })
    }
  }
}
</script>

<style>
/* .tab-pane, .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
} */
</style>