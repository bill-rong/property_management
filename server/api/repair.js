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
  report: '/report',
  getUnHandle: '/get/unHandle',
  getHandle: '/get/handle',
  handle: '/handle'
}

// 报修上报
router.post(api.report, (req, res) => {
  let param = req.body;
  param.date = moment(new Date()).format("YYYY-MM-DD HH:mm");
  let sql = SQL.repair.add;
  let arr = Object.values(param);
  sqlRun(sql, arr, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result) {
      jsonWrite(res, {
        msg: "上报成功"
      })
    }
  })
})

// 未处理的维修
router.get(api.getUnHandle, (req, res) => {
  let sql = SQL.repair.selectUnHandle;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result.length > 0) {
      jsonWrite(res, result);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 已处理的维修
router.get(api.getHandle, (req, res) => {
  let sql = SQL.repair.selectHandle;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result.length > 0) {
      jsonWrite(res, result);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 处理维修
router.put(api.handle, (req, res) => {
  let id = req.body.id;
  let sql = SQL.repair.handle;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result.length > 0) {
      jsonWrite(res, {
        msg: '处理成功'
      });
    } else {
      jsonWrite(res, {
        msg: '处理失败'
      });
    }
  })
})


module.exports = router;