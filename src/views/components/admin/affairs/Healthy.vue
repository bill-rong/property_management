<template>
  <div>
    <div class="header">
      <el-input placeholder="请输入您所要查询的记录" 
      @change="searchInput" v-model="input" clearable style="margin-right: 10px;"></el-input>
      <el-button class="sbtn" type="primary">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="data" :editShow = false  @handleDelete="handleDelete">
    </MyTabel>

  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getUser } from '@/api/userApi'
export default {
  components: {
    MyTabel
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入楼名"));
      } else {
        callback();
      }
    };
    return {
      input: '',        // search box's value


      data: [
      {
        id: 1,
        room: 'A101',
        name: 'test1',
        symptom: '心跳加速',
        temperature: '36.7℃',
        supplement: '刚偷完东西，有点热', 
        report_time: '4/9',
      },{
        id: 1,
        room: 'A102',
        name: 'test2',
        symptom: '心跳加速',
        temperature: '36.5℃',
        supplement: '准备收网', 
        report_time: '4/9',
      },{
        id: 3,
        room: 'A103',
        name: 'test3',
        symptom: '无',
        temperature: '36.6℃',
        supplement: '刚爬完楼', 
        report_time: '4/9',
      },],

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
        label: '姓名',
        sortable: true
      },{
        prop: 'symptom',
        label: '症状',
        sortable: true
      },{
        prop: 'temperature',
        label: '体温',
        sortable: true
      },{
        prop: 'supplement',
        label: '补充',
        sortable: true
      },{
        prop: 'report_time',
        label: '上报时间',
        sortable: true
      },],

      
      add: {
        name: '',
        layerNum: 1,
        roomNum: 1
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      
    }
  },
  created() {

  },
  methods: {

      // 通过输入查询
      searchInput(val){
       if (!val) {
        this.showOrders(1, this.type);
        this.currentPage = 1;
        return;
      }
      this.$api.searchOrder({
          search: val,
        })
        .then((res) => {
          console.log("搜索---", res.data);
          this.currentPage = 1;
          if (res.data.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;;
          } else {
            this.total = 1;
            this.pageSize = 1;
          }
        });
      },

    // 删除操作
    handleDelete(index, row){
      console.log('删除', index, row)
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.delOrder({
          oid: row.oid
        }).then(res => {
          if(res.data.status === 200) {
              this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.showOrders(1, this.type)                  // 更新视图
          }
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