<template>
    <div class="formDiv">
        <el-form label-position="right" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="旧密码：" label-width="200px" prop="oldPwd">
                <el-input v-model="form.oldPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" label-width="200px" prop="newPwd">
                <el-input v-model="form.newPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" label-width="200px" prop="cpwd">
                <el-input v-model="form.cpwd" type="password"></el-input>
            </el-form-item>

            <div class="ulDiv">
                <ul style="font-size: 14px; text-align: left; list-style:none;">
                    <li><i class="el-icon-warning-outline"></i> 密码长度8-16位</li>
                    <li><i class="el-icon-warning-outline"></i> 需同时包含字母、数字,不可使用特殊字符</li>
                    <li><i class="el-icon-warning-outline"></i> 密码不能包含邮箱</li>
                </ul>
            </div>

            <el-form-item>
                <el-button type="primary" class="subbtn" @click="onSubmit('form')" :plain="true">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { updatePassword } from '@/api/userApi';
import { getUserInfo, setToken } from '@/utils/auth'
import Mode from '@/utils/Mode'
export default {
  data() {
    return {
      // subPwd: '',
      form: {
        oldPwd:'',
        newPwd:'',
        cpwd:''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
          { pattern: /^(?=.*\d)(?=.*[A-z]).{8,16}$/, message: '密码格式不正确', trigger: 'blur' },
        ],
        cpwd: [
          { required: true, message: true, message: '请确认新密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit(formName) {
      if (!this.checkForm()) return;
      let {oldPwd, newPwd, cpwd} = this.form;
      if(cpwd === newPwd) {
        console.log('submit!');
        let params = { oldPwd, newPwd };
        updatePassword(params).then(res => {
          if (res.data.mode == Mode.UPDATE_PWD_SUCCESS) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          } else if (res.data.mode == Mode.PASSWORD_INCORRECT) {
            this.$message({
            message: res.data.msg,
            type: 'error'
          });
          }
          
        }).catch(err => {
          console.log(err);
          this.$message({
            message: '修改失败，原密码不正确',
            type: 'error'
          });
        }) 
      } else {
        this.$message({
          message: '修改失败，两次密码字段不一致',
          type: 'error'
        });
      } 
    },
    checkForm() {
    let isNormal = false;
    this.$refs["form"].validate((valid) => {
      if (valid) {
        isNormal = true;
      } else {
        isNormal = false;
      }
    });
    return isNormal; 
  }
  },
    
}
</script>

<style>
    .formDiv {
        width: 90%;
    }

    .ulDiv {
        width: 70%;
        margin-left: 5%;
        margin-top: 5%;
        color: rgb(107, 107, 107);
    }

    .subbtn {
        margin-left: 50%;
    }

    .el-form-item__label {
        font-size: 16px;
    }
</style>