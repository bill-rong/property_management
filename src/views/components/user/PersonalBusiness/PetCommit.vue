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
        <el-form-item label="宠物名称" prop="name" label-width="20%">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="所属房号" prop="room" label-width="20%">
          <el-input v-model="ruleForm.room" disabled></el-input>
        </el-form-item>

        <el-form-item label="品种" prop="variety" label-width="20%">
          <el-input v-model="ruleForm.variety"></el-input>
        </el-form-item>

        <el-form-item label="证件是否齐全" prop="documents" label-width="20%">
          <el-select v-model="ruleForm.documents" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片"  label-width="20%">

            <UploadImg @uploadSuccess="uploadSuccess"></UploadImg>
            
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="dialogVisibleImg = false">取 消</el-button>
            </span> -->
        </el-form-item>

        <!-- <el-dialog
        title="提示"
        :visible.sync="dialogVisibleImg"
        width="30%"
        append-to-body>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="dialogVisibleImg = false">取 消</el-button>
            </span>
        </el-dialog> -->

        <el-form-item>
        <el-button class="upBtn" type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        </el-form-item>
    </el-form>

    </div>
  </el-tabs>
</template>

<script>
import UploadImg from '@/components/UploadImg.vue'
import { addPet } from '@/api/affairsApi'
import { getUserInfo } from '@/utils/auth'
import { getUser } from '@/api/userApi'
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
        variety: '',
        documents: '', 
        path: ''
      },
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      rules: {
        name: [
          { required: true, message: '请输入宠物名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        room: [
          { required: true, message: '请输入房号', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        variety: [
          { required: true, message: '请选择宠物品种', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        documents: [
          { required: true, message: '请输入宠物证件号', trigger: 'blur' },
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

  methods: {
    // 关闭弹窗时发送的事件
    handleDialogClose() {
        this.$emit('changeDialog')
      },

    // 获取图片地址
    uploadSuccess(path) {
      console.log("获取path", path);
      this.ruleForm.path = path;
    },

    submitForm(formName) {
      console.log(this.ruleForm);
      if (!this.checkForm()) return;
      addPet(this.ruleForm).then(res => {
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