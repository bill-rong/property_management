<template>
  <div>
    <div class="header">
      <el-input placeholder="请输入您所要查询的记录" 
      @change="searchInput" v-model="input" clearable style="margin-right: 10px;"></el-input>
      <el-button class="sbtn" type="primary">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="data" 
      :editShow="false" :resetShow="true" 
      @handleDelete="handleDelete" @reset="reset">
    </MyTabel>

    <el-dialog
      title="提示"
      :visible.sync="resetDialogVisible"
      width="30%"
      center>
      <label style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <span>确定重置密码吗？</span>
        <span>重置后密码为：12345678</span>
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTabel from '@/components/MyTable.vue'
import { getAllUser, resetPassword } from '@/api/userApi'
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
      resetDialogVisible: false,
      row:{},                     // 存储点击行的信息
      input: '',
      data: [],

      column:[{
        prop: 'id',
        label: '#',
        sortable: true
      },{
        prop: 'name',
        label: '姓名',
        sortable: true
      },{
        prop: 'tel',
        label: '手机号'
      },{
        prop: 'idcard',
        label: '身份证号',
        sortable: true
      },{
        prop: 'email',
        label: '邮箱'
      },{
        prop: 'sex',
        label: '性别'
      },{
        prop: 'date',
        label: '入住时间',
        sortable: true
      }],

      centerDialogVisible: false,
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
    getAllUser().then(res => {
      this.data = res.data.map(item => {
        item.sex = item.sex == '0' ? '女' : item.sex == '1' ? '男' : '';
        return item
      })
    })
  },
  methods: {
    reset(index, row) {
      console.log('重置按钮点击', index, row);
      this.resetDialogVisible = true;
      this.row = row
    },

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
    // dialog确定按钮
    dialogSubmit() {
      resetPassword({resTel: this.row.tel}).then(res => {
        this.$notify({
          title: '成功',
          message: res.data.msg,
          type: 'success',
          duration: 2000
        });
        this.resetDialogVisible = false;
      })
    },

    checkForm() {
      let isNormal = false;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          isNormal = true;
        } else {
          isNormal = false;
        }
      });
      return isNormal;
    }

  }
}
</script>

<style>

.header{
  display: flex;
  margin: 20px;
}

</style>