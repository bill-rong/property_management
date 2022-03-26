/**
* 左边菜单
*/ 
<template>
  <el-menu
    class="el-menu-vertical-demo"
    :unique-opened="true"
    router
    background-color="#151d41"
    text-color="#fff"
    :collapse="!isCollapse"
  >
    <el-menu-item
      index="/login"
      style="
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <img src="../assets/logo.png" height="20px" />
      <!-- <i class="el-icon-s-home" ></i> -->
      <span slot="title" style="font-size: 18px; margin-left: 7px"
        >物业管理系统</span
      >
    </el-menu-item>
    <el-submenu
      v-for="(item, index) in menuList"
      :index="'' + index"
      :key="index"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        v-for="(subItem, index) in item.children"
        :index="'/' + subItem.path"
        :key="index"
      >
        <span>{{ subItem.authName }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { userMenuList, adminMenuList } from "../assets/values/leftNavList";

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    ident: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuList: [],
      // isCollapse: false
    };
  },
  created() {
    console.log(this.ident);
    this.menuList = this.ident ? adminMenuList() : userMenuList();
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>