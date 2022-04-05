<template>
  <div>
    <MyTabel :tableColumn="column" :tableData="data">
    </MyTabel>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getRoom } from '@/api/communityApi'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      data: [],
      column:[{
        prop: 'bdname',
        label: '所在楼'
      },{
        prop: 'name',
        label: '房名'
      },{
        prop: 'living',
        label: '居住中'
      },{
        prop: 'riname',
        label: '住户'
      }]
    }
  },
  created() {
    getRoom().then(res => {
      console.log(res.data);
      this.data = res.data;
    })
  }
}
</script>

<style>

</style>