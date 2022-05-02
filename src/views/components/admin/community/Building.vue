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
    <MyTabel :tableColumn="column" :tableData="data" :editShow="false" @handleDelete="handleDelete">
    </MyTabel>

    <el-dialog
      title="删除楼层"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确定删除吗？</span>
      <br>
      <span>楼层里的房间数据也会随之删除噢！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="buildingDelete">确 定</el-button>
      </span>
    </el-dialog>

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
import { getBuilding, addBuilding, deleteBuilding, getRoom } from '@/api/communityApi'
import Mode from '@/utils/Mode';
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
      roomList: [],
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
      deleteVisible: false,
      add: {
        name: '',
        layerNum: 1,
        roomNum: 1
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      clickId: ''
    }
  },
  created() {
    getBuilding().then(res => {
      this.data = res.data;
    })
    getRoom().then(res => {
      this.roomList = res.data;
    });
  },
  methods: {
    dialogSubmit() {
      if (!this.checkForm()) { return }
      if (this.data.find( item => {
        return item.name == this.add.name
        })) {
        this.$notify({
            title: '失败',
            message: "此楼已存在",
            type: 'error',
            duration: 2000
          });
        return
      }
      addBuilding(this.add).then(res => {
        this.$notify({
          title: '成功',
          message: `添加"${this.add.name}"楼成功`,
          type: 'success',
          duration: 2000
        });
        getBuilding().then(res => {
          this.data = res.data;
        })
      })
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
    },
    handleDelete(index, row) {
      this.clickId = row.id;
      this.deleteVisible = true;
    },
    buildingDelete(index, row) {
      if (this.roomList.find( item => {
        return item.building_id == this.clickId && item.resident_id != null
        })) {
        this.$notify({
            title: '失败',
            message: "此楼层有人居住中，无法直接删除，请前往系统管理",
            type: 'error',
            duration: 3000
          });
        return
      }
      deleteBuilding({id: this.clickId}).then(res => {
        if (res.data.mode == Mode.DELETE_SUCCES) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          getBuilding().then(res => {
            this.data = res.data;
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        }
      })
      this.deleteVisible = false;
    }
  }
}
</script>

<style>

</style>