<template>
  <el-container class="index-con">
    <el-container class="main-con">
      <el-header class="index-header">
        <admin-top-nav @navPath="routerJump" @personal="personalJump"></admin-top-nav>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import AdminTopNav from "../components/AdminTopNav.vue";
import leftnav from "../components/leftnav.vue";
import { removeToken, removeUserInfo, getUserInfo } from "../utils/auth";

export default {
  name: "Home",
  data() {
    return {
      showclass: "asideshow",
      imgshow: "el-icon-s-unfold",
      imgsq: "el-icon-s-fold",
      isCollapse: true,
      userName: ""
    };
  },
  // 注册组件
  components: {
    AdminTopNav,
    leftnav,
  },
  methods: {
    routerJump(pathName) {
      console.log(pathName);
      this.$router.push({ name: pathName });
    },
    personalJump(command) {
      switch (command) {
        case "myInfo":
          this.$router.push({ name: 'personal' });
          break;
        case "upPwd":
          this.$router.push({ name: 'personal' });
          break;
      }
    }
  },

};
</script>

<style land="less" scoped>
.el-dropdown {
  display: flex;
  align-items: center;
}
.el-dropdown .el-dropdown-link {
  height: 60px;
  width: 110px;
  float: right;
  font-size: 16px;
  line-height: 60px;
  color: rgb(59, 58, 58);
  cursor: pointer;
}

.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #151d41;
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #151d41;
  margin: 0px;
}
.index-header {
  background-color: #fafafa;
  padding: 0%;
}
.index-main {
  border-left: 2px solid #333;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
  float: left;
  display: flex;
  align-items: center;
  font-size: 30px;
}
.buttonimg img {
  align-items: center;
}
</style>
