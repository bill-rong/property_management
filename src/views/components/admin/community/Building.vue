<template>
  <div>
    <MyTabel :tableColumn="column" :tableData="data">
    </MyTabel>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getBuilding } from '@/api/communityApi'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      data: [],
      column:[{
        prop: 'id',
        label: '#'
      },{
        prop: 'name',
        label: '楼名'
      }]
    }
  },
  created() {
    getBuilding().then(res => {
      this.data = res.data;
    })
  }
}
</script>

<style>

</style>