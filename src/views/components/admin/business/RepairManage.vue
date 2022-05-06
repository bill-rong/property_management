<template>
  <div class="outside">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>物业业务</el-breadcrumb-item>
        <el-breadcrumb-item>报修</el-breadcrumb-item>
      </el-breadcrumb>
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane label="未处理报修">
        <UnHandleRepair></UnHandleRepair>
      </el-tab-pane>
      <el-tab-pane label="已处理报修">
        <HandleRepair></HandleRepair>
      </el-tab-pane>
    </el-tabs>
    
  </div>

</template>

<script>
import { getUserInfo } from '@/utils/auth';
import { getComplaintUnHandle, complaintHandle } from '@/api/complaintApi'
import HandleRepair from './HandleRepair.vue'
import UnHandleRepair from './UnHandleRepair.vue'
export default {
  data() {
    return {
      tableData: [
          {
            "id": 1,
            "contacts": "bill",
            "tel": "133",
            "describe": "昨晚A1201大晚上的咚咚咚，有点影响到人休息了。",
            "date": "2022-04-09T04:12:00.000Z",
            "status": "0"
          },
          {
            "id": 2,
            "contacts": "马",
            "tel": "144",
            "describe": "保安态度太差了",
            "date": "2012-12-00 00:00:00",
            "status": "0"
          }
        ],
      activities: [{
          content: '投诉发起',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '未处理',
          color: '#0bbd87'
        }, {
          content: '已处理',
          timestamp: '',
          size: 'large'
        }],
      centerDialogVisible: false,
      drawer: false,
      drawerData: {
        title: '',
        content: '',
        adname: '',
        date: ''
      },
      dialogVisible: false,
      currentPage: 1,
      pageSize: 7,
      currentAdtel: '123',
      isSuper: false,
      submit: {
        id: 0
      }
    }
  },
  components: {
    HandleRepair,
    UnHandleRepair
  },
  created() {
    this.currentAdtel = getUserInfo().tel;
    this.isSuper = getUserInfo().permission == "super";
    getComplaintUnHandle().then(res => {
      this.tableData = res.data;
      for(let i=0; i<this.tableData.length; i++) {
        this.tableData[i].status = '未处理'
      }
    })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    handleDelete(index, row) {
      this.submit.id = row.id;
      this.dialogVisible = true;
    },
    handleView(index, row) {
      console.log(row);
      this.drawerData = row;
      this.drawer = true;
    },
    dialogSubmit() {
      this.dialogVisible = false;
      complaintHandle(this.submit).then(res => {
        this.$message({
          type: 'success',
          message: res.data.msg
        });
        location.reload();
      })
    }
  }

}
</script>

<style>

</style>