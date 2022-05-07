<template>
<el-tabs type="border-card" style="height: 97% !important;">
  <div class="container" style="margin-top: 30px">
    <div class="row">
      <div class="col-md-7">
        <div class="panel panel-default"  style="height:500px">
          <div class="panel-heading">近半年水电使用状况</div>
          <div class="panel-body">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
          </div>
        </div>
        
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-4" >
        <div class="panel panel-default" style="height:500px;overflow:auto">
          <div class="panel-heading">公告栏</div>
          <div class="panel-body">
            <a href="#"
              class="list-group-item"
              v-for="item in annData"
              :key="item"
              @click="click(item)"
              >{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>
    
        <!-- 显示公告 -->
    <el-drawer
      :title="row.title"
      :visible.sync="drawer"
      direction="ltr">
      <p style="word-break:break-word;white-space: pre-wrap; text-align: left; text-indent:2em; margin: 0 7px">{{this.row.content}}</p>
      <div style="float: right;margin: 0 10px">
        <p>{{this.row.name}}</p>
        <p>{{this.row.date}}</p>
      </div>
    </el-drawer>
    
  </div>
  </el-tabs>
</template>

<script>
import {getAnnouncement} from '@/api/affairsApi'
import { getElecByRoom, getWaterByRoom } from '@/api/paymentApi'
import { getUser } from '@/api/userApi'
import { getUserInfo } from '@/utils/auth'
export default {
  data () {
    this.chartSettings = {}
    return {
      drawer: false,
      chartData: {
        columns: ['日期', '水', '电'],
        rows: [
          { '日期': '2021/11', '水': 11, '电': 99 },
          { '日期': '2021/12', '水': 14, '电': 90 },
          { '日期': '2022/01', '水': 18, '电': 96 },
          { '日期': '2022/02', '水': 12, '电': 95 },
          { '日期': '2022/03', '水': 14, '电': 88 },
          { '日期': '2022/04', '水': 13, '电': 100 }
        ]
      },
      annData: {},
      row: {}
    }
  },
  created() {
    this.$emit("indexCreate", "index");
    getAnnouncement().then(res => {
      this.annData = res.data
    })

    getUser(getUserInfo().tel).then(res => {
      let room = res.data.room
      getWaterByRoom(room).then(res => {
        console.log(res.data);
        getElecByRoom(room).then(eRes => {
          console.log(eRes.data);
          for (let i=0; i<6; i++) {
            Object.assign(res.data[i], eRes.data[i])
          }
          console.log(res.data);
          this.chartData.rows = res.data
        })
      })
    })
  },
  methods: {
    click(row) {
      console.log(row);
      this.row = row;
      this.drawer = true;
    }
  }
}
</script>

<style>

</style>