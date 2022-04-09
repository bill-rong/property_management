<template>
  <div>
    <el-button 
      type="primary" 
      @click="centerDialogVisible = true"
      style="float: right; width: 100px">
      添加
    </el-button>
    <MyTabel :tableColumn="column" :tableData="data" @edit="edit">
    </MyTabel>

    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form :rules="rules" ref="ruleForm" :model="add">
        <el-form-item label="姓名" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="row.name" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="40%" style="width: 80%;">
          <el-input v-model="row.sex" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="40%" style="width: 80%;">
          <el-input v-model="row.password" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="居住状态" prop="living" label-width="40%" style="width: 80%;">
          <el-input v-model="row.living" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date" label-width="40%" style="width: 80%;">
          <el-input v-model="row.date" maxlength="10" show-word-limit></el-input>
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
import { getUser } from '@/api/userApi'
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
      editDialogVisible: false,   // 编辑弹窗按钮
      row:{},                     // 存储点击行的信息

      data: [
      {
        id: 1,
        name: 'test1',
        sex: '男',
        password: 321,
        living: '居住中',
        date: '4/9',
      },{
        id: 2,
        name: 'test2',
        sex: '女',
        password: 321,
        living: '居住中',
        date: '4/8',
      },{
        id: 3,
        name: 'test3',
        sex: '男',
        password: 321,
        living: '居住中',
        date: '4/7',
      },],

      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '姓名',
        sortable: true
      },{
        prop: 'sex',
        label: '性别',
        sortable: true
      },{
        prop: 'password',
        label: '密码',
        sortable: true
      },{
        prop: 'living',
        label: '居住状态',
        sortable: true
      },{
        prop: 'date',
        label: '日期',
        sortable: true
      },],

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
    // getUser().then(res => {
    //   this.data = res.data;
    // })
  },
  methods: {
    edit(index, row) {
      console.log('编辑按钮点击', index, row);
      this.editDialogVisible = true;
      this.row = row
    },


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