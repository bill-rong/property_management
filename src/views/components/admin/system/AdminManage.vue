<template>
  <div v-if = this.super>
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
        <el-form-item label="电话" prop="tel" label-width="40%" style="width: 80%;">
          <el-input v-model="row.tel" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="40%" style="width: 80%;">
          <el-input v-model="row.email" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="40%" style="width: 80%;">
          <el-input v-model="row.password" maxlength="10" show-word-limit></el-input>
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
      super: false,                  // 身份权限

      data: [
      {
        id: 1,
        name: 'test1',
        sex: '男',
        password: 321,
        tel: 1999911,
        email: '邮箱',
      },{
        id: 2,
        name: 'test2',
        sex: '男',
        password: 321,
        tel: 1230120,
        email: '邮箱',
      },{
        id: 3,
        name: 'test3',
        sex: '男',
        password: 321,
        tel: 1830090,
        email: '邮箱',
      },],

      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'tel',
        label: '电话',
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
        prop: 'email',
        label: '邮箱',
        sortable: true
      },{
        prop: 'password',
        label: '密码',
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

    console.log('super:', this.super);            // super是传入的权限
    if (this.super === false) {
      this.$message.error('不好意思哦，您不是super管理员，无法使用此功能');
    }else {
      this.super = true
    } 
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