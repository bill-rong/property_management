<template>
  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" 
      style="margin-bottom: 30px;">
      <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>报修</el-breadcrumb-item>
      <el-breadcrumb-item>报修记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
    <el-table
      ref="table"
      :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column prop="contacts" label="投诉者"></el-table-column>
      <el-table-column prop="tel" label="联系方式"></el-table-column>
      <el-table-column prop="date" label="投诉时间" sortable></el-table-column>
      <el-table-column prop="status" label="处理状态"></el-table-column>
      <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">查看详情
              </el-button>
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


    <el-drawer
      title="投诉详情"
      :visible.sync="drawer"
      direction="ltr">
      <p style="word-break:break-word; text-align: left; text-indent:2em; margin: 0 7px">{{this.drawerData.describe}}</p>
      <div style="float: right;;margin: 0 10px">
        <p>{{this.drawerData.contacts}}</p>
        <p>{{this.drawerData.date}}</p>
      </div>
    </el-drawer>
  </div>
  </el-tabs>
  
</template>

<script>
import { getReportsByTel } from '@/api/repairApi'
import { getUserInfo } from '@/utils/auth'
export default {
  data() {
    return {
      tableData: [],
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
        color: '#0bbd87'
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
  created() {
    getReportsByTel({tel: getUserInfo().tel}).then(res => {
      this.tableData = res.data.map(item => {
        item.status = item.status == '0'? '未处理' : '已处理'
        return item
      })
    })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    handleView(index, row) {
      console.log(row);
      this.drawerData = row;
      this.drawer = true;
    },
  }

}
</script>

<style>

</style>