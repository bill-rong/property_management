<template>
  <div>
    <div class="header">
      <el-button class="sbtn" type="success" @click="addDialogVisible = true">添加住户</el-button>
      <el-input placeholder="请输入您所要查询的记录" 
       @clear="searchClear" v-model="input" clearable style="margin: 0 10px; width: 20%"></el-input>
      <el-button class="sbtn" type="primary" @click="searchInput()">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="showData" 
      :editShow="false" :resetShow="true" :checkShow="true"
      @handleDelete="handleDelete" @reset="reset" @check="handleCheck">
    </MyTabel>

    <el-dialog
      title="添加住户"
      :visible.sync="addDialogVisible"
      width="30%"
      center>
        <el-form :model="addUserData" :rules="rules" ref="ruleForm">
          <el-form-item label="手机号：" prop="tel" label-width="40%" style="width: 80%;">
            <el-input v-model="addUserData.tel" maxlength="11" placeholder="输入住户手机号" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idcard" label-width="40%" style="width: 80%;">
            <el-input v-model="addUserData.idcard" maxlength="18" placeholder="输入住户身份证号" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="name" label-width="40%" style="width: 80%;">
            <el-input v-model="addUserData.name" placeholder="输入住户真实姓名" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex" label-width="40%" style="width: 80%;">
            <el-select v-model="addUserData.sex" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房号：" prop="room" label-width="40%" style="width: 80%;">
            <el-select v-model="addUserData.room" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in roomList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email" label-width="40%" style="width: 80%;">
            <el-input v-model="addUserData.email" placeholder="输入住户电子邮箱" show-word-limit>
            </el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogSubmit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="重置密码"
      :visible.sync="resetDialogVisible"
      width="20%"
      center>
      <label style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <span>确定重置密码吗？</span>
        <span>重置后密码为：12345678</span>
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="其他信息"
      :visible.sync="infoDialogVisible"
      width="20%">
      <el-descriptions class="margin-top" title="" :column="1" border>
        <el-descriptions-item>
          <template slot="label"> 房 号 </template>
          {{ infoRoom }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 入住时间 </template>
          {{ infoDate }}
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getAllUser, resetPassword, userIsExist, addUser, getUser, deleteUser } from '@/api/userApi'
import { getRoomUnLiving } from '@/api/communityApi'
import MODE from "@/utils/Mode"
import Mode from '@/utils/Mode'
export default {
  components: {
    MyTabel
  },
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else {
        callback();
      }
    };
    var validateIdcard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("身份证号不能为空"));
      } else if (value.length < 18) {
        callback(new Error("身份证号长度为18"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("名字不能为空"));
      } else {
        callback();
      }
    };
    return {
      resetDialogVisible: false,
      addDialogVisible: false,
      infoDialogVisible: false,
      row:{},                     // 存储点击行的信息
      input: '',
      data: [],
      addUserData: {
        tel: '',
        idcard: '',
        sex: '1',
        name: '',
        email: '',
        room: ''
      },
      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '姓名',
        sortable: true
      },{
        prop: 'tel',
        label: '手机号'
      },{
        prop: 'idcard',
        label: '身份证号',
        sortable: true
      },{
        prop: 'email',
        label: '邮箱'
      },{
        prop: 'sex',
        label: '性别'
      }],
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      centerDialogVisible: false,
      rules: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        idcard: [{ validator: validateIdcard, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur"}],
      },
      showData: [],
      roomList: [],
      infoRoom: '',
      infoDate: '',
    }
  },
  created() {
    this.bindData();
  },
  methods: {
    reset(index, row) {
      console.log('重置按钮点击', index, row);
      this.resetDialogVisible = true;
      this.row = row
    },

    // 通过输入查询
    searchInput(){
      this.showData = this.data.filter(item => {
        return item.tel.search(this.input) != -1;
      })
      console.log(this.showData);
    },

    // 取消搜索
    searchClear() {
      this.showData = this.data
    },

    // 删除操作
    handleDelete(index, row){
      console.log('删除', index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id);
        deleteUser({id: row.id}).then(res => {
          if (res.data.mode == MODE.DELETE_SUCCES) {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            this.bindData();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    // 查看
    handleCheck(index, row) {
      this.infoDate = row.date;
      getUser(row.tel).then(res => {
        this.infoRoom = res.data.room
      })
      this.infoDialogVisible = true;
    },
    // 添加住户
    addDialogSubmit() {
      if (!this.checkForm()) return;
      userIsExist({tel: this.addUserData.tel}).then(res => {
        if (res.data.mode == MODE.USER_IS_EXIST) {
          // exist
          console.log(0);
          return new Promise((resolve, reject) => { reject(res.data) })
        } else if (res.data.mode == MODE.USER_NOT_EXIST) {
          // not exist
          console.log(1);
          return new Promise((resolve, reject) => { resolve(res.data) })
        }
      }).then(res => {
        console.log(3);
        addUser(this.addUserData).then(aRes => {
          if (aRes.data.mode == MODE.ADD_SUCCESS) {
            this.$message({
              message: aRes.data.msg,
              type: 'success'
            });
            this.bindData();
          }
        })
        this.addDialogVisible = false;
      }).catch(err => {
        console.log(2);
        this.$message({
          message: "此手机号用户已存在",
          type: 'error'
        });
      })

    },
    // dialog确定按钮
    dialogSubmit() {
      resetPassword({resTel: this.row.tel}).then(res => {
        this.$notify({
          title: '成功',
          message: res.data.msg,
          type: 'success',
          duration: 2000
        });
        this.resetDialogVisible = false;
      })
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
    // 绑定数据
    bindData() {
      getAllUser().then(res => {
        this.data = res.data.map(item => {
          item.sex = item.sex == '0' ? '女' : item.sex == '1' ? '男' : '';
          return item
        })
        this.showData = this.data;
      })

      getRoomUnLiving().then(res => {
        this.roomList = res.data
      })
    }

  }
}
</script>

<style>

.header{
  display: flex;
  margin: 20px;
}

</style>