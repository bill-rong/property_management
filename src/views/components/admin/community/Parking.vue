<template>
  <el-card shadow="always" class="park-card">
    <!-- <el-empty :image-size="100">
      <el-button type="primary">按钮</el-button>
    </el-empty> -->
    <div class="park-name">{{this.parkingInfo.name}}
      <hr color="#409EFF">
    </div>
    
    <el-image
      style="width: 100px;"
      :src="imgSrc"
      fit="cover">
    </el-image>
    <div class="park-name" style="height: 16px"><span>{{this.parkingInfo.license}}</span></div>
    <div class="park-name" style="height: 16px"><span>{{this.parkingInfo.riName}}</span></div>
    <el-button type="danger" round size="small" v-if="isBing" @click="unBindVisible = true">解绑</el-button>
    <el-button type="success" round size="small" v-if="!isBing" @click="bindVisible = true">绑定</el-button>

    <el-dialog
      title="车位解绑"
      :visible.sync="unBindVisible"
      width="30%">
      <span>确定解绑车位{{this.parkingInfo.name}}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unBindVisible = false">取 消</el-button>
        <el-button type="primary" @click="unBind()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="绑定车位"
      :visible.sync="bindVisible"
      width="30%">
      <el-form  ref="ruleForm" :model="bingObj">
        <el-form-item label="住户手机号" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="bingObj.resident_tel" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="name" label-width="40%" style="width: 80%;">
          <el-input v-model="bingObj.license" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindVisible = false">取 消</el-button>
        <el-button type="primary" @click="bind()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { bindParking, unBindParking } from '@/api/communityApi'
export default {
  props: {
    parkingInfo: {
      type: Object,
      default: {
        id: 1,
        name: 'P1001',
        resident_tel: 1,
        riName: 'Bill',
        license: '粤P 53F25'
      }
    }
  },
  data() {
    return {
      unBindVisible: false,
      bindVisible: false,
      bingObj: {
        resident_tel: '',
        license: ''
      }

    }
  },
  computed: {
    isBing() {
      return this.parkingInfo.license != null
    },
    imgSrc() {
      if (this.isBing) {
        return require('../../../../assets/img/bind_resident.png');
      } else {
        return require('../../../../assets/img/unbind_resident.png');
      }
    }
  },
  methods: {
    unBind() {
      let obj = { id: this.parkingInfo.id };
      unBindParking(obj).then(res => {
        this.$message({message: '解绑成功', type: 'success'})
        this.unBindVisible = false;
        this.$emit("reload", '');
      })
    },
    bind() {
      this.bingObj.id = this.parkingInfo.id;
      bindParking(this.bingObj).then(res => {
        this.$message({message: '绑定成功', type: 'success'})
        this.bindVisible = false;
        this.$emit("reload", '');
      })
    }
  }
 
}
</script>

<style>
.park-name {
  font-weight:bold;
  font-size: 16px;
  margin-bottom: 6px;
}
.park-card {
  width: 170px;
  display: inline-block;
  background-color: #fafafa;
  border: 1px solid #409EFF;
  margin: 5px 10px;
}
</style>