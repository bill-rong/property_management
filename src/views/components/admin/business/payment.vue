<template>
  <div class="outside">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>物业业务</el-breadcrumb-item>
        <el-breadcrumb-item>缴费管理</el-breadcrumb-item>
      </el-breadcrumb>
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane label="收取费用">
        <Toll></Toll>
      </el-tab-pane>
      <el-tab-pane label="未缴费">
        <UnPay></UnPay>
      </el-tab-pane>
      <el-tab-pane label="已缴费">
        <Pay></Pay>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Toll from './pay/Toll.vue'
import Pay from './pay/Pay.vue'
import UnPay from './pay/UnPay.vue'
export default {
  components: {
    Toll,
    Pay,
    UnPay
  }

}
</script>

<style>

</style>