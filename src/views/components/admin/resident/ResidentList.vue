<template>
  <div>
    <el-tabs type="border-card" style="height: 97% !important;">
      <el-tab-pane label="住户列表">
        <el-menu
          unique-opened
          class="el-menu-vertical-demo"
          style="text-align: left;"
          @open="handleOpen">

          <el-submenu
            v-for="bditem in bdList"
            :key="bditem.id"
            :index="bditem.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{bditem.name}}楼</span>
            </template>
            <el-menu-item-group>
              <div class="list-group" v-for="resItem in residentList" :key="resItem.id" style="float: left">
                <a href="#" class="list-group-item resident-item" 
                  @click="itemClick(resItem.riid)" 
                  v-if="bditem.id==resItem.bdid">
                  <h4 class="list-group-item-heading">{{resItem.name}}</h4>
                  <p class="list-group-item-text">{{resItem.riname}}</p>
                </a>
              </div>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-tab-pane>
    </el-tabs>

    <el-drawer
      :title="drawerData.id"
      :visible.sync="drawer"
      direction="ltr">
      <p style="word-break:break-word; text-align: left; text-indent:2em; margin: 0 7px">{{this.drawerData.id + ''}}</p>
      
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      residentList: [{
        id: 1,
        name: 'A1101',
        bdid: 1,
        bdname: 'A1',
        riid: 1,
        riname: 'bill'
      },{
        id: 2,
        name: 'A1102',
        bdid: 1,
        bdname: 'A1',
        riid: 2,
        riname: 'sofia'
      },{
        id: 3,
        name: 'A1103',
        bdid: 1,
        bdname: 'A1',
        riid: 3,
        riname: 'violet'
      },{
        id: 4,
        name: 'A2103',
        bdid: 2,
        bdname: 'A2',
        riid: 4,
        riname: 'biu'
      }],
      bdList: [{
        id: 1,
        name: 'A1'
      },{
        id: 2,
        name: 'A2'
      },{
        id: 3,
        name: 'A3'
      }],
      drawerData: {
        id: 1
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    itemClick(id) {
      this.drawer = true;
      this.drawerData.id = id;
      console.log(id);
      // 这里调取获得对应住户信息的api
    }
  }

}
</script>

<style>
.resident-item {
  display: inline-block !important;
  margin: 5px 6px;
  width: 260px;
  border-radius: 4px;
  background-color: #6fa7df !important;
}

</style>