<template>
  <div style="height: 100% !important;">
    <el-tabs type="border-card" style="height: 97% !important;">
      <el-table
        ref="table"
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%">

        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="adname" label="投诉者"></el-table-column>
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
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form ref="annForm">
        <el-form-item label="标题" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">发 布</el-button>
      </span>
    </el-dialog>

    <el-drawer
      :title="drawerData.title"
      :visible.sync="drawer"
      direction="ltr">
      <p style="word-break:break-word; text-align: left; text-indent:2em; margin: 0 7px">{{this.drawerData.content}}</p>
      <div style="float: right;;margin: 0 10px">
        <p>{{this.drawerData.adname}}</p>
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
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
export default {
  data() {
    return {
      tableData: [{
        id: 1,
        title: "A1201晚上太吵了",
        content: "昨晚A1201大晚上的咚咚咚，有点影响到人休息了。",
        date: "2022-12-12 12:12:12",
        adname: "sofia",
        adtel: "134",
        status: "未处理"
      },{
        id: 2,
        title: "广场舞跳太晚了",
        content: "content",
        date: "2022-12-12 12:12:12",
        adname: "bill",
        adtel: "135",
        status: "已处理"
      },{
        id: 2,
        title: "保安态度太差了",
        content: "content",
        date: "2022-12-12 12:12:12",
        adname: "bill",
        adtel: "135",
        status: "已处理"
      }],
      activities: [{
          content: '投诉发起',
          timestamp: '2022-04-07 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '未处理',
          timestamp: '2022-04-07 20:46',
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
      currentPage: 1,
      pageSize: 7,
      currentAdtel: '123',
      isSuper: false
    }
  },
  created() {
    this.currentAdtel = getUserInfo().tel;
    this.isSuper = getUserInfo().permission == "super";
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    handleDelete(index, row) {
      console.log(row);
    },
    handleView(index, row) {
      console.log(row);
      this.drawerData = row;
      this.drawer = true;
    },
    dialogSubmit() {

    }
  }

}
</script>

<style>

</style>