<template>
  <div v-if = this.super>
    <el-button 
      type="success" 
      @click="addDialogVisible = true"
      style="float: left; width: 100px">
      添加管理员
    </el-button>
    <MyTabel :tableColumn="column" :tableData="data" @edit="edit" @handleDelete="handleDelete">
    </MyTabel>

    <!-- 修改信息dialog -->
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
          <el-select v-model="row.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="tel" label-width="40%" style="width: 80%;">
          <el-input v-model="row.tel" maxlength="11" disabled show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="40%" style="width: 80%;">
          <el-input v-model="row.email" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permission" label-width="40%" style="width: 80%;">
          <el-switch
            v-model="rowPermission"
            @change="switchChange"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="super"
            inactive-text="normal">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加管理员dialog -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="30%"
      center>
      <el-form ref="ruleForm" :model="add">
        <el-form-item label="姓名" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="add.name" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="40%" style="width: 80%;">
          <el-select v-model="add.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="tel" label-width="40%" style="width: 80%;">
          <el-input v-model="add.tel" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="40%" style="width: 80%;">
          <el-input v-model="add.email" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permission" label-width="40%" style="width: 80%;">
          <el-select v-model="add.permission" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in perOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getAll, updatePermission, deleteAdmin, updateInfo, addAdmin } from '@/api/adminApi'
import { getUserInfo } from '@/utils/auth'
import Mode from '@/utils/Mode'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      editDialogVisible: false,   // 编辑弹窗按钮
      addDialogVisible: false,
      row:{},                     // 存储点击行的信息
      rowPermission: false,
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

      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      perOptions: [{
        value: 'normal',
        label: 'normal'
      }, {
        value: 'super',
        label: 'super'
      }],
      
      add: {
        tel: '',
        name: '',
        sex: '1',
        email: '',
        permission: 'normal'
      },
      
      
    }
  },
  created() {
    this.super = getUserInfo().permission == 'super';
    if (this.super) {
      getAll().then(res => { this.data = res.data });
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
      this.row = row;
      this.rowPermission = row.permission == 'super'
    },
    handleDelete(index, row) {
      this.$confirm(`确定删除 '${row.name}' 管理员吗`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteAdmin(row.tel).then(res => {
          if (res.data.mode == Mode.DELETE_SUCCES) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            getAll().then(res => { this.data = res.data });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      }).catch(() => {
        console.log("取消");
      })
    },
    switchChange() {
      let obj = {};
      obj.permission = this.rowPermission ? 'super' : 'normal';
      obj.tel = this.row.tel;
      console.log(obj);
      updatePermission(obj).then(res => {
        if (res.data.mode == Mode.UPDATE_SUCCESS) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          getAll().then(res => { this.data = res.data });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    },
    dialogSubmit() {
      console.log(this.row);
      let obj = {};
      obj.tel = this.row.tel;
      obj.name = this.row.name;
      obj.sex = this.row.sex;
      obj.email = this.row.email;
      updateInfo(obj).then(res => {
        if (res.data.mode == Mode.UPDATE_INFO_SUCCESS) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          getAll().then(res => { this.data = res.data });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })

      this.editDialogVisible = false;
    },
    // 添加管理员确认
    addSubmit() {
      addAdmin(this.add).then(res => {
        if (res.data.mode == Mode.ADD_SUCCESS) {
          this.$notify({
            title: '操作结果',
            message: res.data.msg + "\n默认密码为'12345678'",
            type: 'success',
            duration: 5000
          });
          this.addDialogVisible = false;
          getAll().then(res => { this.data = res.data });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    }
  }
}
</script>

<style>

</style>