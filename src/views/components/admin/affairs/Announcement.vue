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
        <el-table-column prop="name" label="发布者"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleView(scope.$index, scope.row)">查看
            </el-button>
            <el-tooltip class="item" effect="dark" content="不是你发布的，无法删除" placement="right" :disabled="(scope.row.admin_tel==currentAdtel || isSuper)">
              <div style="display: inline-block; margin-left: 6px">
                <el-button
                  size="mini"
                  type="danger"
                  :disabled="!(scope.row.admin_tel==currentAdtel || isSuper)"
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
          <el-input placeholder="请输入标题" v-model="addData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入内容" v-model="addData.content"></el-input>
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
import { getAnnouncement, addAnnouncement, deleteAnnouncement } from '@/api/affairsApi'
import Mode from '@/utils/Mode'
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      drawer: false,
      drawerData: {
        title: '',
        content: '',
        adname: '',
        date: ''
      },
      addData: {
        title: '',
        content: ''
      },
      currentPage: 1,
      pageSize: 10,
      currentAdtel: '123',
      isSuper: false
    }
  },
  created() {
    this.currentAdtel = getUserInfo().tel;
    this.isSuper = getUserInfo().permission == "super";
    getAnnouncement().then(res => { this.tableData = res.data })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    // 删除公告
    handleDelete(index, row) {
      this.$confirm(`确定删除该公告吗`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteAnnouncement({id: row.id}).then(res => {
          if (res.data.mode == Mode.DELETE_SUCCES) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            getAnnouncement().then(res => { this.tableData = res.data })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      }) 
    },
    // 查看公告
    handleView(index, row) {
      console.log(row);
      this.drawerData = row;
      this.drawer = true;
    },
    // 发布公告
    dialogSubmit() {
      this.addData.tel = getUserInfo().tel;
      addAnnouncement(this.addData).then(res => {
        this.$message({
          type: 'success',
          message: res.data.msg
        });
        this.centerDialogVisible = false;
        getAnnouncement().then(res => { this.tableData = res.data })
      })
    }
  }

}
</script>

<style>

</style>