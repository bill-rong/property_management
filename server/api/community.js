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
  getRoomName: '/get/room/name',
  updateRoom: '/update/room',
  addBuilding: '/add/building',
  getRoomLiving: '/get/room/living',
  getParking: '/get/parking',
  getParkingBind: '/get/parking/bind'
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

router.get(api.getRoomName, (req, res) => {
  let sql = SQL.community.selectRoomName;
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

router.get(api.getRoomLiving, (req, res) => {
  let sql = SQL.community.selectRoomLiving;
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

router.post(api.addBuilding, (req, res) => {
  let {name, layerNum, roomNum} = req.body;
  let addBSql = SQL.community.addBuilding;
  let selectBuildingByName = SQL.community.selectBuildingByName;
  let addRSql = SQL.community.addRoom;
  let bId = 0;
  sqlRun(addBSql, name, (err, result) => {
    if (result) {
      sqlRun(selectBuildingByName, name, (err, result) => {
        if (result.length > 0) {
          bId = result[0].id;
          let values = "INSERT INTO room(building_id, name) VALUES";
          for(let i=1; i<=layerNum; i++) {
            for(let j=1; j<=roomNum; j++) {
              let k = j<10?'0'+j:''+j;
              values = values + `(${bId},${"'"+name+""+i+k+"'"})`;
              if (i==layerNum && j==roomNum) {
                values = values + ';';
                continue
              }
              values = values + ',';
            }
          }
          sqlRun(values, (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result) {
              jsonWrite(res, {
                msg: '添加成功'
              })
            }
          })
        }
      })
    }
  })
})

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

router.get(api.getParking, (req, res) => {
  let sql = SQL.community.getParking
  sqlRun(sql, (err, result) => {
    if(err) {
      console.log(err);
    }
    if (result.length > 0) {
      jsonWrite(res, result);
    } else {
      jsonWrite(res, []);
    }
  })
})

router.get(api.getParkingBind, (req, res) => {
  let sql = SQL.community.getParkingBind
  sqlRun(sql, (err, result) => {
    if(err) {
      console.log(err);
    }
    if (result.length > 0) {
      jsonWrite(res, result);
    } else {
      jsonWrite(res, []);
    }
  })
})


module.exports = router;