<template>
  <div>
    <div class="header">
      <el-button class="sbtn" type="success" @click="addDialogVisible = true">添加住户</el-button>
      <el-input placeholder="请输入您所要查询的记录" 
      @change="searchInput" v-model="input" clearable style="margin: 0 10px;"></el-input>
      <el-button class="sbtn" type="primary">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="data" 
      :editShow="false" :resetShow="true" 
      @handleDelete="handleDelete" @reset="reset">
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
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getAllUser, resetPassword, userIsExist, addUser } from '@/api/userApi'
import MODE from "@/utils/Mode"
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
      row:{},                     // 存储点击行的信息
      input: '',
      data: [],
      addUserData: {
        tel: '',
        idcard: '',
        sex: '1',
        name: '',
        email: ''
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
      },{
        prop: 'date',
        label: '入住时间',
        sortable: true
      }],
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      centerDialogVisible: false,
      add: {
        name: '',
        layerNum: 1,
        roomNum: 1
      },
      rules: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        idcard: [{ validator: validateIdcard, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur"}],
      },
      
    }
  },
  created() {
    getAllUser().then(res => {
      this.data = res.data.map(item => {
        item.sex = item.sex == '0' ? '女' : item.sex == '1' ? '男' : '';
        return item
      })
    })
  },
  methods: {
    reset(index, row) {
      console.log('重置按钮点击', index, row);
      this.resetDialogVisible = true;
      this.row = row
    },

    // 通过输入查询
      searchInput(val){
       if (!val) {
        this.showOrders(1, this.type);
        this.currentPage = 1;
        return;
      }
      this.$api.searchOrder({
          search: val,
        })
        .then((res) => {
          console.log("搜索---", res.data);
          this.currentPage = 1;
          if (res.data.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;;
          } else {
            this.total = 1;
            this.pageSize = 1;
          }
        });
      },

    // 删除操作
    handleDelete(index, row){
      console.log('删除', index, row)
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.delOrder({
          oid: row.oid
        }).then(res => {
          if(res.data.status === 200) {
              this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.showOrders(1, this.type)                  // 更新视图
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
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
        // addUser(this.addUserData).then(aRes => {
        //   if (aRes.data.mode == MODE.ADD_SUCCESS) {
        //     this.$message({
        //       message: aRes.data.msg,
        //       type: 'success'
        //     });
        //   }
        // })
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