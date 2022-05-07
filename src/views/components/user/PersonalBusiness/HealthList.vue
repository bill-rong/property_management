<template>
  <div>

    <MyTabel :tableColumn="column" :tableData="data" :editShow = false  @handleDelete="handleDelete">
    </MyTabel>

  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { deleteHealthy, getHealthyByRoom } from '@/api/affairsApi'
import { getUser } from '@/api/userApi'
import { getUserInfo } from '@/utils/auth'
export default {
  components: {
    MyTabel
  },
  data() {
    return {
      input: '',        // search box's value
      room: '',

      data: [],

      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'room',
        label: '房号',
        sortable: true
      },{
        prop: 'name',
        label: '姓名'
      },{
        prop: 'symptom',
        label: '症状'
      },{
        prop: 'temperature',
        label: '体温'
      },{
        prop: 'supplement',
        label: '补充',
        sortable: true
      },{
        prop: 'report_time',
        label: '上报时间',
        sortable: true
      },],
      
    }
  },
  created() {
    getUser(getUserInfo().tel).then(res => {
      this.room = res.data.room
      getHealthyByRoom({room: this.room}).then(res => { this.data = res.data })
    }) 
  },
  methods: {
    // 删除操作
    handleDelete(index, row){
      console.log('删除', index, row)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHealthy({id: row.id}).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          getUser(getUserInfo().tel).then(res => {
            this.room = res.data.room
            getHealthyByRoom({room: this.room}).then(res => { this.data = res.data })
          }) 
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },

  }
}
</script>

<style scoped>
  .header{
    display: flex;
    margin: 20px;
  }

</style>