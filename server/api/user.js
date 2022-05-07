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
const mode = require('../utils/Mode');

const api = {
  login: '/login',
  getUser: '/get/user',
  userIsExist: '/exist',
  addUser: '/add',
  getAllUser: '/get/all/user',
  updatePwd: '/update/password',
  resetPwd: '/reset/password',
  forgetPwd: '/forget/password',
  uodateInfo: '/update/info',
  delete: '/delete',
  addFamily: '/add/family',
  getFamily: '/get/family',
  getAllFamily: '/get/all/family',
  updateFamily: '/update/family',
  deleteFamily: '/delete/family'
}

/**
 * 获取用户信息接口
 * url: /api/user/get/user
 * params: {tel}
 */
router.get(api.getUser, (req, res) => {
  let tel = req.query.tel;
  let sql = SQL.user.selectByTel;
  sqlRun(sql, tel, (err, result) => {
    if (err) {
      console.log("失败", err);
    }
    if (result.length > 0) {
      let data = JSON.parse(JSON.stringify(result[0]));
      delete data.password;
      delete data.living
      jsonWrite(res, data);
      // res.json(result)
    } else {
      jsonWrite(res, {
        mode: MODE.USER_NOT_EXIST,
        msg: "用户不存在"
      });
    }
  });
});

// 判断用户是否存在
router.get(api.userIsExist, (req, res) => {
  let tel = req.query.tel;
  let sql = SQL.user.selectByTel;
  sqlRun(sql, tel, (err, result) => {
    if (err) {
      console.log("失败", err);
    }
    if (result.length > 0) {
      jsonWrite(res, { mode: MODE.USER_IS_EXIST });
      // res.json(result)
    } else {
      jsonWrite(res, {
        mode: MODE.USER_NOT_EXIST,
        msg: "用户不存在"
      });
    }
  });
});

// 添加，同时绑定房间
router.post(api.addUser, (req, res) => {
  let { tel, idcard, name, sex, email, room } = req.body;
  let password = bcrypt.encrypt("12345678");
  let date = moment(new Date()).format("YYYY-MM-DD");
  let sql = SQL.user.add;
  console.log("room", room);
  sqlRun(sql, [tel, idcard, name, sex, email, password, date], (err, result) => {
    if (err) {
      console.log("失败", err);
    }
    if (result) {
      sqlRun(SQL.user.bindRoom, [result.insertId, room], (bErr, bResult) => {
        if (bErr) { console.log("绑定房间失败", bErr); }
        if (bResult) {
          console.log("绑定房间成功");
        }
      })
      jsonWrite(res, { 
        mode: MODE.ADD_SUCCESS,
        msg: '添加成功'
       });
    } else {
      jsonWrite(res, { 
        mode: MODE.ADD_FAILURE,
        msg: '添加成功'
       });
    }
  })
})

/**
 * 获取所有用户信息接口
 * url: /api/user/get/all/user
 */
 router.get(api.getAllUser, (req, res) => {
  let sql = SQL.user.selectAll;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败", err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      data = data.map((item) => {
        delete item.password;
        item.date = moment(item.date).format("YYYY-MM-DD");
        return item
      })
      jsonWrite(res, data);
    } else {
      jsonWrite(res, {});
    }
  });
});

/**
 * 登录接口
 * url: /api/user/login
 * params: {tel, password}
 * res: {mode, [data,] msg}
 */
router.post(api.login, (req, res) => {
  let params = req.body;
  if (Object.keys(params).length == 0) {
    res.status(400);
    jsonWrite(res, { msg: '参数为空'});
    return
  }
  let sql = SQL.user.login;
  console.log("params", params);
  sqlRun(sql, params.tel, (err, result) => {
    if (err) {
      console.log("失败", err);
    }
    if (result.length > 0) {
      const flag = bcrypt.decrypt(params.password, result[0].password);
      if (flag) {
        let data = JSON.parse(JSON.stringify(result[0]));
        delete data.password;
        let token = JWT.sign(data);
        jsonWrite(res, {
          mode: MODE.PASSWORD_CORRECT,
          data: data,
          token: token,
          msg: "密码正确"
        });
      } else {
        jsonWrite(res, {
          mode: MODE.PASSWORD_INCORRECT,
          msg: "密码错误"
        });
      }
    } else {
      jsonWrite(res, {
        mode: MODE.USER_NOT_EXIST,
        msg: "用户不存在"
      });
    }
  });
});

/**
 * 忘记密码接口
 * url: /api/user/forget/password
 * params: {tel, idcard, passwords}
 */
router.post(api.forgetPwd, (req, res) => {
  let params = req.body;
  let checkPwdSql = SQL.user.selectByTel;
  sqlRun(checkPwdSql, params.tel, (err, result) => {
    if (err) {
      console.log("查询密码失败", err);
    }
    if (result) {
      result = JSON.parse(JSON.stringify(result[0]));
      if (params.idcard != result.idcard) {
        jsonWrite(res, {
          mode: MODE.IDCARD_INCORRECT,
          msg: "身份证号不匹配"
        });
      } else {
        let updatePwdSql = SQL.user.updatePwd;
        let newPwd = bcrypt.encrypt(params.password);
        sqlRun(updatePwdSql, newPwd, (err, result) => {
          if (err) {
            console.log("修改密码失败", err);
          }
          if (result) {
            jsonWrite(res, {
              mode: MODE.UPDATE_PWD_SUCCESS,
              msg: "密码修改成功"
            });
          }
        })
      }
    } else {
      jsonWrite(res, {
        mode: MODE.USER_NOT_EXIST,
        msg: "用户不存在"
      });
    }
  });
});

