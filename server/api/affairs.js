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
  petGet: '/pet/get',
  petAdd: '/pet/add',
  visitorGet: '/visitor/get',
  visttorAdd: '/visitor/add',
}

// 发布公告
router.post(api.annouAdd, (req, res) => {
  let params = Object.values(req.body);
  params.push(moment(new Date()).format("YYYY-MM-DD HH:mm")); // 格式化时间戳
  let sql = SQL.announcement.add;
  sqlRun(sql, params, (err, result) => {
    if (err) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: '添加公告失败'
      })
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: '添加公告成功'
      })
    }
  })
})

// 获取所有公告
router.get(api.annouGet, (req, res) => {
  let sql = SQL.announcement.get;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
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


// 获取所有宠物
router.get(api.petGet, (req, res) => {
  let sql = SQL.pet.selectAll;
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

// 添加宠物
router.post(api.petAdd, (req, res) => {
  let resident = req.body.tel;
  let variety = req.body.variety;
  let name = req.body.name;
  let documents = req.body.documents;
  let path = req.body.path ? req.body.path : '';
  let sql = SQL.pet.add;
  sqlRun(sql, [resident, variety, name, documents, path], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: '添加成功'
      });
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: '添加失败'
      });
    }
  })
})

// 获取所有访客
router.get(api.visitorGet, (req, res) => {
  let sql = SQL.visitor.selectAll;
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

// 访客登记
router.get(api.visttorAdd, (req, res) => {
  let [name, room, resident, purposr, date] = req.body
  let sql = SQL.visitor.selectAll;
  sqlRun(sql, [name, room, resident, purposr, date], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: '添加成功'
      });
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: '添加失败'
      });
    }
  })
})





module.exports = router;