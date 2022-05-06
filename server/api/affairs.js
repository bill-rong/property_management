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
  annouDelete: '/announcement/delete',
  petGet: '/pet/get',
  petAdd: '/pet/add',
  visitorGet: '/visitor/get',
  visitorAdd: '/visitor/add',
  visitorDelete: '/visitor/delete',
  healthyGet: '/healthy/get',
  healthyDelete: '/healthy/delete',
  healthyPost: '/healthy/post'
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

// 删除公告
router.delete(api.annouDelete, (req, res) => {
  let id = req.query.id;
  let sql = SQL.announcement.delete;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.DELETE_SUCCES,
        msg: '删除成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.DELETE_FAILURE,
        msg: '删除失败'
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
  let room = req.body.room;
  let variety = req.body.variety;
  let name = req.body.name;
  let documents = req.body.documents;
  let path = req.body.path ? req.body.path : '';
  let sql = SQL.pet.add;
  sqlRun(sql, [room, variety, name, documents, path], (err, result) => {
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
      data = data.map((item) => {
        item.date = moment(item.date).format("YYYY-MM-DD");
        return item
      })
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 访客登记
router.post(api.visitorAdd, (req, res) => {
  let { name, room, resident, purpose, date } = req.body;
  let sql = SQL.visitor.add;
  date =  moment(date).format("YYYY-MM-DD");
  sqlRun(sql, [name, room, resident, purpose, date], (err, result) => {
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

// 删除访客
router.delete(api.visitorDelete, (req, res) => {
  let id = req.query.id;
  let sql = SQL.visitor.delete;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.DELETE_SUCCES,
        msg: '删除成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.DELETE_FAILURE,
        msg: '删除失败'
      })
    }
  })
})

// 健康上报
router.post(api.healthyPost, (req, res) => {
  let { name, room, symptom, temperature, supplement } = req.body;
  let report_time = moment(new Date()).format("YYYY-MM-DD");
  let symptomStr = symptom.join('、');
  let sql = SQL.healthy.add;
  sqlRun(sql, [name, room, symptomStr, temperature, supplement, report_time], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: '上报成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: '上报失败'
      })
    }
  })
})

// 获取健康上报
router.get(api.healthyGet, (req, res) => {
  let sql = SQL.healthy.selectAll;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      data = data.map((item) => {
        item.report_time = moment(item.report_time).format("YYYY-MM-DD");
        return item
      })
      jsonWrite(res, data);
    } else {
      jsonWrite(res, []);
    }
  })
})

// 删除健康上报
router.delete(api.healthyDelete, (req, res) => {
  let id = req.query.id;
  let sql = SQL.healthy.delete;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.DELETE_SUCCES,
        msg: '删除成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.DELETE_FAILURE,
        msg: '删除失败'
      })
    }
  })
})



module.exports = router;