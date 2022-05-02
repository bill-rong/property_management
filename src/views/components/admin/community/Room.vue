<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>小区信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
      <el-breadcrumb-item>房</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button 
      type="primary" 
      @click="centerDialogVisible = true"
      style="float: right; width: 100px">
      添加
    </el-button>
    <el-tooltip class="item" effect="dark" content="刷新" placement="top">
      <div class="refresh" @click="refresh"><i class="el-icon-refresh"></i></div>
    </el-tooltip>
    <MyTabel :tableColumn="column" :tableData="data" :editShow="false" @handleDelete="handleDelete">
    </MyTabel>

    <el-dialog
      title="删除房间"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="roomDelete">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :rules="rules" ref="ruleForm" :model="add">
        <el-form-item label="楼名" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder="输入房号（如101）" v-model="add.name">
            <el-select v-model="add.building_id" slot="prepend" placeholder="所在楼" style="width:80px">
              <el-option
                v-for="item in buildingList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
          </el-input>
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
import { getRoom, getBuilding, deleteRoom, addRoom } from '@/api/communityApi'
import { Message } from 'element-ui';
import Mode from '@/utils/Mode';
export default {
  components: {
    MyTabel
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入房名"));
      } else {
        callback();
      }
    };
    return {
      data: [],
      column:[{
        prop: 'bdname',
        label: '所在楼',
        sortable: true
      },{
        prop: 'name',
        label: '房名',
        sortable: true
      },{
        prop: 'living',
        label: '居住中'
      },{
        prop: 'riname',
        label: '住户'
      }],
      centerDialogVisible: false,
      deleteVisible: false,
      buildingList: [],
      add: {
        building_id: 1,
        name: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      clickId: '',
      clickResId: ''
    }
  },
  created() {
    getRoom().then(res => {
      this.data = res.data;
    });
    getBuilding().then(res => {
      this.buildingList = res.data;
      this.add.building_id = this.buildingList[0].id;
    });
  },
  methods: {
    refresh() {
      getRoom().then(res => {
        this.data = res.data;
      });
    },
    dialogSubmit() {
      if (!this.checkForm()) { return }
      var postData = {
        building_id: this.add.building_id,
        name: this.getRoomName(this.add.building_id)
      }
      if (this.data.find( item => {
        return item.name == postData.name
        })) {
        this.$notify({
            title: '失败',
            message: "此房间已存在",
            type: 'error',
            duration: 2000
          });
        return
      }
      addRoom(postData).then(res => {
        if (res.data.mode == Mode.ADD_SUCCESS) {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            type: 'success',
            duration: 2000
          });
          getRoom().then(res => {
            this.data = res.data;
          });
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          });
        }

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
    getRoomName(_id) {
      let result = this.buildingList.find( (item) => {
        return item.id == _id
      })
      return result.name + this.add.name;
    },
    handleDelete(index, row) {
      this.clickId = row.id;
      this.clickResId = row.resident_id
      this.deleteVisible = true;
    },
    roomDelete(index, row) {
      if (this.clickResId != null) {
        this.$notify({
            title: '失败',
            message: "有人居住中，无法直接删除，请前往系统管理",
            type: 'error',
            duration: 2000
          });
        return
      }
      deleteRoom({id: this.clickId}).then(res => {
        if (res.data.mode == Mode.DELETE_SUCCES) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          getRoom().then(res => { this.data = res.data });
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
.refresh {
  float: right;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 24px;
  margin-right: 10px;
}
</style>