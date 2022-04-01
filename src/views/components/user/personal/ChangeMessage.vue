<template>
    <div>
        <el-dialog
        title="修改姓名"
        :visible.sync="nDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程名称" prop="cname">
                <el-input v-model="ruleForm.cname"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改姓名"
        :visible.sync="nDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitName('ruleForm', tableName)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改性别"
        :visible.sync="sDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitSex('ruleForm', tableName)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改院系"
        :visible.sync="fDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="院系" prop="faculty">
                <el-input v-model="ruleForm.faculty"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitFaculty('ruleForm', tableName)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改手机号"
        :visible.sync="pDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitPhone('ruleForm', tableName)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改邮箱"
        :visible.sync="eDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitEmail('ruleForm', tableName)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </diV>
</template>

<script>


export default {
    props: [
        'nDialog',
        'sDialog',
        'pDialog',
        'eDialog',
        'fDialog',
        'tableName',
    ],
    data() {
        return {
        value: '',

        ruleForm: {
          name: '',
          faculty: '',
          sex: '',
          phone: '',
          email: '',
        },

        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          faculty: [
            { required: true, message: '请输入院系', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请输入性别', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },

    methods: {
      // 关闭弹窗时发送的事件
      handleDialogClose() {
          this.$emit('changeDialog')
          console.log('弹窗关闭时的事件触发了！')
      },

      submitName(formName, tableName) {
        console.log('tableName:', tableName)
        this.$refs[formName].validate((valid) => {
          let message = this.ruleForm.name;
          if (valid) {
            console.log('进入提交阶段')
            console.log(message);
            this.$api.changeMessage({
              tableName: tableName,
              column: 'name',
              message,
              number: 6
            })
            .then((res) => {
              if(res.status == 200){
                alert('修改成功');       
                setTimeout(() => {
                  history.go(0)
                }, 1000);
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

      submitSex(formName, tableName) {
        this.$refs[formName].validate((valid) => {
          let message = this.ruleForm.sex;
          if (valid) {
            this.$api.changeMessage({
              tableName: tableName,
              column: 'sex',
              message,
              number: 6
            })
            .then((res) => {
              if(res.status == 200){
                alert('修改成功');       
                history.go(0)
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

      submitFaculty(formName, tableName) {
        this.$refs[formName].validate((valid) => {
          let message = this.ruleForm.faculty;
          if (valid) {
            this.$api.changeMessage({
              tableName: tableName,
              column: 'faculty',
              message,
              number: 6
            })
            .then((res) => {
              if(res.status == 200){
                alert('修改成功');       
                history.go(0)
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

      submitPhone(formName, tableName) {
        this.$refs[formName].validate((valid) => {
          let message = this.ruleForm.phone;
          if (valid) {
            this.$api.changeMessage({
              tableName: tableName,
              column: 'phone',
              message,
              number: 6
            })
            .then((res) => {
              if(res.status == 200){
                alert('修改成功');       
                history.go(0)
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

      submitEmail(formName, tableName) {
        this.$refs[formName].validate((valid) => {
          let message = this.ruleForm.email;
          if (valid) {
            this.$api.changeMessage({
              tableName: tableName,
              column: 'email',
              message,
              number: 6
            })
            .then((res) => {
              if(res.status == 200){
                alert('修改成功');       
                history.go(0)
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

    }
}
</script>

<style>
  .el-upload {
    float: left;
    margin-left: 50px;
  }
</style>