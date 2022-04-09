<template>
  <div>
    <div class="header">
      <el-input placeholder="请输入您所要查询的记录" 
      @change="searchInput" v-model="input" clearable style="margin-right: 10px;"></el-input>
      <el-button class="sbtn" type="primary">查询</el-button>
    </div>

    <MyTabel :tableColumn="column" :tableData="data" @edit="edit" @handleDelete="handleDelete">
    </MyTabel>

    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form :rules="rules" ref="ruleForm" :model="add">
        <el-form-item label="姓名" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="row.name" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="40%" style="width: 80%;">
          <el-input v-model="row.sex" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="40%" style="width: 80%;">
          <el-input v-model="row.password" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="居住状态" prop="living" label-width="40%" style="width: 80%;">
          <el-input v-model="row.living" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date" label-width="40%" style="width: 80%;">
          <el-input v-model="row.date" maxlength="10" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
      editDialogVisible: false,   // 编辑弹窗按钮
      row:{},                     // 存储点击行的信息
      input: '',

      data: [
      {
        id: 1,
        name: 'test1',
        sex: '男',
        password: 321,
        living: '居住中',
        date: '4/9',
      },{
        id: 2,
        name: 'test2',
        sex: '女',
        password: 321,
        living: '居住中',
        date: '4/8',
      },{
        id: 3,
        name: 'test3',
        sex: '男',
        password: 321,
        living: '居住中',
        date: '4/7',
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
        prop: 'password',
        label: '密码',
        sortable: true
      },{
        prop: 'living',
        label: '居住状态',
        sortable: true
      },{
        prop: 'date',
        label: '日期',
        sortable: true
      },],

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
    // getUser().then(res => {
    //   this.data = res.data;
    // })
  },
  methods: {
    edit(index, row) {
      console.log('编辑按钮点击', index, row);
      this.editDialogVisible = true;
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

    dialogSubmit() {
      if (!this.checkForm()) { return }
      this.$notify({
          title: '成功',
          message: `添加"${this.add.name}"楼成功`,
          type: 'success',
          duration: 2000
        });
      this.centerDialogVisible = false;
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