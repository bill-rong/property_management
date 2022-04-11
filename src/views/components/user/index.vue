<template>
<el-tabs type="border-card" style="height: 97% !important;">
  <div class="container">
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
              >{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-8">
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </div>
      <div class="col-md-4">
        <div class="list-group" style="margin-top:50px">
          <a href="#" class="list-group-item active">
            公告栏
          </a>
          <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
          <a href="#" class="list-group-item">Morbi leo risus</a>
          <a href="#" class="list-group-item">Porta ac consectetur ac</a>
          <a href="#" class="list-group-item">Vestibulum at eros</a>
        </div>
      </div>
    </div> -->
    
  </div>
  </el-tabs>
</template>

<script>
import {getAnnouncement} from '@/api/affairsApi'
export default {
  data () {
    this.chartSettings = {}
    return {
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
      annData: {}
    }
  },
  created() {
    this.$emit("indexCreate", "index");
    getAnnouncement().then(res => {
      this.annData = res.data
    })
  }
}
</script>

<style>

</style>