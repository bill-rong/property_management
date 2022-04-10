<template>
  <div>
    <MyTabel :tableColumn="column" :tableData="data" :editShow="false"></MyTabel>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import {getUnPay} from '@/api/paymentApi'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'type',
        label: '类型',
        sortable: true
      },{
        prop: 'room',
        label: '房号',
        sortable: true
      },{
        prop: 'current',
        label: '数值'
      },{
        prop: 'curryear',
        label: '年',
        sortable: true
      },{
        prop: 'currmonth',
        label: '月',
        sortable: true
      },{
        prop: 'amount',
        label: '金额'
      }],
      data: {

      }
    }
  },
  created() {
    getUnPay().then(res => {
      this.data = res.data
    })
  }
  
}
</script>

<style>

</style>