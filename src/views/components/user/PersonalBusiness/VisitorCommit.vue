<template>
  <el-tabs type="border-card" tab-position="left" style="height: 97% !important;">
    <el-tab-pane label="访客登记">
      <el-breadcrumb separator-class="el-icon-arrow-right" 
        style="margin-bottom: 30px;">
        <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>个人业务</el-breadcrumb-item>
        <el-breadcrumb-item>访客登记</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="outDiv">
        <el-form :model="ruleForm" 
        :rules="rules" ref="ruleForm" 
        label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" label-width="20%">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="到访房号" prop="room" label-width="20%">
            <el-input v-model="ruleForm.room" disabled></el-input>
          </el-form-item>


          <el-form-item label="户主姓名" prop="resident " label-width="20%">
            <el-input v-model="ruleForm.resident" disabled></el-input>
          </el-form-item>
          

          <el-form-item label="来访目的" prop="purpose" label-width="20%">
            <el-input type="textarea" v-model="ruleForm.purpose"></el-input>
          </el-form-item>

          <el-form-item label="到访时间" prop="date" label-width="20%">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
          <el-button class="upBtn" type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
          </el-form-item>
      </el-form>

      </div>
    </el-tab-pane>
    <el-tab-pane label="登记记录">
      <el-breadcrumb separator-class="el-icon-arrow-right" 
        style="margin-bottom: 30px;">
        <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
        <el-breadcrumb-item>个人业务</el-breadcrumb-item>
        <el-breadcrumb-item>登记记录</el-breadcrumb-item>
      </el-breadcrumb>
      <VisitorList></VisitorList>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import VisitorList from './VisitorList.vue'
import { addVisitor } from '@/api/affairsApi'
import { getUserInfo } from '@/utils/auth'
import { getUser } from '@/api/userApi'
import Mode from '@/utils/Mode'

export default {
  components: {
    VisitorList,
  },

  props: {
    rowData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  data() {
      return {
      dialogVisible: false,
      dialogVisibleImg: false,    // 上传图片弹窗
      imgUrl: '',

      ruleForm: {
        name: '',
        room: '',
        resident: '', 
        purpose: '',
        date: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        room: [
          { required: true, message: '请输入房号', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resident: [
          { required: true, message: '请输入户主姓名', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        purpose: [
          { required: true, message: '请输入到访目的', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date: [{ required: true, message: '请输入到访时间', trigger: 'blur' }]
        
      }
    };
  },
  created() {
    this.ruleForm.resident = getUserInfo().name;
    getUser(getUserInfo().tel).then(res => {
      this.ruleForm.room = res.data.room;
    })
  },

  methods: {
    submitForm(formName) {
      if (!this.checkForm()) return;
      addVisitor(this.ruleForm).then(res => {
        if (res.data.mode == Mode.ADD_SUCCESS){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
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

<style scoped>
  .outDiv {
    margin-left: 20%;
    margin-top: 39px;
    width: 50%;
    /* height: 70%; */
  }

  .upBtn {
    position: absolute;
    right: 0%;
  }

  .el-form {
    left: 5% !important;
  }

  ::v-deep .el-form-item__content {
    display: flex;
    justify-content: start;
    width: 500px;
  }

  ::v-deep .el-upload--picture-card {
    width: 130px;
    height: 130px;
  }

</style>