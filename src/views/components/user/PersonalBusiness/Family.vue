<template>
  <div style="height: 100% !important;">
    
    <el-tabs type="border-card" style="height: 97% !important;">
      <el-breadcrumb separator-class="el-icon-arrow-right" 
        style="margin-bottom: 30px;">
        <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>个人业务</el-breadcrumb-item>
        <el-breadcrumb-item>家庭成员</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button 
        type="success" 
        @click="centerDialogVisible = true"
        style="float: left; width: 100px">
        添加成员
      </el-button>
      <el-table
        ref="table"
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%">

        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idcard" label="身份证号"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="tel" label="电话号码"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <div style="display: inline-block; margin-left: 6px">
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
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

    <!-- 添加 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form ref="ruleForm" :model="addData"  :rules="rules">
        <el-form-item label="真实姓名：" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入姓名" v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idcard" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入身份证号" maxlength="18" v-model="addData.idcard" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="tel" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入电话号码" maxlength="11" v-model="addData.tel" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex" label-width="30%" style="width: 80%;">
          <el-select v-model="addData.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关系：" prop="relation" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入关系" v-model="addData.relation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="提示"
      :visible.sync="updateDialogVisible"
      width="30%"
      center>
      <el-form :model="row">
        <el-form-item label="真实姓名：" prop="name" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入姓名" v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idcard" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入身份证号" maxlength="18" v-model="row.idcard" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="tel" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入电话号码" maxlength="11" v-model="row.tel" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex" label-width="30%" style="width: 80%;">
          <el-select v-model="row.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关系：" prop="relation" label-width="30%" style="width: 80%;">
          <el-input placeholder="请输入关系" v-model="row.relation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { getAnnouncement, addAnnouncement, deleteAnnouncement } from '@/api/affairsApi'
import { addFamily, getFamilyByTel, updateFamily, deleteFamily } from '@/api/userApi'
import Mode from '@/utils/Mode'
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      updateDialogVisible: false,
      drawer: false,
      drawerData: {
        title: '',
        content: '',
        adname: '',
        date: ''
      },
      addData: {
        name: '',
        sex: '1',
        tel: '',
        relation: '',
        resident_tel: '',
        idcard: ''
      },
      row: {},
      rules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        relation: [
          { required: true, message: '请输入与户主关系', trigger: 'blur' },
        ],
        resident_tel: [
          { required: true, message: '请输入户主手机号', trigger: 'blur' },
        ],
        idcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      currentPage: 1,
      pageSize: 10,
      currentAdtel: '123',
      isSuper: false
    }
  },
  created() {
    this.addData.resident_tel = getUserInfo().tel;
    this.isSuper = getUserInfo().permission == "super";
    getFamilyByTel({tel: getUserInfo().tel}).then(res => { 
      this.tableData = res.data
      this.tableData = this.tableData.map(item => {
        item.sex = item.sex == 1 ? '男' : '女'
        return item
      })
    })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm(`确定删除该公告吗`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteFamily({id: row.id}).then(res => {
          if (res.data.mode == Mode.DELETE_SUCCES) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            getFamilyByTel({tel: getUserInfo().tel}).then(res => { 
              this.tableData = res.data
              this.tableData = this.tableData.map(item => {
                item.sex = item.sex == 1 ? '男' : '女'
                return item
              })
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      }) 
    },
    handleUpdate(index, row) {
      this.row = row
      this.row.sex = this.row.sex == '男' ? '1' : '0'
      this.updateDialogVisible = true
    },
    dialogUpdate() {
      updateFamily(this.row).then(res => {
        if (res.data.mode == Mode.UPDATE_SUCCESS) {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          this.updateDialogVisible = false;
          getFamilyByTel({tel: getUserInfo().tel}).then(res => { 
            this.tableData = res.data
            this.tableData = this.tableData.map(item => {
              item.sex = item.sex == 1 ? '男' : '女'
              return item
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
        }
      })
    },
    // 添加
    dialogSubmit() {
      if (!this.checkForm()) return;
      this.addData.tel = getUserInfo().tel;
      addFamily(this.addData).then(res => {
        if (res.data.mode == Mode.ADD_SUCCESS) {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          this.centerDialogVisible = false;
          getFamilyByTel({tel: getUserInfo().tel}).then(res => { 
            this.tableData = res.data
            this.tableData = this.tableData.map(item => {
              item.sex = item.sex == 1 ? '男' : '女'
              return item
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
        }
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

</style>