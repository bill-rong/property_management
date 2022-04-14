<template>
  <el-container class="main-con">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#000"
        active-text-color="#67C23A">
        <el-menu-item index="0">
          <img src="../assets/logo.png" height="20px" />
          <span slot="title" style="font-size: 20px; margin-left: 10px; margin-right: 60px">物业管理系统</span>
        </el-menu-item>
        <el-menu-item index="index">大厅</el-menu-item>
        <el-submenu index="repair">
          <template slot="title">报修</template>
          <el-menu-item index="reportRepair">上报维修</el-menu-item>
          <el-menu-item index="repairInfo">维修记录</el-menu-item>
        </el-submenu>
        <el-submenu index="pay">
          <template slot="title">物业缴费</template>
          <el-menu-item index="payment">缴纳费用</el-menu-item>
          <el-menu-item index="paymentInfo">历史缴费记录</el-menu-item>
        </el-submenu>
        <el-submenu index="personalBusiness">
          <template slot="title">个人业务</template>
          <el-menu-item index="healthCommit">健康上报</el-menu-item>
          <el-menu-item index="petCommit">宠物上报</el-menu-item>
          <el-menu-item index="visitorCommit">访客登记</el-menu-item>
        </el-submenu>
        <el-submenu index="complaint">
          <template slot="title">投诉</template>
          <el-menu-item index="initiate">发起投诉</el-menu-item>
          <el-menu-item index="complaintInfo">历史投诉记录</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-dropdown class="el-dropdown" style="float: right" @command="handleCommand" >
        <div class="el-dropdown-link">
          <i class="el-icon-s-custom"></i>
          {{this.userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-files" command="myInfo">我的信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-lock" command="upPwd">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" command="exit" @click="exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </el-container>
</template>

<script>
import { getUserInfo, removeToken, removeUserInfo } from '../utils/auth'
export default {
  name: "TopNav",
  data() {
    return {
      activeIndex: 'index',
      userName: "ababadadad",
    }
  },
  created() {
    this.userName = getUserInfo().name;
    this.activeIndex = this.$router.currentRoute.name;
    console.log(this.activeIndex);
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.$emit("navPath", key);
    },
    exit() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setTimeout(() => {
          removeToken();
          removeUserInfo();
          this.$message({
              type: 'success',
              message: '已退出登录!'
            });
          this.$router.push({ name: "login" });
          // showSuccessMsg("已退出登录");
        }, 500);
      });
    },
    handleCommand(command) {
      this.activeIndex = 'aaa';
      console.log(this.activeIndex);
      switch (command) {
        case "myInfo":
          this.$emit("personal", command);
          break;
        case "upPwd":
          this.$emit("personal", command);
          break;
        case "exit":
          this.exit();
          break;
      }
    }
  }
}
</script>

<style land="less" scoped>
.main-con {
  width: 100%;
  height: 61px;
  background-color: #fafafa;
  border-bottom: 1px solid rgb(211, 209, 209);
  /* background-color: #fff; */
}

.el-menu-demo {
  width: 80%;
  height: 60px;
  margin: 0;
  float: left;
  background-color: #fafafa00;
}

.el-menu--horizontal{
  border-bottom: 0px solid #fafafa00 !important;
  text-decoration: none;
}
.el-submenu {
  background-color: #fafafa00;
}

.el-submenu:hover {
  background-color: #fafafa00;
}

.el-dropdown {
  display: flex;
  align-items: center;
}
.el-dropdown .el-dropdown-link {
  height: 60px;
  width: 150px;
  float: right;
  font-size: 16px;
  line-height: 60px;
  color: rgb(59, 58, 58);
  cursor: pointer;
}
</style>