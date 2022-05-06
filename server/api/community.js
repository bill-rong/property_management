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
  deleteBuilding: '/delete/building',
  getRoom: '/get/room',
  addRoom: '/add/room', 
  deleteRoom: '/delete/room',
  getRoomName: '/get/room/name',
  updateRoom: '/update/room',
  addBuilding: '/add/building',
  getRoomLiving: '/get/room/living',
  getRoomUnLiving: '/get/room/unLiving',
  getParking: '/get/parking',
  getParkingBind: '/get/parking/bind',
  bindParking: '/bind/parking',
  unBindParking: '/unBing/parking',
  addParking: '/add/parking'
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
 * 获取所有楼信息
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

// 删除楼信息 同时删除房
router.delete(api.deleteBuilding, (req, res) => {
  let id = req.query.id;
  let sqlBuilding = SQL.community.deleteBuilding;
  let sqlRoom = SQL.community.deleteRoomInBuilding;
  sqlRun(sqlRoom, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      sqlRun(sqlBuilding, id, (err, result) => {
        if (err) {
          console.log("err", err);
        }
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
    } else {
      jsonWrite(res, {
        mode: MODE.DELETE_FAILURE,
        msg: "删除失败"
      })
    }
  })

  
})

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

// 添加房信息
router.post(api.addRoom, (req, res) => {
  let building_id = req.body.building_id;
  let name = req.body.name;
  let sql = SQL.community.addRoom;
  sqlRun(sql, [building_id, name], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: "添加成功"
      })
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: "添加失败"
      })
    }
  })
})


// 删除房信息
router.delete(api.deleteRoom, (req, res) => {
  // console.log(req.query.id);
  let id = req.query.id;
  let sql = SQL.community.deleteRoom;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
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

// 获取所有房名
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

// 获取居住中的房名
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

// 获取未居住中的房名
router.get(api.getRoomUnLiving, (req, res) => {
  let sql = SQL.community.selectRoomUnLiving;
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

// 添加楼
router.post(api.addBuilding, (req, res) => {
  let {name, layerNum, roomNum} = req.body;
  let addBSql = SQL.community.addBuilding;
  let selectBuildingByName = SQL.community.selectBuildingByName;
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

// 获取停车位、所绑定的住户
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

// 获取已绑定的车位
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

// 添加停车位
router.post(api.addParking, (req, res) => {
  let name = req.body.name;
  let sql = SQL.community.addParking;
  sqlRun(sql, name, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: "添加成功"
      })
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: "添加成功"
      })
    }
  })
})

/**
 * 车位绑定
 */
router.post(api.bindParking, (req, res) => {
  let { id, resident_tel, license } = req.body;
  let sql = SQL.community.bindParking;
  let date = moment(new Date()).format("YYYY-MM-DD");
  sqlRun(sql, [resident_tel, license, date, id], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        msg: "绑定成功"
      })
    } else {
      jsonWrite(res, {
        msg: "绑定失败"
      })
    }
  })
})

/**
 * 车位解绑
 */
router.post(api.unBindParking, (req, res) => {
  let id = req.body.id;
  let sql = SQL.community.unbindParking;
  sqlRun(sql, id, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        msg: "解绑成功"
      })
    } else {
      jsonWrite(res, {
        msg: "绑定失败"
      })
    }
  })
})



module.exports = router;