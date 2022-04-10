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
  
}

router.post(api.report, (req, res) => {
  let param = req.body;
  param.date = moment(new Date()).format("YYYY-MM-DD HH:MM");
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


module.exports = router;