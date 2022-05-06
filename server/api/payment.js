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
  pay: '/pay',
  toll: '/toll',
  delete: '/delete'
}

// 获取未支付记录
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

// 获取已支付记录
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

// 获取某房号的未支付记录
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

// 获取某房号的已支付记录
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

// 支付
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

// 收取费用
router.post(api.toll, (req, res) => {
  let { type, room, current, curryear, currmonth, amount } = req.body;
  let sql = SQL.payment.toll;
  sqlRun(sql, [type, room, current, curryear, currmonth, amount], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {;
      jsonWrite(res, {
        mode: MODE.TOLL_SUCCESS,
        msg: '收费发起成功'
      });
    } else {
      jsonWrite(res, {
        mode: MODE.TOLL_FAILURE,
        msg: '收费发起失败'
      });
    }
  })
})

// 删除
router.delete(api.delete, (req, res) => {
  let id = req.query.id;
  let sql = SQL.payment.delete;
  sqlRun(sql, id, (err, result) => {
    if (err) { console.log("err", err) }
    if (result) {
      jsonWrite(res, {
        mode: MODE.DELETE_SUCCES,
        msg: "删除成功"
      })
    } else {
      jsonWrite(res, {
        mode: MODE.DELETE_FAILURE,
        msg: "删除失败"
      })
    }
  })
})




module.exports = router;