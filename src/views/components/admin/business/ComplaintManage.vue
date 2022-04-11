<template>
  <div class="outside">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
        <el-breadcrumb-item :to="{ path: '/adminHome/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>物业业务</el-breadcrumb-item>
        <el-breadcrumb-item>投诉</el-breadcrumb-item>
      </el-breadcrumb>
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane label="未处理投诉">
        <el-table
          ref="table"
          :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column prop="contacts" label="投诉者"></el-table-column>
          <el-table-column prop="tel" label="联系方式"></el-table-column>
          <el-table-column prop="date" label="投诉时间"></el-table-column>
          <el-table-column prop="status" label="处理状态"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">查看详情
              </el-button>
              
              <div style="display: inline-block; margin-left: 6px">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">处理
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="tableData.length" 
          :page-size="pageSize" 
          :current-page="currentPage"
          @current-change="changePage"
          style="margin-top: 5px;">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已处理投诉">
        <Complaint></Complaint>
      </el-tab-pane>
    </el-tabs>

    <el-drawer
      title="投诉详情"
      :visible.sync="drawer"
      direction="ltr">
      <p style="word-break:break-word; text-align: left; text-indent:2em; margin: 0 7px">{{this.drawerData.describe}}</p>
      <div style="float: right;;margin: 0 10px">
        <p>{{this.drawerData.contacts}}</p>
        <p>{{this.drawerData.date}}</p>
      </div>
      <el-timeline style="margin-top:150px;">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </el-drawer>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定处理好了吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getUserInfo } from '@/utils/auth';
import { getComplaintUnHandle, complaintHandle } from '@/api/complaintApi'
import Complaint from './Complaint.vue'
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
    Complaint
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