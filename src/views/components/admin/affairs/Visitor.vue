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
        name: 'test1',
        sex: '男',
        reason: '刚偷完东西，来这躲避警察叔叔的追捕',        // 原因
        tel: 12301203,
        date: '4/9',
      },{
        id: 2,
        name: 'test2',
        sex: '男',
        reason: '我是警察，例行公事',      
        tel: 110,
        date: '4/9',
      },{
        id: 3,
        name: 'test3',
        sex: '男',
        reason: '来看警察抓小偷的',
        tel: 1999911,
        date: '4/9',
      },],

      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '姓名',
        sortable: true
      },{
        prop: 'sex',
        label: '性别',
        sortable: true
      },{
        prop: 'reason',
        label: '原因',
        sortable: true
      },{
        prop: 'tel',
        label: '电话',
        sortable: true
      },{
        prop: 'date',
        label: '日期',
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