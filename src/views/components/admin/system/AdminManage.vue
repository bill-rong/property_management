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
      <el-form ref="ruleForm" :model="add">
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
        <el-form-item label="密码" prop="permission" label-width="40%" style="width: 80%;">
          <el-input v-model="row.permission" maxlength="10" show-word-limit></el-input>
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
import { getUserInfo } from '@/utils/auth'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      editDialogVisible: false,   // 编辑弹窗按钮
      row:{},                     // 存储点击行的信息
      super: false,                  // 身份权限

      data: [
      {
        id: 1,
        name: 'test1',
        sex: '男',
        permission: 321,
        tel: 1999911,
        email: '邮箱',
      },{
        id: 2,
        name: 'test2',
        sex: '男',
        permission: 321,
        tel: 1230120,
        email: '邮箱',
      },{
        id: 3,
        name: 'test3',
        sex: '男',
        permission: 321,
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
        prop: 'permission',
        label: '权限',
        sortable: true
      },],

      centerDialogVisible: false,
      
      add: {
        name: '',
        layerNum: 1,
        roomNum: 1
      },
      
      
    }
  },
  created() {
    this.super = getUserInfo().permission == 'super';
    if (this.super) {

    } else {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$confirm('你的权限不足无法访问！', '提示', {
        confirmButtonText: '返回',
        showClose: false,
        showCancelButton: false,
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.back();
        loading.close();
      });
      
    }
  },
  methods: {
    edit(index, row) {
      console.log('编辑按钮点击', index, row);
      this.editDialogVisible = true;
      this.row = row
    },


    dialogSubmit() {
      this.$notify({
          title: '成功',
          message: `添加"${this.add.name}"楼成功`,
          type: 'success',
          duration: 2000
        });
      this.centerDialogVisible = false;
    }
  }
}
</script>

<style>

</style>