<template>
  <el-tabs type="border-card" style="height: 97% !important;">
    <el-breadcrumb separator-class="el-icon-arrow-right" 
      style="margin-bottom: 30px;">
      <el-breadcrumb-item :to="{ path: '/home/' }">大厅</el-breadcrumb-item>
      <el-breadcrumb-item>个人业务</el-breadcrumb-item>
      <el-breadcrumb-item>健康上报</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="outDiv">
      <el-form :model="ruleForm" 
      :rules="rules" ref="ruleForm" 
      label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="房号" prop="room">
          <el-input v-model="ruleForm.room"></el-input>
        </el-form-item>


        <el-form-item label="症状">
          <el-checkbox-group v-model="ruleForm.symptom">
            <el-checkbox label="正常" name="type"></el-checkbox>
            <el-checkbox label="发热" name="type"></el-checkbox>
            <el-checkbox label="腹泻" name="type"></el-checkbox>
            <el-checkbox label="头痛/头晕" name="type"></el-checkbox>
            <el-checkbox label="恶心/呕吐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="体温" prop="temperature">
          <el-input v-model="ruleForm.temperature"></el-input>
        </el-form-item>

        <el-form-item label="补充">
          <el-input type="textarea" v-model="ruleForm.supplement"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button class="upBtn" type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        </el-form-item>
    </el-form>

    </div>
  </el-tabs>
</template>

<script>
import UploadImg from '@/components/UploadImg.vue'
import { getUserInfo } from '@/utils/auth'
import { getUser } from '@/api/userApi'
import { postHealthy } from '@/api/affairsApi'
import Mode from '@/utils/Mode'

export default {
  components: {
    UploadImg,
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
        symptom: [],
        temperature: '', 
        supplement: ''
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
        symptom: [
          { required: true, message: '请选择症状', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        temperature: [
          { required: true, message: '请输入体温', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // supplement: [
        //   { required: true, message: '请输入宠物证件号', trigger: 'blur' },
        //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        time1: [
          { required: true, message: '请选择时间', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        time2: [
          { required: true, message: '请选择时间', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    };
  },

  created() {
    getUser(getUserInfo().tel).then(res => {
      this.ruleForm.room = res.data.room;
    })
  },

  watch: {
    rowData(val) {
      console.log('触发监听器', val)
      this.ruleForm = val;
    } 
  },

  methods: {
    // 关闭弹窗时发送的事件
    handleDialogClose() {
        this.$emit('changeDialog')
      },

    // 获取图片地址
    sendImg(val) {
      console.log('显示图片路径', val)
      this.imgUrl = val
    },


    submitForm(formName) {
      if (!this.checkForm()) return;
      console.log(this.ruleForm);
      postHealthy(this.ruleForm).then(res => {
        if (res.data.mode == Mode.ADD_SUCCESS) {
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
  }

  .upBtn {
    position: absolute;
    right: 0%;
  }

  .el-form demo-ruleForm {
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