<template>
  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>住户管理</el-breadcrumb-item>
        <el-breadcrumb-item>宠物列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-tab-pane label="宠物列表"> -->
        <MyTable :tableColumn="column" :tableData="petData" @check="checkRow" @handleDelete="handleDelete" :editShow="false" :checkShow="true"></MyTable>
      <!-- </el-tab-pane> -->

      <el-dialog
      title="图片显示"
      :visible.sync="dialogVisible"
      width="20%"
      center>
      <el-image :src="srcPath"></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
import MyTable from '@/components/MyTable.vue'
import { getPet, deletePet } from '@/api/affairsApi'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      dialogVisible: false,
      row: {},
      column: [{
        prop: 'resident',
        label: '所在房号',
        sortable: true
      },{
        prop: 'variety',
        label: '品种'
      },{
        prop: 'name',
        label: '宠物名'
      },{
        prop: 'documents',
        label: '证件齐全'
      }],
      petData: [{
        id: 1,
        resident: 'A1101',
        variety: '二哈',
        name: '二傻子',
        documents: '是',
        path: '/'
      }]
    }
  },
  created() {
    this.bindData();
  },
  computed: {
    srcPath() {
      return process.env.VUE_APP_SERVER_URL + '/' + this.row.path
    }
  },

  methods: {
    checkRow(index, row) {
      this.row = row;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePet({id: row.id}).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          this.bindData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    bindData() {
      getPet().then(res => {
        this.petData = res.data;
        this.petData = this.petData.map(item => {
          item.documents = item.documents == 1 ? '是' : '否'
          return item
        });
      })
    }
  }
}
</script>

<style>

</style>