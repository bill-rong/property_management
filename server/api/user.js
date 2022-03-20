// import bcrypt from '../utils/BcryptJS';

const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');
const $sql = require('../sqlMap');
const bcryptjs = require('../utils/BcryptJS');
const bcrypt = require('../utils/BcryptJS');
const mode = require('../utils/Mode')



var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    console.log(ret);
    res.json(ret);
  }
};

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

router.post('/login', (req, res) => {
  let params = req.body;
  let sql = $sql.user.login;
  sqlRun(sql, params.username, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      // console.log(result[0].password);
      const flag = bcrypt.decrypt(params.password, result[0].password);
      if (flag) {
        jsonWrite(res, {
          mode: mode.PASSWORD_CORRECT,
          data: {
            tel: result[0].tel,
            name: result[0].name
          },
          msg: "密码正确"
        });
        // jsonWrite(res, result);
      } else {
        // console.log("密码cuowu");
        jsonWrite(res, {
          mode: mode.PASSWORD_INCORRECT,
          msg: "密码错误"
        });
      }
    }
  });
});


module.exports = router;