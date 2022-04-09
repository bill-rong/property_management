<template>
  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>住户管理</el-breadcrumb-item>
        <el-breadcrumb-item>宠物列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-tab-pane label="宠物列表"> -->
        <MyTable :tableColumn="column" :tableData="petData" :editShow="false" :checkShow="true"></MyTable>
      <!-- </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import MyTable from '@/components/MyTable.vue'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      column: [{
        prop: 'room',
        label: '所在房号',
        sortable: true
      },{
        prop: 'variety',
        label: '品种'
      },{
        prop: 'name',
        label: '宠物名'
      },{
        prop: 'documents',
        label: '证件齐全'
      }],
      petData: [{
        id: 1,
        room: 'A1101',
        variety: '二哈',
        name: '二傻子',
        documents: '是',
        path: '/'
      }]
    }
  }
}
</script>

<style>

</style>