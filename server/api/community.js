const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');
const SQL = require('../sqlMap');
const bcryptjs = require('../utils/BcryptJS');
const bcrypt = require('../utils/BcryptJS');
const MODE = require('../utils/Mode');
const jsonWrite = require('../utils/JsonWrite');
const JWT = require('../utils/Token');
const moment = require('moment');

const api = {
  // 根/api/community/
  getCommunity: '/get/community',
  updateCommunity: '/update/community',
  getBuilding: '/get/building',
  updateBuilding: '/update/building',
  getRoom: '/get/room',
  updateRoom: '/update/room'
}

/**
 * 获取小区信息
 */
router.get(api.getCommunity, (req, res) => {
  let sql = SQL.community.select;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result[0]));
      jsonWrite(res, data);
    }
  });
});

/**
 * 更新小区信息
 */
router.put(api.updateCommunity, (req, res) => {
  let data = req.body;
  delete data.tel;
  data.created = moment(data.created).format("YYYY-MM-DD");
  let arr = [];
  for (let item in data) {
    arr.push(data[item]);
  }
  let sql = SQL.community.update;
  sqlRun(sql, arr, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_SUCCESS,
        msg: '修改成功'
      });
    }
  });
});

/**
 * 获取楼信息
 */
router.get(api.getBuilding, (req, res) => {
  let sql = SQL.community.selectBuilding;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data);
    }
  });
});

 /**
 * 更新楼信息
 */
router.put(api.updateBuilding, (req, res) => {
  let data = req.body;
  delete data.tel;
  let arr = [data.name, data.id];
  let sql = SQL.community.updateBuilding;
  sqlRun(sql, arr, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      console.log("result", result);
      jsonWrite(res, {
        mode: MODE.UPDATE_SUCCESS,
        msg: '修改成功'
      });
    }
  });
});


 /**
 * 获取房信息
 */
router.get(api.getRoom, (req, res) => {
  let sql = SQL.community.selectRoom;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data);
    }
  });
});

 /**
 * 更新房信息
 */
router.put(api.updateRoom, (req, res) => {
  let {living, resident_id, name} = req.body;
  let arr = [];
  let sql = ""
  if (living=='0') {
    sql = SQL.community.updateRoomUnLiving;
    arr = [name];
  } else {
    sql = SQL.community.updateRoomLiving;
    arr = [resident_id, name];
  }
  sqlRun(sql, arr, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_SUCCESS,
        msg: '修改成功'
      });
    }
  });
});


module.exports = router;