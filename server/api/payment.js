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
  getUnPay: '/get/unPay',
  getPay: '/get/pay',
  getUnPayByRoom: '/get/unPay/byRoom',
  getPayByRoom: '/get/pay/byRoom',
  pay: '/pay'
}

router.get(api.getUnPay, (req, res) => {
  let sql = SQL.payment.selectUnPay;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

router.get(api.getPay, (req, res) => {
  let sql = SQL.payment.selectPay;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      for (let i=0; i<data.length; i++) {
        data[i].paydate = moment(data[i].paydate).format("YYYY-MM-DD HH:mm");
      }
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

router.get(api.getUnPayByRoom, (req, res) => {
  let param = req.query.room
  console.log(param);
  let sql = SQL.payment.selectUnPayByRoom;
  sqlRun(sql, param, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

router.get(api.getPayByRoom, (req, res) => {
  let param = req.query.room;
  let sql = SQL.payment.selectPayByRoom;
  sqlRun(sql, param, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      for (let i=0; i<data.length; i++) {
        data[i].paydate = moment(data[i].paydate).format("YYYY-MM-DD HH:mm");
      }
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

router.post(api.pay, (req, res) => {
  delete req.body.tel;
  let { handler, id } = req.body;
  let date = moment(new Date()).format("YYYY-MM-DD HH:mm");
  let sql = SQL.payment.pay;
  console.log(handler, id);
  sqlRun(sql, [handler, date, id], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {;
      jsonWrite(res, {
        msg: '支付成功'
      });
    }
  })
})






module.exports = router;