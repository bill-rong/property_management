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
  login: '/login',
  getUser: '/get/user',
  updatePwd: '/update/password',
  forgetPwd: '/forget/password',
  uodateInfo: '/update/info'
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

router.post(api.updatePwd, (req, res) => {
  let params = req.body;
  let resetPwdSql = SQL.user.updatePwd;
  let newPwd = bcrypt.encrypt("12345678");
  sqlRun(resetPwdSql, [newPwd, params.tel], (err, result) => {
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


module.exports = router;