<template>  
  <el-tabs type="border-card" style="height: 100% !important;">
    <el-tab-pane label="停车位管理" class="tab-pane" style="height: 700px !important;">
      <el-scrollbar >
        <Parking v-for="count in 28" :key="count"></Parking>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Parking from './Parking.vue'
export default {
  components: {
    Parking
  }

}
</script>

<style>

</style>