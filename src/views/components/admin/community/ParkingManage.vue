<template>  
  <el-tabs type="border-card">
    <el-tab-pane label="停车位管理" class="tab-pane" >
      <el-scrollbar style="height: 100% !important;">
        <Parking v-for="count in 28"></Parking>
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