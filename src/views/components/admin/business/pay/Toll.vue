<template>
  <div>
    <el-form label-position="right" label-width="100px" style="width:400px; height: 96% !important;margin:0 auto;">
        <el-form-item label="类别：">
          <el-select v-model="data.type" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号：">
          <el-autocomplete
            class="inline-input"
            v-model="data.room"
            :fetch-suggestions="querySearch"
            placeholder="请输入房号"
            style="width:100%"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="数值：">
          <el-input  placeholder="" v-model="data.current"></el-input>
        </el-form-item>
        <el-form-item label="年-月：">
          <el-input placeholder="年" v-model="data.curryear" style="width:40%;float:left"></el-input>
          <el-input  placeholder="月" v-model="data.currmonth" style="width:40%;float:left;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input  placeholder="" v-model="data.amount" disabled></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :plain="true" @click="submit()">确认</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {getRoomName} from '@/api/communityApi'
import { toll } from '@/api/paymentApi'
import Mode from '@/utils/Mode'
export default {
  data() {
    return {
      water: 5,
      elec: 0.67,
      options: [{
        value: '水',
        label: '水'
      }, {
        value: '电',
        label: '电'
      }],
      data: {
        type: '水',
        room: '',
        current: 0,
        curryear: '',
        currmonth: '',
        amount: 0
      },
      restaurants: [],
    }
  },
  updated() {
    let flag = this.data.type == '水'?5:(this.data.type == '电'?0.67:0);
    this.data.amount = this.data.current * flag;
    this.data.amount.toFixed(2)
  },
  
  methods: {
    submit() {
      toll(this.data).then(res => {
        if (res.data.mode == Mode.TOLL_SUCCESS) {
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
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        let list = [];
        getRoomName().then(res => {
          list = res.data;
        })
        return list;
      },
  },
  created() {
    this.data.curryear = new Date().getFullYear();
    this.data.currmonth = new Date().getMonth() + 1;
    getRoomName().then(res => {
      this.restaurants = res.data;
    });
  }
}
</script>

<style>

</style>