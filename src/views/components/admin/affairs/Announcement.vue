<template>
  <div style="height: 100% !important;">
    <el-tabs type="border-card" style="height: 97% !important;">
      <el-button 
        type="primary" 
        @click="centerDialogVisible = true"
        style="float: right; width: 100px">
        发布公告
      </el-button>
      <el-table
        ref="table"
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%">

        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="adname" label="发布者"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleView(scope.$index, scope.row)">查看
            </el-button>
            <el-tooltip class="item" effect="dark" content="不是你发布的，无法删除" placement="right" :disabled="(scope.row.adtel==currentAdtel || isSuper)">
              <div style="display: inline-block; margin-left: 6px">
                <el-button
                  size="mini"
                  type="danger"
                  :disabled="!(scope.row.adtel==currentAdtel || isSuper)"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </div>
            </el-tooltip>
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
        title: "交论文二稿",
        content: "大家把第二稿交上了，我们周一晚上开视频会议，大家带上纸和笔记录自己的问题。",
        date: "2022-12-12 12:12:12",
        adname: "sofia",
        adtel: "134"
      },{
        id: 2,
        title: "疫情提醒",
        content: "content",
        date: "2022-12-12 12:12:12",
        adname: "bill",
        adtel: "135"
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