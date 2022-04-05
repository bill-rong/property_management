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
  getRoom: '/get/room',
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
 * 获取小区信息
 */
router.post(api.updateCommunity, (req, res) => {
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
      jsonWrite(res, {msg: '修改成功'});
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


module.exports = router;