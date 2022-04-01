<template>
    <div class="formDiv">
        <el-form label-position="right" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="旧密码：" label-width="200px" prop="opwd">
                <el-input v-model="form.opwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" label-width="200px" prop="npwd">
                <el-input v-model="form.npwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" label-width="200px" prop="cpwd">
                <el-input v-model="form.cpwd" type="password"></el-input>
            </el-form-item>

            <div class="ulDiv">
                <ul style="font-size: 14px">
                    <li>密码长度8-64位</li>
                    <li>需同时包含大写字母、小写字母、数字,不可使用特殊字符</li>
                    <li>密码不能包含邮箱</li>
                </ul>
            </div>

            <el-form-item>
                <el-button type="primary" class="subbtn" @click="onSubmit('form')" :plain="true">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // subPwd: '',
        form: {
          opwd:'',
          npwd:'',
          cpwd:''
        },
        rules: {
          opwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          npwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 8, max: 64, message: '长度在 8 到 64 个字符', trigger: 'blur' },
            { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/, message: '密码格式不正确', trigger: 'blur' },
          ],
          cpwd: [
            { required: true, message: true, message: '请确认新密码', trigger: 'blur' },
            { min: 8, max: 64, message: '长度在 8 到 64 个字符', trigger: 'blur' }
          ],
        }
      }
    },

    mounted() {
        // this.form.opwd = this.opwd
        // console.log('opwd:', opwd)
    },


    methods: {
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if(valid){
                let {opwd, npwd, cpwd} = this.form;
                if(cpwd === npwd) {
                    console.log('submit!');
                    this.subPwd = this.form.npwd
                    this.$emit('subPwd', this.subPwd)
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '修改失败，两次密码字段不一致',
                        type: 'error'
                    });
                } 
            } else {
                console.log('修改失败');
                return false;
            }
          }
        )}    
    }
}
</script>

<style>
    .formDiv {
        width: 90%;
    }

    .ulDiv {
        width: 50%;
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