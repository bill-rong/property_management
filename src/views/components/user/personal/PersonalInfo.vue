<template>
<el-container class="info-con">
  <el-row>
    <el-descriptions title="" column="1" style="padding-left: 50px"></el-descriptions>
    <div class="info-div" style="border-right: 1px solid rgba(0, 0, 0, .12)">
      <el-form label-position="right" label-width="100px" :model="formLabelAlign" style="width:400px">
        <el-form-item label="真实姓名：">
          <el-input  placeholder="" v-model="residentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input placeholder="" v-model="residentInfo.tel"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input  placeholder="" v-model="residentInfo.idcard"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="residentInfo.sex" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="info-div">
      <el-form label-position="right" label-width="100px" :model="formLabelAlign" style="width:400px">
        <el-form-item label="邮箱：">
          <el-input  placeholder="" v-model="residentInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="生日：">
          <el-input  placeholder="" v-model="residentInfo.birthday"></el-input>
        </el-form-item>
        <el-form-item label="入住时间：">
          <el-input  placeholder="" v-model="residentInfo.living"></el-input>
        </el-form-item>
        <el-form-item label="房号：">
          <el-input  placeholder="" v-model="residentInfo.room"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-div"><el-button type="primary" :plain="true">确认修改</el-button></div>
  </el-row>
</el-container>

</template>

<script>
export default {
  data() {
    return {
      residentInfo: {
        name: '',
        tel: '',
        idcard: '',
        age: 18,
        sex: '1',
        email: '',
        birthday: '',
        living: '',
        room: ''
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }]
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

.el-tabs__content {
  height: 500px !important; 
}


.el-descriptions-item {
  font-size: 16px;
}
</style>