<template>
  <div style="height: 100% !important;">
    <el-tabs type="border-card" style="height: 97% !important;">
      <el-tab-pane label="楼"><Building></Building></el-tab-pane>
      <el-tab-pane label="房"><Room></Room></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Room from "./Room.vue";
import Building from "./Building.vue";
export default {
  components: {
    Room,
    Building
  }

}
</script>

<style>

</style>