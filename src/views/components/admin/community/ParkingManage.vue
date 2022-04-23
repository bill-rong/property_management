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
        @click="addVisible = true"
        style="width: 100px">
        添加
      </el-button>
    </div>
    <!-- <el-tab-pane label="停车位管理" class="tab-pane" style="height: 700px !important;"> -->
      <el-scrollbar >
        <Parking v-for="item in data" :parkingInfo="item" :key="item.id" @reload="reloadData"></Parking>
      </el-scrollbar>
    <!-- </el-tab-pane> -->

    <el-dialog
      title="添加停车位"
      :visible.sync="addVisible"
      width="30%"
      center>
      <el-form ref="ruleForm" :model="add">
        <el-form-item label="车位名" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="add.name" placeholder="如：P1001" maxlength="11" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAdd">确 定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
import Parking from './Parking.vue'
import { addParking, getParking } from '@/api/communityApi'
import Mode from '@/utils/Mode'
import { showSuccessMsg } from '@/utils/msg'
export default {
  components: {
    Parking
  },
  data() {
    return {
      addVisible: false,
      data: [],
      add: {
        name: ''
      },
      reload: 0
    }
  },
  created() {
    getParking().then(res => {
      this.data = res.data;
      console.log(this.data[2]);
    })
  },
  methods: {
    dialogAdd() {
      addParking(this.add).then(res => {
        if (res.data.mode = Mode.ADD_SUCCESS) {
          // location.reload();
          // this.reload++;
          showSuccessMsg(`添加停车位${this.add.name}成功`);
          this.reload();
        } else {
          this.$message({message: "添加失败"});
        }
        
      })
      this.addVisible = false;
    },
    reloadData() {
      getParking().then(res => {
        this.data = res.data;
      })
    }
  },
  
}
</script>

<style>

</style>