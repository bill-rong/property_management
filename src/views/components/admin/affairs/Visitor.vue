<template>
  <div>
    <div class="header">
      <el-input placeholder="输入要查询的房号" 
       @clear="searchClear" v-model="input" clearable style="margin: 0 10px; width: 20%"></el-input>
      <el-button class="sbtn" type="primary" @click="searchInput()">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="showData" :editShow = false  @handleDelete="handleDelete">
    </MyTabel>

  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getVisitor, deleteVisitor } from '@/api/affairsApi'
import Mode from '@/utils/Mode';
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
      data: [],
      showData: [],
      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '姓名',
        sortable: true
      },{
        prop: 'room',
        label: '房号',
        sortable: true
      },{
        prop: 'resident',
        label: '住户名'
      },{
        prop: 'purpose',
        label: '原因'
      },{
        prop: 'date',
        label: '到访日期',
        sortable: true
      },],

      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      
    }
  },
  created() {
    this.bindData();
  },
  methods: {
    bindData() {
      getVisitor().then(res => { 
        this.data = res.data;
        this.showData = res.data;
       })
    },
     // 通过输入查询
    searchInput(){
      this.showData = this.data.filter(item => {
        return item.room.search(this.input) != -1;
      })
      console.log(this.showData);
    },
    // 取消搜索
    searchClear() {
      this.showData = this.data
    },

    // 删除操作
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVisitor({id: row.id}).then(res => {
          if (res.data.msg == Mode.DELETE_SUCCES) {
            this.$message({
              type: 'success',
              message: res.data.msg
            }); 
            this.bindData();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            }); 
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