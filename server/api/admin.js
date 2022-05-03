const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');
const SQL = require('../sqlMap');
const bcryptjs = require('../utils/BcryptJS');
const bcrypt = require('../utils/BcryptJS');
const MODE = require('../utils/Mode');
const jsonWrite = require('../utils/JsonWrite');
const JWT = require('../utils/Token');

const api = {
  login: '/login',
  getAll: '/get/all',
  updatePwd: '/update/password',
  getInfo: '/get/info',
  updateInfo: '/update/info',
  updatePermission: '/update/permission',
  delete: '/delete',
  add: '/add'
}

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
  let sql = SQL.admin.login;
  sqlRun(sql, params.tel, (err, result) => {
    if (err) {
      console.log("失败" + err);
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
 * 获取个人信息
 */
router.get(api.getInfo, (req, res) => {
  let sql = SQL.admin.selectByTel;
  let tel = req.query.tel;
  console.log(tel);
  sqlRun(sql, tel, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result[0]));
      delete data.password;
      jsonWrite(res, data);
    }
  })
})

/**
 * 获取所有管理员
 */
 router.get(api.getAll, (req, res) => {
  let sql = SQL.admin.selectAll;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      delete data.password;
      jsonWrite(res, data);
    }
  })
 })

/**
 * 添加管理员
 */
router.post(api.add, (req, res) => {
  let { tel, name, sex, email, permission } = req.body;
  let password = bcrypt.encrypt("12345678");
  let sql = SQL.admin.add;
  sqlRun(sql, [tel, name, sex, email, permission, password], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    if (result) {
      jsonWrite(res, {
        msg: '添加成功',
        mode: MODE.ADD_SUCCESS
      });
    } else {
      jsonWrite(res, {
        msg: '添加失败',
        mode: MODE.ADD_FAILURE
      });
    }
  })
})

/**
 * 修改个人信息
 */
router.post(api.updateInfo, (req, res) => {
  let params = req.body;
  let updateInfoSql = SQL.admin.updateInfo;
  let arrInfo = [params.name, params.sex, params.email, params.tel];
  sqlRun(updateInfoSql, arrInfo, (err, result) => {
    if (err) {
      console.log("修改个人信息", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_INFO_SUCCESS,
        msg: "修改成功"
      });
    } else {
      jsonWrite(res, {
        mode: MODE.UPDATE_FAILURE,
        msg: "修改失败"
      });
    }
  })
})

 // 删除管理员
router.delete(api.delete, (req, res) => {
  let tel = req.query.tel;
  let sql = SQL.admin.delete;
  sqlRun(sql, tel, (err, result) => {
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

// 修改权限
router.put(api.updatePermission, (req, res) => {
  let { permission, tel } = req.body;
  let sql = SQL.admin.updatePermission;
  sqlRun(sql, [permission, tel], (err, result) => {
    if (err) {
      console.log("err", err);
    }
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

 /**
 * 修改密码接口
 * url: /api/admin/update/password
 * params: {tel, oldPwd, newPwd}
 */
router.post(api.updatePwd, (req, res) => {
  let params = req.body;
  let checkPwdSql = SQL.admin.selectByTel;
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
        let updatePwdSql = SQL.admin.updatePwd;
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

module.exports = router;