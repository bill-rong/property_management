<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>小区信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
      <el-breadcrumb-item>楼</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button 
      type="primary" 
      @click="centerDialogVisible = true"
      style="float: right; width: 100px">
      添加
    </el-button>
    <MyTabel :tableColumn="column" :tableData="data">
    </MyTabel>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :rules="rules" ref="ruleForm" :model="add">
        <el-form-item label="楼名" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="add.name" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="层数" label-width="40%" style="width: 80%;">
          <el-input-number v-model="add.layerNum" :min="1" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="房数/层" label-width="40%" style="width: 80%;">
          <el-input-number v-model="add.roomNum" :min="1" :max="10"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getBuilding } from '@/api/communityApi'
export default {
  components: {
    MyTabel
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入楼名"));
      } else {
        callback();
      }
    };
    return {
      data: [],
      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '楼名',
        sortable: true
      }],
      centerDialogVisible: false,
      add: {
        name: '',
        layerNum: 1,
        roomNum: 1
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      
    }
  },
  created() {
    getBuilding().then(res => {
      this.data = res.data;
    })
  },
  methods: {
    dialogSubmit() {
      if (!this.checkForm()) { return }
      this.$notify({
          title: '成功',
          message: `添加"${this.add.name}"楼成功`,
          type: 'success',
          duration: 2000
        });
      this.centerDialogVisible = false;
    },
    checkForm() {
      let isNormal = false;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          isNormal = true;
        } else {
          isNormal = false;
        }
      });
      return isNormal;
    }
  }
}
</script>

<style>

</style>