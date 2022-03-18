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
    <el-aside :class="showclass" class="aside" style="background-color: #151D41;">
      <leftnav :isCollapse="isCollapse"></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <!-- <navcon></navcon> -->
        <div class="buttonimg">
          <img class="showimg" :src="isCollapse?imgsq:imgshow" @click="toggle(isCollapse)">
        </div>
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
import leftnav from '../components/leftnav.vue'

export default {
  name: 'index',
  data() {
    return {
      showclass: 'asideshow',
      imgshow: require('../assets/img/show.png'),
      imgsq: require('../assets/img/sq.png'),
      isCollapse: true
    }
  },
  // 注册组件
  components: {
    // navcon,
    leftnav
  },
  methods: {
    toggle(showtype) {
      this.isCollapse = !showtype
      // this.$root.Bus.$emit('toggle', this.collapsed)
      if (!showtype) {
        this.showclass = 'asideshow';
      } else {
        setTimeout(() => {
          this.showclass = 'aside';
        }, 300);
      }
      
    }
  },
  created() {
    // 监听
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showclass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showclass = 'aside'
        }, 300)
      }
    })
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
}
</script>
<style scoped>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #151D41;
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header{
  background-color: #334157;
  border-left: 2px solid #333;
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
}
.buttonimg img{
  align-items: center;
}
</style>
