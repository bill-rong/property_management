<template>
<el-container class="info-con">
  <el-row>
    <el-descriptions title="" style="padding-left: 50px"></el-descriptions>
    <div style="display: flex; justify-content: center;">
      <el-form label-position="right" label-width="100px" style="width:400px">
        <el-form-item label="真实姓名：">
          <el-input  placeholder="" v-model="adminInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input placeholder="" v-model="adminInfo.tel" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="adminInfo.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input  placeholder="" v-model="adminInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="权限：">
          <el-input placeholder="" v-model="adminInfo.permission" disabled></el-input>
        </el-form-item>
        <el-button type="primary" :plain="true" @click="submit()">确认修改</el-button>
      </el-form>
    </div>
  </el-row>
</el-container>

</template>

<script>
import { getInfo, updateInfo } from '@/api/adminApi'
import { getUserInfo, setToken } from '@/utils/auth'
import Mode from '@/utils/Mode'
export default {
  data() {
    return {
      adminInfo: {
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }]
    }
  },
  created() {
    let tel = getUserInfo().tel;
    getInfo(tel).then(res => {
      this.adminInfo = res.data;
      console.log(this.adminInfo);
    });
  },
  methods: {
    submit() {
      updateInfo(this.adminInfo).then(res => {
        if (res.data.mode == Mode.UPDATE_INFO_SUCCESS) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        }
      })
    }
  }
}
</script>

<style>
.info-con {
  padding: 30px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12); */
}

.info-div {
  width: 40%;
  height: 100%;
  float: left;
  padding-left: 50px;
}

.btn-div {
    float: left;
    width: 88%;
    margin-top: 20px;
}


.el-descriptions-item {
  font-size: 16px;
}
</style>