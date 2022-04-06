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
  updatePwd: '/update/password',
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
 * 修改管理员密码
 * params: {tel, password}
 */
router.put(api.updatePwd, (req, res) => {
  let params = req.body;
  let sql = "";
  sqlRun(sql, [params.password, params.tel], (err, result) => {
    if (err) {
      console.log("修改管理员密码失败", err);
    }
    if (result) {
      jsonWrite(res, {
        mode: MODE.UPDATE_PWD_SUCCESS,
        msg: "密码修改成功"
      });
    }
  })
})

module.exports = router;