/**
 * 修改密码接口
 * url: /api/user/update/password
 * params: {tel, oldPwd, newPwd}
 */
router.post(api.updatePwd, (req, res) => {
  let params = req.body;
  let checkPwdSql = SQL.user.selectByTel;
  sqlRun(checkPwdSql, params.tel, (err, result) => {
    if (err) {
      console.log("查询密码失败", err);
    }
    if (result) {
      result = JSON.parse(JSON.stringify(result[0]));
      if (!bcrypt.decrypt(params.oldPwd, result.password)) {
        jsonWrite(res, {
          mode: MODE.PASSWORD_INCORRECT,
          msg: "原密码错误"
        });
      } else {
        let updatePwdSql = SQL.user.updatePwd;
        let newPwd = bcrypt.encrypt(params.newPwd);
        let tel = params.tel;
        sqlRun(updatePwdSql, [newPwd, tel], (err, result) => {
          if (err) {
            console.log("修改密码失败", err);
          }
          if (result) {
            jsonWrite(res, {
              mode: MODE.UPDATE_PWD_SUCCESS,
              msg: "密码修改成功"
            });
          }
        })
      }
    }
  });
});

// 重置密码
router.post(api.resetPwd, (req, res) => {
  let params = req.body;
  let resetPwdSql = SQL.user.updatePwd;
  let newPwd = bcrypt.encrypt("12345678");
  sqlRun(resetPwdSql, [newPwd, params.resTel], (err, result) => {
    if (err) {
      console.log("重置密码失败", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_PWD_SUCCESS,
        msg: "密码重置成功"
      })
    }
  });
});

/**
 * 修改个人信息
 */
router.post(api.uodateInfo, (req, res) => {
  let params = req.body;
  let updateInfoSql = SQL.user.updateInfo;
  params.birthday = moment(params.birthday).format("YYYY-MM-DD");
  let arrInfo = [params.idcard, params.name, params.sex, params.email, params.birthday, params.tel];
  console.log("arr", arrInfo);
  sqlRun(updateInfoSql, arrInfo, (err, result) => {
    if (err) {
      console.log("修改个人信息", err);
    }
    if (result) {
      console.log("result", result);
      jsonWrite(res, {
        mode: MODE.UPDATE_INFO_SUCCESS,
        msg: "修改成功"
      });
    }
  })
})

// 删除住户
router.delete(api.delete, (req, res) => {
  let id = req.query.id;
  let sql = SQL.user.delete;
  sqlRun(sql, id, (err, result) => {
    if (err) { console.log("err", err) }
    if (result) {
      sqlRun(SQL.user.unBingRoom, id, (uErr, uResult) => {
        if (uErr) { console.log("err", err) }
        if (uResult) {
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
    }
  })
})


// 添加家庭成员
router.post(api.addFamily, (req, res) => {
  let { resident_tel, idcard, name, sex, relation, tel } = req.body
  let sql = SQL.family.add
  sqlRun(sql, [resident_tel, idcard, name, sex, relation, tel], (err, result) => {
    if (err) console.log("err", err);
    if (result) {
      jsonWrite(res, {
        mode: MODE.ADD_SUCCESS,
        msg: '添加成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.ADD_FAILURE,
        msg: '添加失败'
      })
    }
  })
})

// 获取家庭成员
router.get(api.getFamily, (req, res) => {
  let tel = req.query.tel;
  let sql = SQL.family.selectByTel;
  sqlRun(sql, tel, (err, result) => {
    if (err) console.log("err", err);
    if (result && result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data)
    } else {
      jsonWrite(res, [])
    }
  })
})

// 获取家庭成员
router.get(api.getAllFamily, (req, res) => {
  let sql = SQL.family.select;
  sqlRun(sql, (err, result) => {
    if (err) console.log("err", err);
    if (result && result.length > 0) {
      let data = JSON.parse(JSON.stringify(result));
      jsonWrite(res, data)
    } else {
      jsonWrite(res, [])
    }
  })
})

// 添加家庭成员
router.put(api.updateFamily, (req, res) => {
  let { resident_tel, idcard, name, sex, relation, tel, id } = req.body
  let sql = SQL.family.update
  sqlRun(sql, [idcard, name, sex, relation, tel, id], (err, result) => {
    if (err) console.log("err", err);
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_SUCCESS,
        msg: '修改成功'
      })
    } else {
      jsonWrite(res, {
        mode: MODE.UPDATE_FAILURE,
        msg: '修改失败'
      })
    }
  })
})

// 删除家庭成员
router.delete(api.deleteFamily, (req, res) => {
  let id = req.query.id;
  let sql = SQL.family.delete;
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