<template>
  <!-- <el-container class="index-con">
    <el-header class="index-header">
      <navcon></navcon>
    </el-header>
    <el-container class="index-con">
      <el-aside :class="showclass">
        <leftnav></leftnav>
      </el-aside>
      <el-container class="main-con">
        <el-main clss="index-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container> -->

  <el-container class="index-con">
    <el-aside
      :class="showclass"
      class="aside"
      style="background-color: #151d41"
    >
      <leftnav :isCollapse="isCollapse" :ident="false"></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <!-- <navcon></navcon> -->
        <span class="buttonimg">
          <!-- <img class="showimg" :src="isCollapse?imgsq:imgshow" @click="toggle(isCollapse)" style="cursor: pointer;"> -->
          <i :class="isCollapse ? imgsq : imgshow" @click="toggle(isCollapse)" style="cursor: pointer"></i>
        </span>
        <el-dropdown class="el-dropdown" style="float: right" @command="handleCommand" >
          <div class="el-dropdown-link">
            <i class="el-icon-s-custom"></i>
            {{this.userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-files" command="a">我的信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-lock" command="b">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close" command="c" @click="exit()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
// import navcon from '../components/navcon.vue'
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
    // navcon,
    leftnav,
  },
  methods: {
    toggle(showtype) {
      this.isCollapse = !showtype;
      // this.$root.Bus.$emit('toggle', this.collapsed)
      if (!showtype) {
        this.showclass = "asideshow";
      } else {
        setTimeout(() => {
          this.showclass = "aside";
        }, 300);
      }
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
          this.$router.push({ name: "login" });
          this.$message({
              type: 'success',
              message: '已退出登录!'
            });
          // showSuccessMsg("已退出登录");
        }, 500);
      });
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          break;
        case "b":
          break;
        case "c":
          this.exit();
          break;
      }
    },
  },
  created() {
    console.log(getUserInfo().name);
    this.userName = getUserInfo().name;
  },
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  // beforeMount() {
  //   // 弹出登录成功
  //   this.$message({
  //     message: '登录成功',
  //     type: 'success'
  //   })
  // }
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
  border-bottom: 1px solid rgb(211, 209, 209);
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
