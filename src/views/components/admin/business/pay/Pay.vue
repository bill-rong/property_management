<template>
  <div>
    <MyTabel :tableColumn="column" :tableData="data" :editShow="false" @handleDelete="handleDelete"></MyTabel>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import {getPay, deletePayment} from '@/api/paymentApi'
import Mode from '@/utils/Mode'
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
      },{
        prop: 'handler',
        label: '处理人'
      },{
        prop: 'paydate',
        label: '缴费时间'
      }],
      data: [{

      }]
    }
  },
  created() {
    getPay().then(res => { this.data = res.data })
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePayment({id: row.id}).then(res => {
          if (res.data.mode == Mode.DELETE_SUCCES) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            getPay().then(res => { this.data = res.data });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      })
    }
  } 
}
</script>

<style>

</style>