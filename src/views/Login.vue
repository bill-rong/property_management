<template>
  <div class="wrapper">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/logo-303643.png" height="100px" alt="">
      </div>
      <!-- <h3 class="title">登录界面</h3> -->
      <div>{{ info }}</div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="tel">
          <el-input
            type="text"
            v-model="loginForm.tel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="1">住户</el-radio>
          <el-radio v-model="radio" label="2">物业管理员</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/userApi'
import { showSuccessMsg, showErrorMsg } from '../utils/msg'
import { setToken, setUserInfo } from '../utils/auth'

const MODE = require('../../server/utils/Mode')
export default {
  created() { },
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      radio: '1',
      info: '',
      loginForm: {
        tel: '',
        password: '',
      },
      rules: {
        // 不为空，长度
        tel: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm() {
      login(this.loginForm, this.radio).then(res => {
        console.log("登录请求结果", res);
        if (res.data.mode == mode.PASSWORD_CORRECT) {
          showSuccessMsg("登录成功！");
          setUserInfo(res.data.data);     // 保存用户信息
          setToken(res.data.token);       // 保存token
          this.radio == '1' ? this.$router.push({name: 'home'}) : this.$router.push({name: 'adminHome'});
        } else if (res.data.mode == MODE.PASSWORD_INCORRECT || res.data.mode == MODE.LOW_PERMISSION) {
          showErrorMsg("账号或密码错误！");
        }
      }).catch(err => {
        // showErrorMsg("后端连接异常！"+err.message);
        console.error("login api err", err);
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #104468;
}
.login-box {
  width: 400px;
  height: 260px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 180px;
  border-radius: 10px;

  border: 1px solid #eee;
  background: #fff;
  position: relative;
}
.logo{
  position: absolute;
  width: 120px;
  height: 120px;
  background: #f7f7f7;
  border-radius: 50%;
  overflow: hidden;
  top:-80px;
  left:50%;
  margin-left: -60px;
  padding:8px;
  img{
    // border-radius: 50%;
    background: #fff;
    margin-top: 10px;
  }
}
.demo-ruleForm{
  margin-top: 60px;
}
.title{
  margin-bottom: 30px;
  text-align: center;
  color: #666;
}

</style>