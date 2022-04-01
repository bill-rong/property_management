<template>
  <div class="outside">

    <el-tabs type="border-card">
        <el-tab-pane label="个人信息">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content bg-purple" v-if="!!userData[0]">工号：{{userData[0].number}}
                
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="200">
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">姓名：{{userData[0].name}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeName"></el-button>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">性别：{{userData[0].sex}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeSex"></el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="200"> 
            <el-col :span="8"><div class="grid-content bg-purple">身份：教员
              <el-button class="editBtn" icon="el-icon-edit"  :disabled = true></el-button>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">院系：{{userData[0].faculty}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeFaculty"></el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="200">
            <el-col :span="8"><div class="grid-content bg-purple" v-if="!!userData[0]">手机号：{{userData[0].phone}}
              <el-button class="editBtn" icon="el-icon-edit" @click="changePhone"></el-button></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" v-if="!!userData[0]">邮箱：{{userData[0].email}}
              <el-button class="editBtn" icon="el-icon-edit" @click="changeEmail"></el-button></div></el-col>
          </el-row>
        </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-row :gutter="150">
          <div>
            <ChangePassword @subPwd="subPwd"></ChangePassword>
            <ChangeMessage :tableName="tableName" :nDialog='nDialog' :fDialog="fDialog" :eDialog="eDialog" :pDialog="pDialog" :sDialog="sDialog" @changeDialog="changeDialog"></ChangeMessage>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue' 
import ChangeMessage from './ChangeMessage.vue'


export default {
  components: {
    ChangePassword,
    ChangeMessage
  },
  props: {
    userData: {
      type: Array,
      default() {
        return ''
      }
    },
    tableName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      nDialog: false,
      sDialog: false,
      fDialog: false,
      pDialog: false,
      eDialog: false,
      // tableName: 'tableName'
    }
  },


  methods: {
    subPwd(subPwd) {
      console.log(subPwd)
      this.$api.changePwd({
          number: 6,
          subPwd,
          tableName: 'tuser'
        }).then(res => {
          console.log(res.data);
          if(res.status == 200){
            alert
          }
        })
    },

    // 修改弹窗状态
    changeDialog(){
      this.nDialog = false;
      this.sDialog = false;
      this.fDialog = false;
      this.pDialog = false;
      this.eDialog = false;
      console.log('changeDialog()事件接收了！')
    },


    changeName() {
      this.nDialog = true
    },

    changeSex() {
      this.sDialog = true
    },

    changeFaculty() {
      this.fDialog = true
    },

    changePhone() {
      this.pDialog = true
    },

    changeEmail() {
      this.eDialog = true
    },
  }
}
</script>

<style>
  .outside {
    margin-top: 30px;
    width: 80%;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    padding: 10px;
    margin: auto;
  }

  .editBtn {
      height: 5%;
			width: 12%;
			border-radius: 5px;
			background-color:transparent;
			border: 0;
			outline:none;
			-webkit-background-size:cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
  }
</style>