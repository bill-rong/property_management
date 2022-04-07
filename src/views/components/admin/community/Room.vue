<template>
  <div>
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
import { getRoom, getBuilding } from '@/api/communityApi'
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
      buildingList: [],
      add: {
        building_id: 1,
        name: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
    }
  },
  created() {
    getRoom().then(res => {
      console.log(res.data);
      this.data = res.data;
    });
    getBuilding().then(res => {
      this.buildingList = res.data;
      this.add.building_id = this.buildingList[0].id;
    });
  },
  methods: {
    dialogSubmit() {
      this.getRoomName(1);
      if (!this.checkForm()) { return }
      this.$notify({
          title: '成功',
          message: `添加"${this.getRoomName(this.add.building_id)}"楼成功`,
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
    },
    getRoomName(_id) {
      let result = this.buildingList.find( (item) => {
        return item.id == _id
      })
      return result.name + this.add.name;
    }
  }
}
</script>

<style>

</style>