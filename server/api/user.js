const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');
const $sql = require('../sqlMap');
const bcryptjs = require('../utils/BcryptJS');
const bcrypt = require('../utils/BcryptJS');
const MODE = require('../utils/Mode');
const jsonWrite = require('../utils/JsonWrite');





// 模板
// router.post('/router', (req, res) => {
//   let sql = $sql.user.add;
//   let params = req.body;
//   console.log(params);
//   sqlRun(sql, [params.name, params.age], function(err, result) {
//     if (err) {
//       console.log("添加失败"+err);
//     }
//     if (result) {
//       jsonWrite(res, result);
//     }
//   })
// });

router.get('/getUser', (req, res) => {
  let sql = $sql.user.select;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      res.status = 401;
      jsonWrite(res, result);
      // res.json(result)
    }
  });
});

/**
 * 登录接口
 * url: /api/user/login
 * params: {tel, password}
 * res: {mode, [data,] msg}
 */
router.post('/login', (req, res) => {
  let params = req.body;
  let sql = $sql.user.login;
  sqlRun(sql, params.tel, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      const flag = bcrypt.decrypt(params.password, result[0].password);
      if (flag) {
        let data = result[0];
        data.token = JWT.sign(result[0]);
        jsonWrite(res, {
          mode: MODE.PASSWORD_CORRECT,
          data: data,
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


module.exports = router;