<template>
  <div class="container" style="width:80%">
    <div class="row">
      <div class="col-md-3 card-col">
        <div class="card card-1">
          <div class="icon"><i class="el-icon-c-scale-to-original"></i></div>
          <div class="title"><span>车位统计</span></div>
          <br><br><br>
          <div style="font-size: 40px;float: left;margin-left: 20px"><span>0</span></div>
          <div style="font-size: 40px;float: right;margin-right: 20px"><span>0</span></div>
          <br><br><br>
          <div style="font-size: 20px;float: left;margin-left: 10px"><span>总车位数</span></div>
          <div style="font-size: 20px;float: right;margin-left: 10px"><span>已绑车位数</span></div>
        </div>
      </div>
      <div class="col-md-3 card-col">
        <div class="card card-2">
          <div class="icon"><i class="el-icon-s-home"></i></div>
          <div class="title"><span>房屋统计</span></div>
          <br><br><br>
          <div style="font-size: 40px;float: left;margin-left: 20px"><span>0</span></div>
          <div style="font-size: 40px;float: right;margin-right: 20px"><span>0</span></div>
          <br><br><br>
          <div style="font-size: 20px;float: left;margin-left: 10px"><span>总房间数</span></div>
          <div style="font-size: 20px;float: right;margin-left: 10px"><span>已入住房数</span></div>
        </div>
      </div>
      <div class="col-md-3 card-col">
        <div class="card card-3">
          <div class="icon"><i class="el-icon-user-solid"></i></div>
          <div class="title"><span>人数统计</span></div>
          <br><br><br>
          <div style="font-size: 40px;float: left;margin-left: 20px"><span>0</span></div>
          <!-- <div style="font-size: 40px;float: right;margin-right: 20px"><span>0</span></div> -->
          <br><br><br>
          <div style="font-size: 20px;float: left;margin-left: 10px"><span>住户数量</span></div>
          <!-- <div style="font-size: 20px;float: right;margin-left: 10px"><span>已绑车位数</span></div> -->
        </div>
      </div>
      <div class="col-md-3 card-col">
        <div class="card card-4">
          <div class="icon"><i class="el-icon-s-opportunity"></i></div>
          <div class="title"><span>宠物统计</span></div>
          <br><br><br>
          <div style="font-size: 40px;float: left;margin-left: 20px"><span>0</span></div>
          <!-- <div style="font-size: 40px;float: right;margin-right: 20px"><span>0</span></div> -->
          <br><br><br>
          <div style="font-size: 20px;float: left;margin-left: 10px"><span>宠物数量</span></div>
          <!-- <div style="font-size: 20px;float: right;margin-left: 10px"><span>已绑车位数</span></div> -->
        </div>
      </div>
    </div>
    <div class="row" style="height:150px"></div>
    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">近半年水使用状况</div>
          <div class="panel-body">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-2"></div> -->
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">近半年电使用状况</div>
          <div class="panel-body">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
    }
  }

}
</script>

<style>
.card-col {
  padding:6px;
  height: 180px;
  color: rgb(223, 222, 222);
}
.card {
  /* background-color: #0073b6; */
  height: 100%;
  width: 100%;
  padding: 10px;
}
.icon {
  /* color: #000; */
  font-size: 40px;
  font-weight: bold;
  float: left;
}
.title {
  margin-left: 10px;
  margin-top: 5px;
  /* color: #000; */
  font-size: 30px;
  font-weight: bold;
  float: left;
  height: 40px;
  line-height: 40px;
}
.card-1 {
  border-radius: 10px;
  background-color: #0073b6;
}
.card-2 {
  border-radius: 10px;
  background-color: #43a1df;
}
.card-3 {
  border-radius: 10px;
  background-color: #807bb6;
}
.card-4 {
  border-radius: 10px;
  background-color: #1bd4b2;
}
</style>