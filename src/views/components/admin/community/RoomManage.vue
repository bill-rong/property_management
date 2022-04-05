<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="楼"><building></building></el-tab-pane>
      <el-tab-pane label="房"><room></room></el-tab-pane>
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