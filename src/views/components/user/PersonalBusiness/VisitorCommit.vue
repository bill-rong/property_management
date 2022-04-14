<template>
    <div class="outDiv">
      <el-form :model="ruleForm" 
      :rules="rules" ref="ruleForm" 
      label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="到访房号" prop="room">
          <el-input v-model="ruleForm.room"></el-input>
        </el-form-item>


        <el-form-item label="户主姓名" prop="resident ">
          <el-input v-model="ruleForm.resident "></el-input>
        </el-form-item>
        

        <el-form-item label="来访目的" prop="purpose">
          <el-input type="textarea" v-model="ruleForm.purpose"></el-input>
        </el-form-item>


        <el-form-item>
        <el-button class="upBtn" type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        </el-form-item>
    </el-form>

    </div>
</template>

<script>
import UploadImg from '../../../../components/UploadImg.vue'

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
          resident: '', 
          purpose: '',
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
          purpose: [
            { required: true, message: '请输入到访目的', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          resident: [
            { required: true, message: '请输入户主姓名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
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
        this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('进入提交阶段')
          let {gid, name, price, type, parameter, introduction, img} = this.ruleForm;
          if (this.title === '编辑商品') {
            if(this.imgUrl != ''){        // 判断是否重新上传图片，若重新上传则重新赋值图片地址
              img = this.imgUrl;
            }
            this.$api.updateGoods({gid, name, price, type, parameter, introduction, img})
            .then((res) => {
              if(res.status == 200){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              }else {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                })
                return false;
              }
            })
          }else{
            let imgUrl = this.imgUrl;
            console.log(gid, name, price, type, parameter, introduction, imgUrl)
            this.$api.addGoods({gid, name, price, type, parameter, introduction, imgUrl})
            .then((res) => {
              if(res.status == 200){
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            }) 
          }
        } else {
          console.log('添加失败');
          return false;
        }
        });
        setTimeout(() => {
          history.go(0)
        }, 700);
      },
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