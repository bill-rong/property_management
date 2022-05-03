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

// 投诉上报
router.post(api.report, (req, res) => {
  let param = req.body;
  param.date = moment(new Date()).format("YYYY-MM-DD HH:mm");
  let sql = SQL.complaint.add;
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

// 未处理的投诉
router.get(api.getUnHandle, (req, res) => {
  let sql = SQL.complaint.selectUnHandle;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      for (let i=0; i<data.length; i++) {
        data[i].date = moment(data[i].date).format("YYYY-MM-DD HH:mm");
      }
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 已处理的投诉
router.get(api.getHandle, (req, res) => {
  let sql = SQL.complaint.selectHandle;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      for (let i=0; i<data.length; i++) {
        data[i].date = moment(data[i].date).format("YYYY-MM-DD HH:mm");
      }
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 处理投诉
router.put(api.handle, (req, res) => {
  let id = req.body.id + '';
  let sql = SQL.complaint.handle;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500);
      jsonWrite(res, {
        msg: "后端异常"
      })
    }
    if (result) {
      jsonWrite(res, {
        msg: '处理成功'
      });
    }
  })
})


module.exports = router;