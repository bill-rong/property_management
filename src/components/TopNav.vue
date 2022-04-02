<template>
  <el-container class="main-con">
    <el-header>
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect"
      active-text-color="#ffd04b">
        <el-menu-item>
          <img src="../assets/logo.png" height="20px" />
          <span slot="title" style="font-size: 20px; margin-left: 10px; margin-right: 60px">物业管理系统</span>
        </el-menu-item>
        <el-submenu
          v-for="(item, index) in menuList"
          :index="item.path?item.path:index"
          :key="index">
          <template slot="title">
            <span class="span-title">{{ item.authName }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, index) in item.children"
            :index="subItem.path"
            :key="index">
            <span class="span-name">{{ subItem.authName }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
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
  </el-container>
</template>

<script>
export default {
  name: 'navcon',
  data() {
    return {
      user: {},
      activeIndex: '1',
      userName: "ababa",
      menuList: [{
        authName: "导航一",
        children: [
            { authName: "用户与部门管理", path: "department", parentid: 0},
            { authName: "通讯录设置", id: 2, path: "adrbook", parentid: 0 }
        ]
        },
        {
        authName: "导航二",
        children: [
            { authName: "数据概览", path: "overview", parentid: 1 },
            { authName: "员工活跃数据", path: "employees", parentid: 1 }
        ]
        },
        {
        authName: "导航三",
        path: "path"
        }]
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({ name: key });
    }
  }
}
</script>

<style land="less" scoped>
.main-con {
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  border-bottom: 1px solid rgb(211, 209, 209);
  /* background-color: #fff; */
}
.el-menu-demo {
  width: 80%;
  margin: 0;
  float: left;
}
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
.span-title {
  font-size: 16px;
}
.span-name {
  font-size: 15px;
}
</style>