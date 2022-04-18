<template>
  <div class="outside">
    <el-page-header @back="goBack" content="个人中心"></el-page-header>
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane label="个人信息">
        <span slot="label"><i class="el-icon-files"></i> 个人信息</span>
        <PersonalInfo></PersonalInfo>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <span slot="label"><i class="el-icon-lock"></i> 修改密码</span>
        <ChangePassword @subPwd="subPwd"></ChangePassword>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue' 
import PersonalInfo from './PersonalInfo.vue'


export default {
  components: {
    ChangePassword,
    PersonalInfo
  },
  props: {

  },
  data() {
    return {
      nDialog: false,
      sDialog: false,
      fDialog: false,
      pDialog: false,
      eDialog: false,
      // tableName: 'tableName'
    }
  },


  methods: {
    subPwd(subPwd) {
      console.log(subPwd)
      this.$api.changePwd({
          number: 6,
          subPwd,
          tableName: 'tuser'
        }).then(res => {
          console.log(res.data);
          if(res.status == 200){
            alert
          }
        })
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>

<style>
.outside {
  width: 100%;
  height: 100%;
  background: #FFF;
  text-align: center;
}

.tabs {
  padding: 30px;
}

  .grid-content {
    padding: 10px;
    margin: auto;
  }

  .editBtn {
      height: 5%;
			width: 12%;
			border-radius: 5px;
			background-color:transparent;
			border: 0;
			outline:none;
			-webkit-background-size:cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
  }
</style>