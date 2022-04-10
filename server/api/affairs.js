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
  annouAdd: '/announcement/add',
  annouGet: '/announcement/get',
}

router.post(api.annouAdd, (req, res) => {
  let params = req.body;
  let sql = SQL.announcement.add;
  sqlRun(sql, params, (err, result) => {
    if (err) {
      jsonWrite(res, {
        msg: '添加公告失败'
      })
    }
    if (result) {
      jsonWrite(res, {
        msg: '添加公告成功'
      })
    }
  })
})

router.get(api.annouGet, (req, res) => {
  let sql = SQL.announcement.get;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      for (let i=0; i<data.length; i++) {
        data[i].date = moment(data[i].date).format("YYYY-MM-DD HH:MM");
      }
      jsonWrite(res, data);
    }
  })
})







module.exports = router;